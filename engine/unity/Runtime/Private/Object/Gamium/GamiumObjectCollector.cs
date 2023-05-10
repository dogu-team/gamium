using System;
using System.Collections.Generic;
using System.Linq;
using Gamium.Extensions;
using Gamium.Protocol.Types;
using UnityEngine;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium.Private.Object
{
    internal static class GamiumObjectCollector
    {
        internal static GamiumObject[] EmptyList = new GamiumObject[] { };

        internal static ErrorResultT Finds(ObjectLocatorT objectLocator, out GamiumObject[] gamiumObjects)
        {
            gamiumObjects = EmptyList;

            switch (objectLocator.By)
            {
                case ObjectLocatorBy.Path:
                {
                    var err = FindsWithPath(objectLocator.Str, out gamiumObjects);
                    if (!err.IsSuccess())
                    {
                        return err;
                    }

                    break;
                }
                case ObjectLocatorBy.Tag:
                {
                    gamiumObjects = GameObject.FindGameObjectsWithTag(objectLocator.Str)
                        .Select(g => new GameObjectGamiumObject(g)).ToArray();
                    break;
                }
            }

            return ErrorResultExtensions.None;
        }

        internal static ErrorResultT FindWithObjectId(string id, out GamiumObject go)
        {
            go = null;
            var err = FindsWithPath(id, out var gamiumObjects);
            if (!err.IsSuccess())
            {
                return err;
            }


            if (0 == gamiumObjects.Length)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectNotFound,
                    Reason = $"GameObject({id}) not found"
                };
            }

            if (1 < gamiumObjects.Length)
            {
                Logger.Warn($"GameObject({id}) found multiple({gamiumObjects.Length})");
            }

            go = gamiumObjects[0];
            return ErrorResultExtensions.None;
        }


        private static ErrorResultT FindsWithPath(string path, out GamiumObject[] gamiumObjects)
        {
            gamiumObjects = EmptyList;
            var hierarchyPath = new HierarchyPath(path);
            if (hierarchyPath.IsEmpty())
            {
                return ErrorResultExtensions.None;
            }

            var matchedGamiumObjects = GamiumObjectRegistry.GetRoots().ToArray();
            matchedGamiumObjects = hierarchyPath.nodes[0].FilterMatch(matchedGamiumObjects);
            if (0 == matchedGamiumObjects.Length)
            {
                return ErrorResultExtensions.None;
            }

            for (int i = 1; i < hierarchyPath.nodes.Length; ++i)
            {
                var nodeInDepth = hierarchyPath.nodes[i];
                var nextMatchedGos = new List<GamiumObject>();
                Array.ForEach(matchedGamiumObjects, go =>
                {
                    var children = go.GetChildren();
                    nextMatchedGos.AddRange(nodeInDepth.FilterMatch(children));
                });
                matchedGamiumObjects = nextMatchedGos.ToArray();
            }

            gamiumObjects = matchedGamiumObjects.ToArray();

            return ErrorResultExtensions.None;
        }
    }
}

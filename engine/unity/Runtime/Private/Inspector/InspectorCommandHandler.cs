using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Object;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using UnityEngine.Device;
using GamiumVector3 = Gamium.Protocol.Types.Vector3;
using Vector2 = UnityEngine.Vector2;

namespace Gamium
{
    internal static class InspectorCommandHandler
    {
        internal static Task<PacketResult<InspectObjectOnScreenResultT>> HandleInspectObjectOnScreen(
            InspectObjectOnScreenParamT req)
        {
            var infos = new List<ObjectInfoT> { };
            var pos = req.Pos.ToUnity() / req.ScreenSize.ToUnity() *
                      new Vector2(Screen.width, Screen.height);
            var gos = GamiumObjectPicker.RayGamiumObjects(pos, out var hitPoint);
            foreach (var go in gos)
            {
                var err = go.ToObjectInfo(out var objectInfo);
                if (!err.IsSuccess())
                {
                    continue;
                }

                infos.Add(objectInfo);
            }


            return Task.FromResult(new PacketResult<InspectObjectOnScreenResultT>(new InspectObjectOnScreenResultT
            {
                Infos = infos,
                HitPoint = hitPoint.ToGamium()
            }));
        }

        internal static Task<PacketResult<InspectObjectWithIdResultT>> HandleInspectObjectWithId(
            InspectObjectWithIdParamT req)
        {
            var err = GamiumObjectCollector.Finds(new ObjectLocatorT { By = ObjectLocatorBy.Path, Str = req.ObjectId },
                out var gamiumObjects);
            if (!err.IsSuccess())
            {
                return Task.FromResult(new PacketResult<InspectObjectWithIdResultT>(err));
            }

            if (0 == gamiumObjects.Length)
            {
                return Task.FromResult(new PacketResult<InspectObjectWithIdResultT>(ErrorCode.ObjectNotFound,
                    $"InspectObjectWithId failed. Str:{req.ObjectId} Not found"));
            }


            var gamiumObject = gamiumObjects[0];
            err = gamiumObject.ToObjectInfo(out var objectInfo);
            if (!err.IsSuccess())
            {
                return Task.FromResult(new PacketResult<InspectObjectWithIdResultT>(err));
            }

            return Task.FromResult(new PacketResult<InspectObjectWithIdResultT>(new InspectObjectWithIdResultT
            {
                Info = objectInfo,
            }));
        }


        internal static Task<PacketResult<DumpObjectsHierarchyResultT>> HandleDumpObjectHierarchy(
            DumpObjectsHierarchyParamT req)
        {
            var hierarchies = new Dictionary<string, ObjectsHierarchyT>();
            var roots = GamiumObjectRegistry.GetRoots().ToArray();
            foreach (var r in roots)
            {
                var treeName = "Unknown";
                if (r is GameObjectGamiumObject go)
                {
                    treeName = go.value.scene.name;
                }
                else if (r is VisualElementGamiumObject vgoo)
                {
                    treeName = "VisualElement";
                }

                if (!hierarchies.ContainsKey(treeName))
                {
                    hierarchies.Add(treeName, new ObjectsHierarchyT
                    {
                        Name = treeName,
                        Children = new List<ObjectHierarchyNodeT>()
                    });
                }

                hierarchies[treeName].Children.Add(r.ToHierarchyNode());
            }


            return Task.FromResult(new PacketResult<DumpObjectsHierarchyResultT>(new DumpObjectsHierarchyResultT
            {
                Hierarchies = hierarchies.Values.ToList()
            }));
        }
    }
}

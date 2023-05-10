using System.Linq;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Object;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;
using UnityEngine;
using UnityEngine.AI;
using Logger = Gamium.Private.Util.Logger;
using Vector3 = UnityEngine.Vector3;

namespace Gamium.Private.Actions
{
    public static class MovePlayerHandler
    {
        private class KeyInfo
        {
            public string key;
            public Vector3 direction;
            public bool isPressing;
        }

        internal static async Task<ActionResultT> Handle(MovePlayerParamT param)
        {
            var actionResult = await HandleByNavAgent(param);
            if (actionResult.Error.IsSuccess())
            {
                return actionResult;
            }

            return await HandleByKeyPress(param);
        }

        internal static async Task<ActionResultT> HandleByNavAgent(MovePlayerParamT param)
        {
            var err = GamiumObjectCollector.FindWithObjectId(param.PlayerObjectId, out var gamiumObject);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }

            var playerGamiumObject = gamiumObject as GameObjectGamiumObject;
            if (playerGamiumObject == null || playerGamiumObject.value == null)
            {
                return (new ActionResultT
                {
                    Error = new ErrorResultT
                    {
                        Code = ErrorCode.ObjectNotFound,
                        Reason = $"GameObject({param.PlayerObjectId}) cast failed"
                    }
                });
            }

            var playerObj = playerGamiumObject.value;
            var navAgent = playerObj.GetComponent<NavMeshAgent>();
            if (navAgent == null)
            {
                return (new ActionResultT
                {
                    Error = new ErrorResultT
                    {
                        Code = ErrorCode.ObjectComponentNotFound,
                        Reason = "NavMeshAgent not found"
                    }
                });
            }

            var dest = param.Position.ToUnity();
            navAgent.SetDestination(dest);
            while (true)
            {
                var distanceToDest = (dest.XZPlane() - playerObj.transform.position.XZPlane()).magnitude;
                if (distanceToDest <= param.Epsilon)
                {
                    break;
                }

                await Task.Yield();
            }

            navAgent.isStopped = true;
            navAgent.ResetPath();
            return (new ActionResultT { Error = ErrorResultExtensions.None });
        }

        internal static async Task<ActionResultT> HandleByKeyPress(MovePlayerParamT param)
        {
            Vector3 toPosCopy = param.Position.ToUnity().XZPlane();
            var err = GamiumObjectCollector.FindWithObjectId(param.CameraObjectId, out var gamiumObject);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }

            var camGamiumObject = gamiumObject as GameObjectGamiumObject;
            if (camGamiumObject == null || camGamiumObject.value == null)
            {
                return (new ActionResultT
                {
                    Error = new ErrorResultT
                    {
                        Code = ErrorCode.ObjectNotFound,
                        Reason = $"GameObject({param.CameraObjectId} cast failed"
                    }
                });
            }

            var camObj = camGamiumObject.value;
            var horizonMapping = Input.storage.GetInputMaping("Horizontal");
            var vertMapping = Input.storage.GetInputMaping("Vertical");
            var upKey = vertMapping.positiveCodes.ToList()[0].ToString();
            var downKey = vertMapping.negativeCodes.ToList()[0].ToString();
            var rightKey = horizonMapping.positiveCodes.ToList()[0].ToString();
            var leftKey = horizonMapping.negativeCodes.ToList()[0].ToString();


            KeyInfo[] moveInfo =
            {
                new KeyInfo { key = upKey, direction = new Vector3(0, 0, 1), isPressing = false },
                new KeyInfo { key = leftKey, direction = new Vector3(-1, 0, 0), isPressing = false },
                new KeyInfo { key = downKey, direction = new Vector3(0, 0, -1), isPressing = false },
                new KeyInfo { key = rightKey, direction = new Vector3(1, 0, 0), isPressing = false }
            };
            err = GamiumObjectCollector.FindWithObjectId(param.PlayerObjectId, out gamiumObject);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }

            var playerGamiumObject = gamiumObject as GameObjectGamiumObject;
            if (playerGamiumObject == null || playerGamiumObject.value == null)
            {
                return (new ActionResultT
                {
                    Error = new ErrorResultT
                    {
                        Code = ErrorCode.ObjectNotFound,
                        Reason = $"GameObject({param.PlayerObjectId}) cast failed"
                    }
                });
            }

            var playerObj = playerGamiumObject.value;


            var position = playerObj.transform.position;
            Vector3 startPos =
                new Vector3(position.x, 0, position.z);
            Vector3 fromPos = Vector3.zero;
            while (true)
            {
                var hasToPress = false;
                if (null == playerObj) break;
                position = playerObj.transform.position;
                UnityEngine.Debug.DrawLine(position, toPosCopy, Random.ColorHSV(), 0.3f);
                fromPos = position.XZPlane();

                var directionToDest = toPosCopy - fromPos;
                var distanceToDest = directionToDest.magnitude;
                for (var index = 0; index < moveInfo.Length; index++)
                {
                    var element = moveInfo[index];
                    var keyDirection = camObj.transform.TransformDirection(element.direction);
                    var directionWhenForward = directionToDest - keyDirection;
                    var distanceWhenForward = directionWhenForward.magnitude;
                    if (distanceWhenForward <= distanceToDest && param.Epsilon < distanceToDest)
                    {
                        if (false == element.isPressing)
                        {
                            element.isPressing = true;
                            Input.storage.OnPressDownKey(element.key);
                        }

                        hasToPress = true;
                    }
                    else
                    {
                        if (element.isPressing)
                        {
                            element.isPressing = false;
                            Input.storage.OnPressUpKey(element.key);
                        }
                    }
                }

                await Task.Yield();
                if (false == hasToPress) break;
            }


            Logger.Verbose(
                $"Gamium.InternalCommandHandler.MoveToPosition from:{startPos}, cur:{fromPos}, to:{toPosCopy}," +
                $" dist:{(toPosCopy - fromPos).magnitude}, epsilon:{param.Epsilon} Done");

            return new ActionResultT { Error = ErrorResultExtensions.None };
        }
    }
}

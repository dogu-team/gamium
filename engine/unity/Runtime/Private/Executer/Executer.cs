using System;
using System.Linq;
using Gamium.Extensions;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using Newtonsoft.Json;
using JsonConvert = Gamium.Private.Util.JsonConvert;

namespace Gamium.Private
{
    internal class ExecuteFunctionResult
    {
        public ErrorResultT error;
        public string document;
    }

    internal static class Executer
    {
        internal static ExecuteFunctionResult Do(ExecuteRpcParamT param)
        {
            ExecuteFunctionResult ret = new ExecuteFunctionResult
            {
                error = ErrorResultExtensions.None,
                document = ""
            };
            object[] parameters = new object[] { };
            try
            {
                var setting = new JsonSerializerSettings();
                if (null != param.ParamDocuments)
                {
                    parameters = param.ParamDocuments.Select(p =>
                    {
                        return JsonConvert.Instance.DeserializeObject<object>(p);
                    }).ToArray();
                }
            }
            catch (Exception e)
            {
                ret.error = new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcInvalidJson,
                    Reason = e.Message
                };
                return ret;
            }

            var error = IsMethodCallable(param);
            if (error.IsSuccess())
            {
                ret.error = CallMethod(param, parameters, out var result);
                ret.document = JsonConvert.Instance.SerializeObject(result);
                return ret;
            }

            error = IsFieldCallable(param);
            if (error.IsSuccess())
            {
                ret.error = CallField(param, out var result);
                ret.document = JsonConvert.Instance.SerializeObject(result);
                return ret;
            }

            error = IsPropertyCallable(param);
            if (error.IsSuccess())
            {
                ret.error = CallProperty(param, out var result);
                ret.document = JsonConvert.Instance.SerializeObject(result);
                return ret;
            }

            return new ExecuteFunctionResult
            {
                error = new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcInternalError,
                    Reason = "No method or field or property found"
                },
                document = ""
            };
        }


        private static ErrorResultT IsMethodCallable(ExecuteRpcParamT param)
        {
            if (param.By != ExecuteRpcBy.Method)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcNotSupportedType,
                    Reason = $"rpc by not supported. {param.By}"
                };
            }

            if (string.IsNullOrEmpty(param.ClassName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcClassNotFound,
                    Reason = $"ClassName empty"
                };
            }

            if (string.IsNullOrEmpty(param.TargetName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcMethodNotFound,
                    Reason = $"TargetName empty"
                };
            }

            return ErrorResultExtensions.None;
        }

        private static ErrorResultT CallMethod(ExecuteRpcParamT param, object[] parameters, out object result)
        {
            result = null;
            var error = IsMethodCallable(param);
            if (!error.IsSuccess())
            {
                return error;
            }

            error = Codebase.FindMethod(out var methodInfo, param.ClassName,
                param.TargetName, parameters);
            if (!error.IsSuccess())
            {
                return error;
            }

            result = methodInfo.Invoke(null, parameters);
            return ErrorResultExtensions.None;
        }

        private static ErrorResultT IsFieldCallable(ExecuteRpcParamT param)
        {
            if (param.By != ExecuteRpcBy.Field)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcNotSupportedType,
                    Reason = $"rpc by not supported. {param.By}"
                };
            }

            if (string.IsNullOrEmpty(param.ClassName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcClassNotFound,
                    Reason = $"ClassName empty"
                };
            }

            if (string.IsNullOrEmpty(param.TargetName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcFieldNotFound,
                    Reason = $"TargetName empty"
                };
            }

            return ErrorResultExtensions.None;
        }

        private static ErrorResultT CallField(ExecuteRpcParamT param, out object result)
        {
            result = null;
            var error = IsFieldCallable(param);
            if (!error.IsSuccess())
            {
                return error;
            }

            error = Codebase.FindField(out var fieldInfo, param.ClassName, param.TargetName);
            if (!error.IsSuccess())
            {
                return error;
            }

            result = fieldInfo.GetValue(null);
            return ErrorResultExtensions.None;
        }

        private static ErrorResultT IsPropertyCallable(ExecuteRpcParamT param)
        {
            if (param.By != ExecuteRpcBy.Property)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcNotSupportedType,
                    Reason = $"rpc by not supported. {param.By}"
                };
            }

            if (string.IsNullOrEmpty(param.ClassName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcClassNotFound,
                    Reason = $"ClassName empty"
                };
            }

            if (string.IsNullOrEmpty(param.TargetName))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcPropertyNotFound,
                    Reason = $"TargetName empty"
                };
            }

            return ErrorResultExtensions.None;
        }

        private static ErrorResultT CallProperty(ExecuteRpcParamT param, out object result)
        {
            result = null;
            var error = IsPropertyCallable(param);
            if (!error.IsSuccess())
            {
                return error;
            }

            error = Codebase.FindProperty(out var propertyInfo, param.ClassName,
                param.TargetName);
            if (!error.IsSuccess())
            {
                return error;
            }

            result = propertyInfo.GetValue(null);
            return ErrorResultExtensions.None;
        }
    }
}

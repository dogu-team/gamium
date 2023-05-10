using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Gamium.Extensions;
using Gamium.Private.Util;
using Gamium.Protocol.Types;

namespace Gamium.Private
{
    internal class Codebase
    {
        private static List<Type> types = new List<Type>();

        internal static List<Type> Setup()
        {
            types = AppDomain.CurrentDomain.GetAssemblies().ToList()
                .SelectMany((a) => GetTypes(a)).ToList();

            Logger.Verbose($"Codebase Setup complete");
            return types;
        }

        internal static ErrorResultT FindMethod(out MethodInfo method, string className, string methodName,
            params object[] arg
        )
        {
            method = null;
            var errorCode = FindMatchedTypes(className, out var matchedType);
            if (!errorCode.IsSuccess())
            {
                return errorCode;
            }

            var matchedMethods = matchedType.GetMethods(BindingFlags.Public | BindingFlags.NonPublic |
                                                        BindingFlags.Static | BindingFlags.Instance)
                .Where((info => info.Name == methodName)).ToList();
            if (1 < matchedMethods.Count)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcMultipleMethodFound,
                    Reason = $"multiple methods found for {className}.{methodName}"
                };
            }

            var lastErrorResult = new ErrorResultT();
            matchedMethods = matchedMethods.Where((m) =>
            {
                var methodParams = m.GetParameters();
                if (methodParams.Length != arg.Length)
                {
                    lastErrorResult = new ErrorResultT
                    {
                        Code = ErrorCode.ExecuteRpcMethodArgumentsLengthMismatch,
                        Reason =
                            $"argument count mismatch for method {m.Name}, expected {methodParams.Length} but got {arg.Length}"
                    };
                    return false;
                }

                for (int i = 0; i < methodParams.Length; i++)
                {
                    if (methodParams[i].ParameterType != arg[i].GetType())
                    {
                        lastErrorResult = new ErrorResultT
                        {
                            Code = ErrorCode.ExecuteRpcMethodArgumentTypeMismatch,
                            Reason =
                                $"argument type mismatch for method {m.Name}, parameter[{i}] expected {methodParams[i].ParameterType} but got {arg[i].GetType()}"
                        };
                        return false;
                    }
                }

                return true;
            }).ToList();
            if (!matchedMethods.Any())
            {
                return lastErrorResult;
            }

            if (1 < matchedMethods.Count)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcMultipleMethodFound,
                    Reason = $"multiple methods found for {className}.{methodName}"
                };
            }


            method = matchedMethods[0];

            return ErrorResultExtensions.None;
        }


        internal static ErrorResultT FindField(out FieldInfo field, string className, string fieldName)
        {
            field = null;
            var errorCode = FindMatchedTypes(className, out var matchedType);
            if (!errorCode.IsSuccess())
            {
                return errorCode;
            }

            var matchedFields = matchedType.GetFields(BindingFlags.Public | BindingFlags.NonPublic |
                                                      BindingFlags.Static | BindingFlags.Instance)
                .Where((info => info.Name == fieldName)).ToList();
            if (!matchedFields.Any())
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcFieldNotFound,
                    Reason = $"" +
                             $"field not found for {className}.{fieldName}"
                };
            }

            if (1 < matchedFields.Count())
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcMultipleFieldFound,
                    Reason = $"multiple fields found for {className}.{fieldName}"
                };
            }


            field = matchedFields[0];
            return ErrorResultExtensions.None;
        }

        internal static ErrorResultT FindProperty(out PropertyInfo property, string className, string propertyName)
        {
            property = null;
            var errorCode = FindMatchedTypes(className, out var matchedType);
            if (!errorCode.IsSuccess())
            {
                return errorCode;
            }

            var props = matchedType.GetProperties(BindingFlags.Public | BindingFlags.NonPublic |
                                                  BindingFlags.Static | BindingFlags.Instance);
            var matchedPropertyInfos = matchedType.GetProperties(BindingFlags.Public | BindingFlags.NonPublic |
                                                                 BindingFlags.Static | BindingFlags.Instance)
                .Where((info => info.Name == propertyName)).ToList();
            if (!matchedPropertyInfos.Any())
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcPropertyNotFound,
                    Reason = $"property not found for {className}.{propertyName}"
                };
            }

            if (1 < matchedPropertyInfos.Count())
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ExecuteRpcMultiplePropertyFound,
                    Reason = $"multiple properties found for {className}.{propertyName}"
                };
            }


            property = matchedPropertyInfos[0];
            return ErrorResultExtensions.None;
        }


        internal static Type[] GetTypes(Assembly assembly)
        {
            Type[] types = new Type[] { };
            try
            {
                types = assembly.GetTypes();
            }
            catch (Exception e)
            {
                Logger.Warn($"Failed to load types in assembly:{assembly}\n exception:{e}");
            }

            types = types.Where((type => type != (typeof(void)))).ToArray();
            return types;
        }

        private static ErrorResultT FindMatchedTypes(string className, out Type matchedType)
        {
            matchedType = null;
            var matchedTypes = types.Where((t) =>
            {
                var fullname = t.Namespace + "." + t.Name;
                return fullname == className;
            });
            if (!matchedTypes.Any())
            {
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ExecuteRpcClassNotFound,
                        Reason = $"Class {className} not found"
                    };
                }
            }

            if (matchedTypes.Count() > 1)
            {
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ExecuteRpcMultipleClassFound,
                        Reason = $"Multiple classes with name {className} found"
                    };
                }
            }

            matchedType = matchedTypes.ToArray()[0];
            return ErrorResultExtensions.None;
        }
    }
}

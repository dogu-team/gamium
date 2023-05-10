using System.Collections.Generic;
using Gamium.Private;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace Gamium
{
    [TestFixture]
    public class CodebaseTest
    {
        [SetUp]
        public void Setup()
        {
            Codebase.Setup();
        }

        [Test]
        public void TestCallMethod()
        {
            var ret = Executer.Do(new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Method,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "CallEmptyParam"
            });
            Assert.NotNull(ret);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);

            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Method,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "CallParam1",
                ParamDocuments = new List<string> { "10.0" }
            }));
            Assert.NotNull(ret);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);

            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Method,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "CallParam2",
                ParamDocuments = new List<string> { "10.0", "10.0" }
            }));
            Assert.NotNull(ret);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);

            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Method,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "CallParamReturn",
                ParamDocuments = new List<string> { "10.0", "10.0" }
            }));
            Assert.NotNull(ret.document);
            Assert.AreEqual(ret.document, "1");
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);
        }

        [Test]
        public void TestCallField()
        {
            var ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Field,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "field1"
            }));
            Assert.NotNull(ret);
            Assert.AreEqual("10.0", ret.document);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);

            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Field,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "field2"
            }));
            Assert.NotNull(ret);
            Assert.AreEqual("[1.0,2.0]", ret.document);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);


            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Field,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "field3"
            }));
            Assert.NotNull(ret);
            Assert.AreEqual("{\"hello\":\"nice\"}", ret.document);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);
        }

        [Test]
        public void TestCallProperty()
        {
            var ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Property,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "property1"
            }));
            Assert.NotNull(ret);
            Assert.AreEqual("0", ret.document);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);


            ret = Executer.Do((new ExecuteRpcParamT
            {
                By = ExecuteRpcBy.Property,
                ClassName = "Gamium.Private.CodebaseSample",
                TargetName = "property2"
            }));
            Assert.NotNull(ret);
            Assert.AreEqual("[]", ret.document);
            Assert.AreEqual(ErrorCode.None, ret.error.Code, ret.error.Reason);
        }
    }
}

using Newtonsoft.Json;

namespace Gamium.Private.Util
{
    internal class NewtonsoftJsonConverter : IJsonConvert
    {
        public string SerializeObject(object value)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(value, Formatting.None);
        }

        public T DeserializeObject<T>(string value)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(value);
        }
    }
}

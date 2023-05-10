namespace Gamium.Private.Util
{
    internal interface IJsonConvert
    {
        string SerializeObject(object value);
        T DeserializeObject<T>(string value);
    }
}

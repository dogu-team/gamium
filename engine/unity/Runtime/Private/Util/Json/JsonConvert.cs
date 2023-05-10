namespace Gamium.Private.Util
{
    internal static class JsonConvert
    {
        public static IJsonConvert Instance => instance;
        private static IJsonConvert instance = new NewtonsoftJsonConverter();
    }
}

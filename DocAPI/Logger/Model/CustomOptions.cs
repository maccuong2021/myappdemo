using Microsoft.Extensions.Logging.Console;

namespace DocAPI.Logger.Model
{
    public class CustomOptions : JsonConsoleFormatterOptions
    {
        public bool ExcludeNotes { get; set; }
        public bool DisableColors { get; set; }
        public string? AppName { get; set; }
    }
}

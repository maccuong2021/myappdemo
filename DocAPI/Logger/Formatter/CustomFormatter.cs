using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using DocAPI.Logger.Model;
using System.Reflection;

namespace DocAPI.Logger.Formatter
{
    public class CustomFormatter : ConsoleFormatter, IDisposable
    {
        private IDisposable _optionsReloadToken;

        public CustomFormatter(IOptionsMonitor<CustomOptions> options) : base("customName")
        {
            ReloadLoggerOptions(options.CurrentValue);
            _optionsReloadToken = options.OnChange(ReloadLoggerOptions);
        }

        private void ReloadLoggerOptions(CustomOptions options)
        {
            FormatterOptions = options;
        }

        public CustomOptions FormatterOptions { get; set; }
        public void Dispose()
        {
            _optionsReloadToken?.Dispose();
        }

        public override void Write<TState>(in LogEntry<TState> logEntry, IExternalScopeProvider scopeProvider, TextWriter textWriter)
        {
            string message = logEntry.Formatter(logEntry.State, logEntry.Exception);
            if (logEntry.Exception == null && message == null)
            {
                return;
            }

            object[] values = null;
            try
            {
                FieldInfo[] fieldsInfo = logEntry.State.GetType().GetFields(BindingFlags.NonPublic | BindingFlags.Instance);
                FieldInfo props = fieldsInfo.FirstOrDefault(o => o.Name == "_values");
                values = (object[])props?.GetValue(logEntry.State);
            }
            catch { }

            var dataLogJson = JsonConvert.SerializeObject(
                values?.Length > 0 ? values[0] : "",
                Formatting.None,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }
                );

            LogData log = new LogData
            {
                service = FormatterOptions.AppName,
                level = logEntry.LogLevel.ToString().ToUpper(),
                timestamp = DateTime.Now,
                message = logEntry.State.ToString(),
                dataLog = dataLogJson ?? ""
            };

            if (logEntry.Exception != null)
            {
                log.traceLog = $"{logEntry.Exception.Message} {logEntry.Exception.StackTrace.ToString()}";
            }

            var loggerJson = JsonConvert.SerializeObject(
                log,
                Formatting.None,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }
                );

            if (!FormatterOptions.ExcludeNotes)
            {
                textWriter.WriteLine(loggerJson);
            }
        }
    }
}

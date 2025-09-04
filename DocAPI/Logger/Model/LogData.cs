namespace DocAPI.Logger.Model
{
    public class LogData
    {
        public string service { get; set; }
        public string appName { get; set; }
        public DateTime timestamp { get; set; }
        public string level { get; set; }
        public string message { get; set; }
        public string? duration { get; set; }
        public string? errorStack { get; set; }
        public string? method { get; set; }
        public string? traceLog { get; set; }
        public string? dataLog { get; set; }
        public Exception exception { get; set; }
    }
}

namespace DemoWebAPI.Models
{
    public class AuthResponse
    {
        public string Token { get; set; }          // Access Token (JWT)
        public string RefreshToken { get; set; }   // Refresh Token
        public string Role { get; set; }           // User role
        public string Message { get; set; }        // Optional message from API
    }
}

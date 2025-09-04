using System.IdentityModel.Tokens.Jwt;
using DemoWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace DemoWebAPI.Utils
{
    public class TokenRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }

    public class TokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }

    public static class Commonn
    {
        public static string? GetRoleFromToken(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwtToken);
            var roleClaim = token.Claims.FirstOrDefault(c => c.Type.Contains("/role"));

            return roleClaim?.Value;
        }

        public static bool IsTokenExpiringSoon(string token, int bufferMinutes = 5)
        {
            var handler = new JwtSecurityTokenHandler();

            if (!handler.CanReadToken(token))
                return true; // Treat unreadable tokens as "about to expire"

            var jwtToken = handler.ReadJwtToken(token);
            var exp = jwtToken.ValidTo;
            var expto = DateTime.UtcNow.AddMinutes(-bufferMinutes);
            return exp <= expto;
        }

        public static async Task<string> GetValidTokenAsync(HttpContext httpContext, IOptions<ApiSettings> apiSettings)
        {
            var token = httpContext.Session.GetString("AuthToken");
            if (token == null)
            {
                httpContext.Response.Redirect("/Auth/Login");
                return null;
            }

            if (IsTokenExpiringSoon(token))
            {
                var refreshToken = httpContext.Session.GetString("RefreshToken");
                var tokenResponse = await RefreshTokenAsync(apiSettings, token, refreshToken);
                httpContext.Session.SetString("AuthToken", tokenResponse!.Token);
                httpContext.Session.SetString("RefreshToken", tokenResponse!.RefreshToken);
            }

            return token;
        }

        private static async Task<TokenResponse> RefreshTokenAsync(IOptions<ApiSettings> apiSettings, string accessToken, string refreshToken)
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri(apiSettings.Value.BaseAddress);

            var response = await client.PostAsJsonAsync("api/Auth/refresh-token", new TokenRequest { AccessToken = accessToken, RefreshToken = refreshToken });
            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = await response.Content.ReadFromJsonAsync<TokenResponse>();
               
                return tokenResponse!;
            }

            return null;
        }
    }
}
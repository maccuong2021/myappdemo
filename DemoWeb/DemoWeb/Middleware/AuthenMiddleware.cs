using DemoWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace DemoWebAPI.Middleware
{
    public class AuthenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IOptions<ApiSettings> _apiSettings;

        public AuthenMiddleware(RequestDelegate next, IOptions<ApiSettings> apiSettings)
        {
            _next = next;
            _apiSettings = apiSettings;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check if path requires login
            var path = context.Request.Path.ToString().ToLower();

            // Ignore paths like /auth/login or static files
            if (path.Contains("/auth/login") || path.StartsWith("/css") || path.StartsWith("/js"))
            {
                await _next(context);
                return;
            }

            var token = await Utils.Commonn.GetValidTokenAsync(context, _apiSettings);

            // If no token, redirect to login
            if (string.IsNullOrEmpty(token))
            {
                context.Response.Redirect("/Auth/Login");
                return;
            }

            await _next(context);
        }
    }
}
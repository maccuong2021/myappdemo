using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using DemoWebAPI.Models;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace DemoWebAPI.Pages.Auth
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public LoginInputModel Login { get; set; } = new LoginInputModel();

        private readonly ApiSettings _apiSettings;

        public LoginModel(IOptions<ApiSettings> apiSettings)
        {
            _apiSettings = apiSettings.Value;
        }
        public void OnGet() { }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
                return Page();

            using var httpClient = new HttpClient();
            var apiUrl = $"{_apiSettings.BaseAddress}api/Auth/login";

            try
            {
                var response = await httpClient.PostAsJsonAsync(apiUrl, Login);

                if (response.IsSuccessStatusCode)
                {
                    var authResult = await response.Content.ReadFromJsonAsync<AuthResponse>();

                    // ✅ Save access token, refresh token, username, and role
                    HttpContext.Session.SetString("AuthToken", authResult!.Token);
                    HttpContext.Session.SetString("RefreshToken", authResult!.RefreshToken);
                    HttpContext.Session.SetString("Username", Login.Username);
                    var role = Utils.Commonn.GetRoleFromToken(authResult!.Token);
                    HttpContext.Session.SetString("UserRole", role!);

                    return RedirectToPage("/Index");
                }

                ModelState.AddModelError(string.Empty, "Login failed: Invalid credentials.");
            }
            catch (HttpRequestException ex)
            {
                ModelState.AddModelError(string.Empty, $"Login failed: {ex.Message}");
            }

            return Page();
        }
    }

   
}

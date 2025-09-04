using DemoWebAPI.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;

namespace DemoWebAPI.Pages.Users
{
    public class UserListModel : PageModel
    {
        public List<User> Users { get; set; } = new();

        private readonly ApiSettings _apiSettings;

        public UserListModel(IOptions<ApiSettings> apiSettings)
        {
            _apiSettings = apiSettings.Value;
        }

        public async Task OnGetAsync()
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri(_apiSettings.BaseAddress);
            var token = HttpContext.Session.GetString("AuthToken");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await client.GetFromJsonAsync<List<User>>("api/Users");
            if (response != null)
                Users = response;
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri(_apiSettings.BaseAddress);
            var token = HttpContext.Session.GetString("AuthToken");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            await client.DeleteAsync($"api/Users/{id}");
            return RedirectToPage();
        }
    }
}

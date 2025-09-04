using DemoWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace DemoWebAPI.Pages.Users
{
    public class UserFormModel : PageModel
    {
        [BindProperty]
        public User InputUser { get; set; } = new();

        private readonly ApiSettings _apiSettings;

        public UserFormModel(IOptions<ApiSettings> apiSettings)
        {
            _apiSettings = apiSettings.Value;
        }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
                return Page(); // create mode

            using var client = new HttpClient();
            client.BaseAddress = new Uri(_apiSettings.BaseAddress);
            var token = HttpContext.Session.GetString("AuthToken");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var user = await client.GetFromJsonAsync<User>($"api/Users/{id}");
            if (user == null) return NotFound();

            InputUser = user;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri(_apiSettings.BaseAddress);
            var token = HttpContext.Session.GetString("AuthToken");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (InputUser.Id == 0)
            {
                // Create
                await client.PostAsJsonAsync("api/Users", InputUser);
            }
            else
            {
                // Update
                await client.PutAsJsonAsync($"api/Users/{InputUser.Id}", InputUser);
            }

            return RedirectToPage("UserList");
        }
    }
}

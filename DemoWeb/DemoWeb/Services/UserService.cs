using DemoWebAPI.Models;
using System.Net.Http.Headers;

namespace DemoWebAPI.Services
{
    public class UserService
    {
        private readonly IHttpClientFactory _clientFactory;

        public UserService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<List<User>> GetUsersAsync(string token)
        {
            var client = _clientFactory.CreateClient("AuthAPI");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await client.GetAsync("api/Users");
            if (!response.IsSuccessStatusCode) return new();

            return await response.Content.ReadFromJsonAsync<List<User>>() ?? new();
        }
    }
}

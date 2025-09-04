using DemoWebAPI.Models;

namespace DemoWebAPI.Services
{
    public class AuthService
    {
        private readonly IHttpClientFactory _clientFactory;

        public AuthService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<string?> LoginAsync(LoginInputModel model)
        {
            var client = _clientFactory.CreateClient("AuthAPI");
            var response = await client.PostAsJsonAsync("api/Auth/login", model);
            if (!response.IsSuccessStatusCode) return null;

            var result = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            return result?["token"];
        }
    }
}

using DemoWebAPI.Models;
using DemoWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DemoWebAPI.Controllers
{
    public class AuthController : Controller
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        public IActionResult Login() => View();

        [HttpPost]
        public async Task<IActionResult> Login(LoginInputModel model)
        {
            var token = await _authService.LoginAsync(model);
            if (token == null)
            {
                ModelState.AddModelError("", "Invalid credentials");
                return View(model);
            }

            HttpContext.Session.SetString("JwtToken", token);
            return RedirectToAction("Index", "Users");
        }
    }
}

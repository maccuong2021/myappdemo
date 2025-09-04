using DemoWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DemoWebAPI.Controllers
{
    public class UsersController : Controller
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        public async Task<IActionResult> Index()
        {
            var token = HttpContext.Session.GetString("JwtToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var users = await _userService.GetUsersAsync(token);
            return View(users);
        }
    }
}

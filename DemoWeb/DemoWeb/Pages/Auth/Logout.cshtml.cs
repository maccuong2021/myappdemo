using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWebAPI.Pages.Auth
{
    public class LogoutModel : PageModel
    {
        public IActionResult OnPost()
        {
            HttpContext.Session.Clear(); // Xóa thông tin đăng nhập
            return RedirectToPage("/Auth/Login"); // Quay về trang đăng nhập
        }
    }
}

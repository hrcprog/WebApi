using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class AuthController : ControllerBase
{
    private readonly IJwtService _jwtService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IJwtService jwtService, ILogger<AuthController> logger)
    {
        _jwtService = jwtService;
        _logger = logger;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        try
        {
            _logger.LogInformation("Attempting login for user: {Username}", request.Username);

            // اینجا باید منطق احراز هویت واقعی پیاده‌سازی شود
            // برای نمونه، یک کاربر ساده در نظر گرفته شده
            if (request.Username == "admin" && request.Password == "password")
            {
                var token = _jwtService.GenerateToken(request.Username);
                var response = new LoginResponse
                {
                    Token = token,
                    Expiration = DateTime.UtcNow.AddMinutes(60),
                    Message = "ورود موفقیت‌آمیز"
                };

                _logger.LogInformation("Successful login for user: {Username}", request.Username);
                return Ok(response);
            }

            _logger.LogWarning("Failed login attempt for user: {Username}", request.Username);
            return Unauthorized(new { Message = "نام کاربری یا رمز عبور اشتباه است" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for user: {Username}", request.Username);
            return StatusCode(500, new { Message = "خطای داخلی سرور" });
        }
    }

    [HttpPost("validate")]
    public IActionResult ValidateToken([FromBody] string token)
    {
        try
        {
            var isValid = _jwtService.ValidateToken(token);
            return Ok(new { IsValid = isValid });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating token");
            return StatusCode(500, new { Message = "خطای داخلی سرور" });
        }
    }
}

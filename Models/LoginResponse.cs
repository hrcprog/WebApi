namespace WebApi.Models;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public DateTime Expiration { get; set; }
    public string Message { get; set; } = string.Empty;
}

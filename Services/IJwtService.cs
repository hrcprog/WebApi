using WebApi.Models;

namespace WebApi.Services;

public interface IJwtService
{
    string GenerateToken(string username);
    bool ValidateToken(string token);
}

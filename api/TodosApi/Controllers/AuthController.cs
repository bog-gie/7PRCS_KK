using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodosApi.Models;
using Microsoft.AspNetCore.Identity;
using TodosApi.Services;

namespace TodosApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService userService;
    public AuthController(UserService userService)
    {
        this.userService = userService;
    }

    [HttpPost("/auth/login")]
    public async Task<ActionResult> Login(User userReq)
    {
        var user = await userService.Find(userReq.Username);
        if (user != null)
        {
            var hasher = new PasswordHasher<User>();
            if (hasher.VerifyHashedPassword(user, user.Password, userReq.Password) == PasswordVerificationResult.Failed)
                return BadRequest("Wrong password");
        }
        else
            return BadRequest($"User '{userReq.Username}' not found");
        return Ok("Login successful");
    }

    [HttpPost("/auth/register")]
    public async Task<ActionResult> Register(User user)
    {
        var createUser = await userService.Create(user);
        return createUser != null ? Ok("Register successful") : BadRequest($"Username '{user.Username}' is taken");
    }
}
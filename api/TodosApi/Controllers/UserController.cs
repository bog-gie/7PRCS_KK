using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodosApi.Models;
using TodosApi.Data;
using TodosApi.Services;

namespace TodosApi.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService userService;
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    [HttpGet("/users")]
    public async Task<ActionResult> FindAll()
    {
        var users = await userService.FindAll();
        return users.Count > 0 ? Ok(users) : Ok("No users found");
    }

    [HttpGet("/users/{username}")]
    public async Task<ActionResult> Find(string username)
    {
        var user = await userService.Find(username);
        return user != null ? Ok(user) : BadRequest($"User '{username}' not found");
    }

    [HttpPut("/users/{username}")]
    public async Task<ActionResult> Update(User user)
    {
        var updateUser = await userService.Update(user);
        return updateUser != null ? Ok("User was updated") : BadRequest($"User '{user.Username}' not found");
    }

    [HttpDelete("/users/{username}")]
    public async Task<ActionResult> Delete(string username)
    {
        var deleteUser = await userService.Delete(username);
        return deleteUser != null ? Ok("User was deleted") : BadRequest($"User '{username}' not found");
    }
}
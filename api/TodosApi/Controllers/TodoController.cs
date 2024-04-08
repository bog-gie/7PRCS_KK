using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodosApi.Models;
using TodosApi.Data;
using System.Text;
using TodosApi.Services;

namespace TodosApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoService todoService;
    public TodoController(TodoService todoService)
    {
        this.todoService = todoService;
    }

    [HttpGet("/todos/{author}")]
    public async Task<ActionResult> FindAll(string author, string? sort, string? state)
    {
        var todos = await todoService.FindAll(author, sort, state);
        return todos != null ? Ok(todos) : BadRequest($"User '{author}' not found");
    }

    [HttpGet("/todos/id/{id}")]
    public async Task<ActionResult> FindById(int id)
    {
        var todo = await todoService.Find(id);
        return todo != null ? Ok(todo) : BadRequest($"Todo with id '{id}' not found");
    }

    [HttpPost("/todos")]
    public async Task<ActionResult> Create(Todo todo)
    {
        await todoService.Create(todo);
        return Ok(todo);
    }

    [HttpPut("/todos")]
    public async Task<ActionResult> Update(Todo todo)
    {
        var updateTodo = await todoService.Update(todo);
        return updateTodo != null ? Ok("Todo updated") : BadRequest($"Todo with 'id: {todo.Id}' not found");
    }

    [HttpDelete("/todos/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var todo = await todoService.Delete(id);
        return todo != null ? Ok("Todo deleted") : BadRequest($"Todo with id '{id}' not found");
    }

    [HttpGet("/todos/{author}/export")]
    public async Task<ActionResult> ExportToTxt(string author)
    {
        byte[]? fileBytes = await todoService.ExportToTxt(author);
        return fileBytes != null ? File(fileBytes, "text/plain", "todos.txt") : BadRequest("Export failed");
    }
}
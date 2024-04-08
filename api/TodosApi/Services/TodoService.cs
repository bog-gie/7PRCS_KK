using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TodosApi.Data;
using TodosApi.Models;

namespace TodosApi.Services
{
    public class TodoService
    {
        private readonly AppDbContext context;
        public TodoService(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Todo>> FindAll(string author, string? sort, string? state)
        {
            var todos = await context.Todos.ToListAsync();
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == author);

            if (user == null)
                return null;
            if (user.Role == "user")
                todos = todos.Where(t => t.Author == author).ToList();
            if (state != null)
                todos = todos.Where(t => t.State == state).ToList();

            if (sort == "startDateDesc")
                todos = todos.OrderBy(t => t.Start).ToList();
            else if (sort == "startDateAsc")
                todos = todos.OrderByDescending(t => t.Start).ToList();
            else if (sort == "endDateDesc")
                todos = todos.OrderBy(t => t.End).ToList();
            else if (sort == "endDateAsc")
                todos = todos.OrderByDescending(t => t.End).ToList();

            return todos;
        }

        public async Task<Todo?> Find(int id)
        {
            var todo = await context.Todos.FindAsync(id);
            return todo;
        }

        public async Task<Todo> Create(Todo todo)
        {
            await context.Todos.AddAsync(todo);
            await context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo?> Update(Todo todo)
        {
            var updateTodo = await this.Find(todo.Id);
            if (updateTodo == null)
                return null;

            updateTodo.Text = todo.Text;
            updateTodo.Author = todo.Author;
            updateTodo.State = todo.State;
            updateTodo.Start = todo.Start;
            updateTodo.End = todo.End;

            await context.SaveChangesAsync();
            return updateTodo;
        }

        public async Task<Todo?> Delete(int id)
        {
            var todo = await this.Find(id);
            if (todo == null)
                return null;

            context.Todos.Remove(todo);
            await context.SaveChangesAsync();
            return todo;
        }

        public async Task<byte[]?> ExportToTxt(string author)
        {
            var todos = await this.FindAll(author, null, null);
            var data = String.Join("\n", todos);
            var fileBytes = Encoding.UTF8.GetBytes(data);
            return fileBytes;
        }
    }
}
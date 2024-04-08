using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TodosApi.Data;
using TodosApi.Models;

namespace TodosApi.Services
{
    public class UserService
    {
        private readonly AppDbContext context;
        public UserService(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<List<User>> FindAll()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User?> Find(string username)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == username);
            return user;
        }

        public async Task<User?> Create(User user)
        {
            var userExist = await this.Find(user.Username);
            if (userExist != null)
                return null;

            var hasher = new PasswordHasher<User>();
            user.Password = hasher.HashPassword(user, user.Password);

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> Update(User user)
        {
            var updateUser = await this.Find(user.Username);
            if (updateUser == null)
                return null;

            updateUser.Forename = user.Forename;
            updateUser.Surname = user.Surname;
            updateUser.Gender = user.Gender;
            updateUser.Role = user.Role;

            await context.SaveChangesAsync();
            return updateUser;
        }

        public async Task<User?> Delete(string username)
        {
            var user = await this.Find(username);
            if (user == null)
                return null;

            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return user;
        }
    }
}
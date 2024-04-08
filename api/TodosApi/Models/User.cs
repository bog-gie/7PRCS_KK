using System.ComponentModel.DataAnnotations;

namespace TodosApi.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; }
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodosApi.Models
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }
        public string State { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public override string ToString()
        {
            return Start.ToShortDateString() + " - "
            + End.ToShortDateString() + ": "
            + Text + " (" + State + ")";
        }
    }
}
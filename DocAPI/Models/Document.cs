using System.ComponentModel.DataAnnotations;

namespace DocAPI.Models
{
    public class Document
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
    }
}

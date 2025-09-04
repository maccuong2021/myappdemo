using DocAPI.Data;
using DocAPI.Models;
using DocAPI.RabbitMQService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DocAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger _logger;
        private readonly IRabbitMqPublisher _publisher;

        public DocumentController(AppDbContext context, ILoggerFactory logFactory, IRabbitMqPublisher publisher)
        {
            _context = context;
            _logger = logFactory.CreateLogger<DocumentController>();
            _publisher = publisher;
            _logger.LogInformation("DocumentController initialized");           
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            _logger.LogInformation("GetDocuments called");
            var list = await _context.Documents.ToListAsync();
            return list;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocumentById(string id)
        {
            _logger.LogInformation("GetDocumentById called with id: {Id}", id);
            var doc = await _context.Documents.FindAsync(id);
            if (doc == null) return NotFound();
            return doc;
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult<Document>> AddDocument([FromBody] Document doc)
        {
            _logger.LogInformation("AddDocument called with doc: {@Doc}", doc);
            _context.Documents.Add(doc);
            await _context.SaveChangesAsync();
            var docJson = JsonConvert.SerializeObject(doc);
            _publisher.PublishMessage(docJson);
            return CreatedAtAction(nameof(GetDocumentById), new { id = doc.Id }, doc);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(string id)
        {
            _logger.LogInformation("DeleteDocument called with id: {Id}", id);
            var doc = await _context.Documents.FindAsync(id);
            if (doc == null) return NotFound();

            _context.Documents.Remove(doc);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

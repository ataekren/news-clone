using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.Models;

namespace NewsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly NewsDbContext _context;

    public NewsController(NewsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NewsModel>>> GetNewsData()
    {
        return await _context.News.Take(10).ToListAsync();
    }

    [HttpGet("secondaryNews")]
    public async Task<ActionResult<NewsModel>> GetSecondaryNewsData()
    {
        var secondaryNews = await _context.News.Skip(10).Take(1).FirstOrDefaultAsync();
        
        return secondaryNews;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NewsModel>> GetNewsItem(int id)
    {
        var newsItem = await _context.News.FindAsync(id);

        if (newsItem == null)
        {
            return NotFound();
        }

        return newsItem;
    }

} 
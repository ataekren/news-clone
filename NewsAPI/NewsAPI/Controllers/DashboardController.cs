using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.Models;

namespace NewsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly NewsDbContext _context;

    public DashboardController(NewsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetDashboardData()
    {
        var financeData = await _context.Finance.ToListAsync();
        var newsData = await _context.News.ToListAsync();
        var weatherData = await _context.Weather.ToListAsync();

        return new
        {
            Finance = financeData,
            News = newsData,
            Weather = weatherData
        };
    }
} 
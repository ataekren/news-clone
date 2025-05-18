using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.Models;

namespace NewsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly NewsDbContext _context;

    public WeatherController(NewsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeatherModel>>> GetWeatherData()
    {
        var weatherData = await _context.Weather.ToListAsync();

        string[] turkishDays = { "Pzr", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt" };

        foreach (var item in weatherData)
        {
            if (int.TryParse(item.Day, out int dayIndex) && dayIndex >= 0 && dayIndex <= 6)
            {
                item.Day = turkishDays[dayIndex];
            }
        }

        var todayIndex = (int)DateTime.Now.DayOfWeek;

        var orderedData = weatherData.OrderBy(w =>
        {
            if (int.TryParse(w.Day, out int dayIndex))
            {
                return (dayIndex - todayIndex + 7) % 7;
            }
            return int.MaxValue;
        }).ToList();

        return orderedData;

    }

}
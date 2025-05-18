using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.Models;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController
    {
        private readonly NewsDbContext _context;
        public AdsController(NewsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdModel>>> GetAds()
        {
            return await _context.Ads.ToListAsync();
        }
    }
}

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


        [HttpGet("{id}")]
        public async Task<ActionResult<AdModel>> GetAdsItem(int id)
        {
            var adsItem = await _context.Ads.FindAsync(id);

            return adsItem;
        }
    }
}

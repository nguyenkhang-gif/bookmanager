
using System.Net;
using backend.DataAccess;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookCardController : ControllerBase
    {

        private readonly IUnitOfWork context;



        public BookCardController(IUnitOfWork context)
        {
            this.context = context;
        }

        [HttpGet("[action]")]

        public async Task<IEnumerable<BookCard>> get()
        {
            return await context.bookCards.GetAsync();
        }
        [HttpPost("[action]")]

        public async Task<IActionResult> insertBook([FromBody] BookCard temp)
        {
            try
            {
                await context.bookCards.InsertAsync(temp);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());

            }
        }


    }
}
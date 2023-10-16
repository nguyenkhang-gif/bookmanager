
using System.Net;
using backend.DataAccess;
using backend.models;
using Microsoft.AspNetCore.Http.Features;
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

        public async Task<IEnumerable<Book>> get()
        {
            return await context.bookCards.GetAsync();
        }


        [HttpGet("[action]/{id}")]
        public async Task<Book> getBookWithId([FromRoute] int id)
        {
            return await context.bookCards.getSingleAsync(id);
        }

        
        [HttpPost("[action]")]

        public async Task<IActionResult> insertBook([FromBody] Book temp)
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
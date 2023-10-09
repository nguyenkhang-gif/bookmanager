
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

        

        public BookCardController(IUnitOfWork context){
            this.context = context;
        }

        [HttpGet("[action]")]

        public async Task<IEnumerable<BookCard>> get(){
            return await context.bookCards.GetAsync();
        }

       
    }
}
// using System;
// using System.Collections.Generic;
// using System.Diagnostics;
// using System.Linq;
// using System.Threading.Tasks;
// using backend.DataAccess;
// using backend.models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Logging;
// using Microsoft.Identity.Client;

// namespace backend.Controllers
// {   
//     [ApiController]
//     [Route("[controller]")]
//     public class ReviewController : ControllerBase
//     {
//         private readonly IUnitOfWork dbcontext;

//         public ReviewController(IUnitOfWork dbcontext){
//             this.dbcontext=dbcontext;
//         }

//         [HttpGet("[action]")]
//         public async Task<IEnumerable<Review>> get(){
//             return await dbcontext.Reviews.GetAsync();
//         }
        
//         [HttpGet("[action]/{id}")]
        // public async Task<Review> getReviewWithBookId([FromRoute] int id)
        // {
        //     // return await dbcontext.Reviews.getSingleAsync(item => item.BookId==id); 
        // }
        // [HttpGet("[action]/{id}")]
        // public async Task<Review> getReviewWithUserId([FromRoute] int id)
        // {
        //     return await dbcontext.Reviews.getSingleAsync(item => item.UserId==id); 
        // }

//     }
// }
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using backend.DataAccess;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class DbosachController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public DbosachController(IUnitOfWork context)
        {
            this.context = context;
        }


        [HttpGet("[action]")]
        public async Task<ActionResult<int?>> GetHighestReview()
        {
            var bookList = await context.NhanXets.GetAsync();
            var groupedComments = bookList.GroupBy(item => item.Sachid);
            // NhanXet highestComent = null;
            int? highestAverageSachId = -1;
            double highestAverage = double.MinValue;
            foreach (var group in groupedComments)
            {
                double averageRating = group.Average(comment => (double)comment.rating);
                if (averageRating > highestAverage)
                {
                    highestAverage = averageRating;
                    highestAverageSachId = group.Key;
                }
            }
            
            return Ok(highestAverageSachId);
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<String>> GetMostReview()
        {
            var bookList = await context.NhanXets.GetAsync();
            var groupedComments = bookList.GroupBy(item => item.Sachid);

            int? highestAverageSachId = -1;
            double highestAverage = double.MinValue;
            foreach (var group in groupedComments)
            {
                int frequency = group.Count();
                if (frequency > highestAverage)
                {
                    highestAverage = frequency;
                    highestAverageSachId = group.Key;
                }
            }
            return Ok(highestAverageSachId + " " + highestAverage);
        }



        [HttpGet("[action]")]
        public async Task<ActionResult<Dbosach>> GetMostBorrowCount()
        {
            // Dbosach temp = new Dbosach();
            var bookList = await context.Dbosaches.GetAsync();


            return Ok(bookList.OrderByDescending(book => book.borrowCount).FirstOrDefault());
        }


        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndex([FromRoute] int pageIndex, [FromRoute] int pageSize)
        {
            return await context.Dbosaches.GetAsync(pageIndex, pageSize);
        }
        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndexAndCateAndContent([FromRoute] int pageIndex, int pageSize, [FromQuery] int? catid, [FromQuery] string content)
        {
            return await context.Dbosaches.GetAsync(pageIndex, pageSize, item =>
                (!catid.HasValue || item.Chudeid == catid) && (string.IsNullOrEmpty(content) || item.Tensach.Contains(content))
            );
        }
        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndexAndCateId([FromRoute] int pageIndex, int pageSize, [FromQuery] int? catid)
        {
            return await context.Dbosaches.GetAsync(pageIndex, pageSize, item => !catid.HasValue || item.Chudeid == catid);
        }

        // [HttpGet("[action]/{pageIndex}/{pageSize}/{catid}/{content}")]
        // public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndexAndCateAndContent([FromRoute] int pageIndex, int pageSize, int? catid, string content)
        // {
        //     return await context.Dbosaches.GetAsync(pageIndex, pageSize, item =>
        //         (!catid.HasValue || item.Chudeid == catid) && (string.IsNullOrEmpty(content) || item.Tensach.Contains(content))
        //     );
        // }
        // public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndexAndCateAndContent([FromRoute] int pageIndex, int pageSize, int catid, string content)
        // {


        //     return await context.Dbosaches.GetAsync(pageIndex, pageSize, item => item.Chudeid == catid && item.Tensach.Contains(content));
        // }


        [HttpGet("[action]")]

        public async Task<IEnumerable<Dbosach>> get()
        {
            return await context.Dbosaches.GetAsync();
        }
        [HttpGet("[action]/{id}")]

        public async Task<Dbosach> getById([FromRoute] int id)
        {
            return await context.Dbosaches.getSingleAsync(id);
        }


        [HttpGet("[action]/{id}")]

        public async Task<IEnumerable<Dbosach>> getByChuDeId([FromRoute] int id)
        {
            return await context.Dbosaches.GetAsync(item => item.Chudeid == id);
        }

        [HttpPost("[action]/{id}/{searchcontent}")]

        public async Task<IEnumerable<Dbosach>> getByChuDeIdAndString([FromRoute] int? id, string searchcontent)
        {
            return await context.Dbosaches.GetAsync(item => (!id.HasValue || item.Chudeid == id) && item.Tensach.Contains(searchcontent));
        }
        [HttpPost("[action]/{searchcontent}")]

        public async Task<IEnumerable<Dbosach>> getByString([FromRoute] string searchcontent)
        {
            return await context.Dbosaches.GetAsync(item => item.Tensach.Contains(searchcontent));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] Dbosach item)
        {
            try
            {
                await context.Dbosaches.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Update([FromBody] Dbosach item)
        {
            try
            {
                context.Dbosaches.Update(item);
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
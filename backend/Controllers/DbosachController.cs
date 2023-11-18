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

        [HttpPost("[action]/{bookid}")]
        public async Task<IActionResult> UploadFile([FromRoute] int bookid)
        {
            var user = await context.Dbosaches.getSingleAsync(bookid);
            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    user.imageData = fileBytes;

                    // Xử lý fileBytes ở đây (ví dụ: lưu vào cơ sở dữ liệu)
                    context.Dbosaches.Update(user);
                    await context.SaveChangesAsync();
                    // ...

                    return Ok(new { Message = "File uploaded successfully" });
                }
            }
            else
            {
                return BadRequest(new { Message = "File is empty" });
            }
        }
        [HttpGet("[action]/{userid}")]
        public async Task<IActionResult> GetImage([FromRoute] int userid)
        {
            var user = await context.Dbosaches.getSingleAsync(userid);

            if (user == null || user.imageData == null)
            {
                return NotFound(new { Message = "Image not found" });
            }

            return File(user.imageData, "image/jpeg"); // Đặt loại MIME phù hợp
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetImages()
        {
            var users = await context.Dbosaches.GetAsync();

            if (users == null || users.Count() == 0)
            {
                return NotFound(new { Message = "Images not found" });
            }

            // Tạo danh sách để lưu trữ các FileContentResult
            var imageResults = new List<FileContentResult>();

            foreach (var user in users)
            {
                if (user.imageData != null)
                {
                    // Thêm mỗi hình ảnh vào danh sách
                    var imageResult = new FileContentResult(user.imageData, "image/jpeg");
                    imageResults.Add(imageResult);
                }
            }

            // Trả về danh sách các hình ảnh
            return new ObjectResult(imageResults);
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



        [HttpGet("[action]")]

        public async Task<IEnumerable<Dbosach>> get()
        {
            return await context.Dbosaches.GetAsync();
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Dbosach>> GetByIds([FromQuery] List<int?> ids)
        {
            // Lấy các đối tượng có ID thuộc danh sách ids từ database
            var result = await context.Dbosaches.GetAsync(item=>ids.Contains(item.Id));

            return result;
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
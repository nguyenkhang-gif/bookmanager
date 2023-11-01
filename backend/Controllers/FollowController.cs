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
    public class FollowController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public FollowController(IUnitOfWork context)
        {
            this.context = context;
        }
        [HttpGet("[action]/{id}")]
        public async Task<IEnumerable<YeuThich>> get()
        {
            return await context.YeuThiches.GetAsync();
        }
        [HttpGet("[action]/{id}/{bookid}")]
        public async Task<YeuThich> getByUserId([FromRoute] int id, int bookid)
        {
            return await context.YeuThiches.getSingleAsync(item => item.taikhoanid == id && item.Sachid == bookid);
        }
        [HttpGet("[action]/{id}")]
        public async Task<YeuThich> getByBookId([FromRoute] int id)
        {
            return await context.YeuThiches.getSingleAsync(item => item.Sachid == id);
        }
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] YeuThich temp)
        {
            try
            {
                // Kiểm tra xem mục YeuThich đã tồn tại trong cơ sở dữ liệu
                var existingItem = await context.YeuThiches.getSingleAsync(item => item.taikhoanid == temp.taikhoanid && item.Sachid == temp.Sachid);
                if (existingItem != null)
                {
                    // Mục YeuThich đã tồn tại, bạn có thể trả về mã lỗi hoặc thông báo tùy ý.
                    return StatusCode((int)HttpStatusCode.Conflict, "Mục đã tồn tại trong cơ sở dữ liệu.");
                }

                // Nếu mục không tồn tại, thêm nó và lưu thay đổi
                context.YeuThiches.InsertAsync(temp);
                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                await context.YeuThiches.DeleteAsync(id);
                await context.SaveChangesAsync();
                return Ok("xóa thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

    }
}
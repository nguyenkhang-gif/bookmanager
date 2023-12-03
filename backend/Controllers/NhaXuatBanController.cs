
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
    public class NhaXuatBanController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public NhaXuatBanController(IUnitOfWork context)
        {
            this.context = context;
        }


        [HttpGet("[action]")]
        public async Task<IEnumerable<NhaXuatBan>> get()
        {
            return await context.NhaXuatBans.GetAsync();
        }

        [HttpGet("[action]/{id}")]
        public Task<NhaXuatBan> getWithId([FromRoute] int id)
        {
            return context.NhaXuatBans.getSingleAsync(id);
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Insert([FromBody] NhaXuatBan item)
        {
            try
            {
                context.NhaXuatBans.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok("add thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody] NhaXuatBan item)
        {
            try
            {
                context.NhaXuatBans.Update(item);
                await context.SaveChangesAsync();
                return Ok("update thành công");
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
                await context.NhaXuatBans.DeleteAsync(id);
                await context.SaveChangesAsync();
                return Ok("update thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

    }
}
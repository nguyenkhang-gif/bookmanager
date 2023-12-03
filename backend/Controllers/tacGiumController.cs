using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using backend.DataAccess;

using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class tacGiumController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public tacGiumController(IUnitOfWork context)
        {
            this.context = context;
        }

        [HttpGet("[action]")]

        public async Task<IEnumerable<TacGium>> get()
        {
            return await context.TacGia.GetAsync();
        }

        [HttpGet("[action]/{id}")]

        public async Task<TacGium> getById([FromRoute] int id)
        {
            return await context.TacGia.getSingleAsync(id);
        }
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] TacGium item)
        {
            try
            {
                await context.TacGia.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpPost("[action]")]
        public async Task<ActionResult> Update([FromBody] TacGium item)
        {

            try
            {
                context.TacGia.Update(item);
                await context.SaveChangesAsync();
                return Ok("edit thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }


        [HttpDelete("[action]/{id}")]

        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                await context.TacGia.DeleteAsync(id);
                await context.SaveChangesAsync();
                return Ok("delete thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
    }
}
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
    public class TaiKhoanController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public TaiKhoanController(IUnitOfWork context)
        {
            this.context = context;
        }

        [HttpGet("[action]")]

        public async Task<IEnumerable<TaiKhoan>> get()
        {
            return await context.TaiKhoans.GetAsync();
        }
        [HttpGet("[action]/{id}")]

        public async Task<TaiKhoan> getById([FromRoute] int id)
        {
            return await context.TaiKhoans.getSingleAsync(id);
        }


        [HttpPost("[action]")]
        public async Task<TaiKhoan> Login([FromBody] TaiKhoan temp)
        {
            // try
            // {
            //     var checkLogin = await context.TaiKhoans.getSingleAsync(item => item.Username == temp.Username && item.Password == temp.Password);
            //     if (checkLogin != null)
            //     {
            //         return Ok();
            //     }
            //     return StatusCode(404);
            // }
            // catch (Exception e)
            // {
            //     return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            // }
            return await context.TaiKhoans.getSingleAsync(item => item.Username == temp.Username && item.Password == temp.Password);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] TaiKhoan item)
        {
            try
            {
                await context.TaiKhoans.InsertAsync(item);
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
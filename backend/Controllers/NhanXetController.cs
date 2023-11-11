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
    public class NhanXetController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public NhanXetController(IUnitOfWork context)
        {
            this.context = context;
        }
        [HttpGet("[action]")]

        public async Task<IEnumerable<NhanXet>> get()
        {
            return await context.NhanXets.GetAsync();
        }
        // nhận xét
        [HttpGet("[action]/{id}")]
        public async Task<NhanXet> getSinglewithId([FromRoute] int id){
            return await context.NhanXets.getSingleAsync(item=>item.Sachid==id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IEnumerable<NhanXet>> getAllwithId([FromRoute]int id){
            return await context.NhanXets.GetAsync(item=>item.Sachid==id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IEnumerable<NhanXet>> getAllwithUserId([FromRoute]int id){
            
            return await context.NhanXets.GetAsync(item=>item.Userid==id);
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Insert([FromBody]NhanXet item){
            try{
                context.NhanXets?.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok("add thành công");
            }catch(Exception e){
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody]NhanXet item){
            try{
                context.NhanXets.Update(item);
                await context.SaveChangesAsync();
                return Ok("add thành công");
            }catch(Exception e){
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }



        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                
                await context.NhanXets.DeleteAsync(id);
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
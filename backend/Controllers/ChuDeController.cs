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
    public class ChuDeController : ControllerBase
    {
         private readonly IUnitOfWork context;

        public ChuDeController(IUnitOfWork context)
        {
            this.context = context;
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<ChuDe>> get(){
            return await context.ChuDes.GetAsync();
        }

        [HttpGet("[action]/{id}")]
        public Task<ChuDe> getWithId([FromRoute] int id){
            return context.ChuDes.getSingleAsync(id);
        }
        


        [HttpPost("[action]")]
        public async Task<IActionResult> Insert([FromBody]ChuDe item){
            try{
                context.ChuDes.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok("add thành công");
            }catch(Exception e){
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody]ChuDe item){
            try{
                context.ChuDes.Update(item);
                await context.SaveChangesAsync();
                return Ok("update thành công");
            }catch(Exception e){
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id){
            try{
                await context.ChuDes.DeleteAsync(id);
                await context.SaveChangesAsync();
                return Ok("update thành công");
            }catch(Exception e){
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }


    }
}
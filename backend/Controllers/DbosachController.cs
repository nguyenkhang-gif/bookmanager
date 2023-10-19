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

        public async Task<IEnumerable<Dbosach>> get()
        {
            return await context.Dbosaches.GetAsync();
        }
        [HttpGet("[action]/{id}")]

        public async Task<Dbosach> getById([FromRoute] int id)
        {
            return await context.Dbosaches.getSingleAsync(id);
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
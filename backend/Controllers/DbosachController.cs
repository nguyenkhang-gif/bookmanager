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

        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<Dbosach>> GetAllWithSizeAndIndex([FromRoute] int pageIndex, [FromRoute] int pageSize)
        {
            return await context.Dbosaches.GetAsync(pageIndex, pageSize);
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


        [HttpGet("[action]/{id}")]

        public async Task<IEnumerable<Dbosach>> getByChuDeId([FromRoute] int id)
        {
            return await context.Dbosaches.GetAsync(item => item.Chudeid == id);
        }

        [HttpPost("[action]/{id}/{searchcontent}")]

        public async Task<IEnumerable<Dbosach>> getByChuDeIdAndString([FromRoute] int id, string searchcontent)
        {
            return await context.Dbosaches.GetAsync(item => item.Chudeid == id && item.Tensach.Contains(searchcontent));
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

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
        public async Task<IEnumerable<NhaXuatBan>> get(){
            return await context.NhaXuatBans.GetAsync();
        }

        [HttpGet("[action]/{id}")]
        public Task<NhaXuatBan> getWithId([FromRoute] int id)
        {
            return context.NhaXuatBans.getSingleAsync(id);
        }

    }
}
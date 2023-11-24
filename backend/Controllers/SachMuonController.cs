using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DataAccess;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SachMuonController : ControllerBase
    {
        private readonly IUnitOfWork context;

        public SachMuonController(IUnitOfWork context)
        {
            this.context = context;
        }


        [HttpGet("[action]")]
        public async Task<IEnumerable<SachMuon>> get()
        {
            return await context.SachMuons.GetAsync();
        }



        [HttpPost("[action]")]

        public async Task<IActionResult> Insert([FromBody] SachMuon item)
        {
            try
            {
                context.SachMuons.InsertAsync(item);
                await context.SaveChangesAsync();
                return Ok("add thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpGet("[action]/{id}")]

        public async Task<IActionResult> InsertList([FromRoute] int id, [FromQuery] List<int?> ids, [FromQuery] List<int?> soluongs)
        {
            // ids là list các sách đặt max là 8
            // id là id của phiếu mượn
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    SachMuon temp = new SachMuon();
                    temp.Sachid = ids[i];
                    if(soluongs[i]!=null){
                        temp.Soluong = soluongs[i]; 
                    }else temp.Soluong=1;
                     // Assuming soluongs is a List or array
                    temp.Phieumuonid = id;
                    context.SachMuons.InsertAsync(temp);
                }

                await context.SaveChangesAsync();
                return Ok("add thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }

        }



    }
}
// CREATE TABLE [dbo].[PhieuMuon] (
//     [id]       INT      NOT NULL,
//     [ngaymuon] DATETIME NULL,
//     [userid]   INT      NULL,
//     [ngaytra]  DATETIME NULL,
//     PRIMARY KEY CLUSTERED ([id] ASC),
//     FOREIGN KEY ([userid]) REFERENCES [dbo].[TaiKhoan] ([id])
// );
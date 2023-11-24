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
    public class PhieuMuonController : Controller
    {
        private readonly IUnitOfWork context;
        public PhieuMuonController(IUnitOfWork context)
        {
            this.context = context;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<PhieuMuon>> get()
        {
            return await context.PhieuMuons.GetAsync();
        }
        [HttpGet("[action]/{id}")]
        public async Task<PhieuMuon> getById([FromRoute] int id)
        {
            return await context.PhieuMuons.getSingleAsync(id);
        }

        [HttpGet("[action]/{userid}")]
        public async Task<IEnumerable<PhieuMuon>> getByUserId([FromRoute] int userid)
        {
            return await context.PhieuMuons.GetAsync(item => item.Userid == userid);
        }





        [HttpPost("[action]")]

        public async Task<IActionResult> insert([FromBody] PhieuMuon item)
        {
            try
            {
                context.PhieuMuons.InsertAsync(item);

                await context.SaveChangesAsync();
                var returnitem = context.PhieuMuons.getSingleAsync(item_1 => item_1.Userid == item.Userid && item_1.Ngaymuon == item.Ngaymuon && item_1.Ngaytra == item.Ngaytra);
                if (returnitem != null)
                {
                    int insertedItemId = returnitem.Id;
                    return Ok($"Add thành công, id: {insertedItemId}");
                }
                else
                {
                    return BadRequest("Không thể tìm thấy item sau khi insert");
                }
                // return Ok("add thành công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpPost("[action]")]

        public async Task<ActionResult<PhieuMuon>> getId([FromBody] PhieuMuon item)
        {
            return await context.PhieuMuons.getSingleAsync(item_1 => item_1.Userid == item.Userid && item_1.Ngaymuon == item.Ngaymuon && item_1.Ngaytra == item.Ngaytra);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody] PhieuMuon item)
        {
            try
            {
                context.PhieuMuons.Update(item);
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
                await context.PhieuMuons.DeleteAsync(id);
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
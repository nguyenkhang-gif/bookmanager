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

        //=======================HANDLE SEARCH STUFF=============
        [HttpPost("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<PhieuMuon>> GetAllWithSizeAndIndex([FromRoute] int pageIndex, [FromRoute] int pageSize)
        {
            return await context.PhieuMuons.GetAsync(pageIndex, pageSize);
        }
        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<PhieuMuon>> GetAllWithSizeAndIndexAndContent([FromRoute] int pageIndex, [FromRoute] int pageSize, [FromQuery] string? content, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            
            return await context.PhieuMuons.GetAsync(pageIndex, pageSize, item =>
            // chekc start date 
            (startDate==null? true:(item.Ngaymuon.Value.Year == startDate.Value.Year &&
            item.Ngaymuon.Value.Month == startDate.Value.Month &&
            item.Ngaymuon.Value.Day == startDate.Value.Day)) &&
            //check end date 
            (endDate==null? true:(item.Ngaytra.Value.Year == endDate.Value.Year &&
            item.Ngaytra.Value.Month == endDate.Value.Month &&
            item.Ngaytra.Value.Day == endDate.Value.Day))
            // check content
            &&
            (content != null ? item.Userid.ToString().Contains(content) : true)
            );
            //     DateTime temp=DateTime.Parse("2023-11-20T10:00:00");
            //     Console.WriteLine(temp.ToString());
            //     return await context.PhieuMuons.GetAsync(pageIndex, pageSize, item =>
            //     (startDate == null || item.Ngaymuon.ToString().Contains(startDate))
            //     && (endDate == null || item.Ngaytra.ToString().Contains(endDate))
            //     && (content == null || item.Ngaymuon.ToString().Contains(content) || item.Ngaytra.ToString().Contains(content)));
        }
        //=======================END OF HANDLE SEARCH STUFF=============


        [HttpGet("[action]")]
        public async Task<ActionResult<PhieuMuon>> tempString()
        {
            DateTime temp = DateTime.Parse("2023-11-20T10:00:00");
            PhieuMuon temp_2 = await context.PhieuMuons.getSingleAsync(2);
            Console.WriteLine(temp_2.Ngaymuon.ToString().Contains("20/2023"));
            return temp_2;
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
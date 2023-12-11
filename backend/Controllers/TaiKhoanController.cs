using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using backend.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
// using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaiKhoanController : ControllerBase
    {
        private readonly IUnitOfWork context;
        private readonly IConfiguration Concontext;

        public TaiKhoanController(IUnitOfWork context, IConfiguration configuration)
        {
            this.context = context;
            this.Concontext = configuration;
        }

        [HttpPost("[action]/{userid}")]
        public async Task<IActionResult> UploadFile([FromRoute] int userid)
        {
            var user = await context.TaiKhoans.getSingleAsync(userid);
            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    user.imageData = fileBytes;

                    // Xử lý fileBytes ở đây (ví dụ: lưu vào cơ sở dữ liệu)
                    context.TaiKhoans.Update(user);
                    await context.SaveChangesAsync();
                    // ...

                    return Ok(new { Message = "File uploaded successfully" });
                }
            }
            else
            {
                return BadRequest(new { Message = "File is empty" });
            }
        }

        [HttpGet("[action]/{userid}")]
        public async Task<IActionResult> GetImage([FromRoute] int userid)
        {
            var user = await context.TaiKhoans.getSingleAsync(u => u.Id == userid);

            if (user == null || user.imageData == null)
            {
                return NotFound(new { Message = "Image not found" });
            }

            return File(user.imageData, "image/jpeg"); // Đặt loại MIME phù hợp
        }

        [HttpGet("[action]"), Authorize]
        public ActionResult<string> GetMe()
        {
            var user = User;

            // Check if the user is authenticated
            if (user.Identity.IsAuthenticated)
            {
                // Get the "NameIdentifier" claim value
                var nameIdentifier = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!string.IsNullOrEmpty(nameIdentifier))
                {
                    // Use the "NameIdentifier" value
                    return Ok(nameIdentifier);
                }
            }
            return Ok(user);
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
        [HttpGet("[action]/{id}")]

        public async Task<string> getNameById([FromRoute] int id)
        {
            var temp = await context.TaiKhoans.getSingleAsync(id);
            return temp.Username!;
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<string>> Login([FromBody] authDum temp)
        {
            var checkIfHave = await context.TaiKhoans.getSingleAsync(user => user.Username == temp.username);
            if (checkIfHave != null)
            {
                if (!VerifyPasswordHash(temp.password, checkIfHave.passwordHash, checkIfHave.passwordSalt))
                {
                    return BadRequest("wrong password");
                }
                else
                {
                    string token = createToken(checkIfHave);
                    return Ok(token);
                }
            }
            else return BadRequest("sai tài khoảng");
        }

        // register 
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] authDum item)
        {
            TaiKhoan temp = new TaiKhoan();
            //handle geneterate password
            var checkIfHave = await context.TaiKhoans.getSingleAsync(user => user.Username == item.username);

            // return checkIfHave
            if (checkIfHave != null)
            {
                return StatusCode(404, "already have user");
            }
            else
            {
                CreatePasswordHash(item.password, out byte[] passwordHash, out byte[] passwordSalt);
                temp.Username = item.username;
                temp.Gioitinh = true;
                temp.Quyen = 2;
                temp.Bikhoa = 0;
                temp.FirstName = "user123";
                temp.LastName = "user123";
                temp.email = item.email;
                temp.passwordHash = passwordHash;
                temp.passwordSalt = passwordSalt;
                try
                {
                    await context.TaiKhoans.InsertAsync(temp);
                    await context.SaveChangesAsync();
                    return Ok("register success!!");
                }
                catch (Exception e)
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
                }
                // return Ok(temp);

            }


        }


        [HttpPost("[action]")]
        public async Task<ActionResult> InsertList([FromBody] List<authDum> allitem)
        {
            foreach (var item in allitem)
            {
                TaiKhoan temp = new TaiKhoan();
                //handle geneterate password
                var checkIfHave = await context.TaiKhoans.getSingleAsync(user => user.Username == item.username);

                // return checkIfHave
                if (checkIfHave != null)
                {
                    // return StatusCode(404, "already have user");
                }
                else
                {
                    CreatePasswordHash(item.password, out byte[] passwordHash, out byte[] passwordSalt);
                    temp.Username = item.username;
                    temp.Quyen = 2;//user binh thuong
                    temp.FirstName = "user123";
                    temp.LastName = "user123";
                    temp.email = item.email;
                    temp.passwordHash = passwordHash;
                    temp.passwordSalt = passwordSalt;
                    try
                    {
                        await context.TaiKhoans.InsertAsync(temp);
                        await context.SaveChangesAsync();
                        // return Ok("register success!!");
                    }
                    catch (Exception e)
                    {
                        return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
                    }
                    // return Ok(temp);

                }
            }
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<string>> Update([FromBody] TaiKhoan item, [FromQuery] string? oldPassword, string? newPassword)
        {
            var tempitem = await context.TaiKhoans.getSingleAsync(usertemp => usertemp.Id == item.Id);
            if (tempitem != null)
            {
                Console.WriteLine("oldpass", oldPassword);
                Console.WriteLine("new pass ", newPassword);
                if (oldPassword != null && newPassword != null)
                {

                    if (VerifyPasswordHash(oldPassword, tempitem.passwordHash!, tempitem.passwordSalt!))
                    {
                        CreatePasswordHash(newPassword!, out byte[] passwordHash, out byte[] passwordSalt);
                        // temp.Username = item.username;
                        tempitem.Bikhoa = item.Bikhoa;
                        tempitem.FirstName = item.FirstName;
                        tempitem.LastName = item.LastName;
                        tempitem.phone_number = item.phone_number;
                        tempitem.email = item.email;
                        tempitem.Quyen = item.Quyen;
                        tempitem.Gioitinh = item.Gioitinh;
                        tempitem.Ngaysinh = item.Ngaysinh;
                        tempitem.imageData = item.imageData;
                        tempitem.passwordHash = passwordHash;
                        tempitem.passwordSalt = passwordSalt;
                        try
                        {
                            string token = createToken(tempitem);
                            context.TaiKhoans.Update(tempitem);
                            await context.SaveChangesAsync();
                            return token;
                        }
                        catch (Exception e)
                        {
                            return e.ToString();
                        }
                        // return "change password";
                    }
                }
                else
                {
                    tempitem.Bikhoa = item.Bikhoa;
                    tempitem.FirstName = item.FirstName;
                    tempitem.phone_number = item.phone_number;
                    tempitem.email = item.email;
                    tempitem.LastName = item.LastName;
                    tempitem.Quyen = item.Quyen;

                    tempitem.imageData = item.imageData;

                    tempitem.Gioitinh = item.Gioitinh;
                    tempitem.Ngaysinh = item.Ngaysinh;
                    try
                    {
                        context.TaiKhoans.Update(tempitem);
                        await context.SaveChangesAsync();
                        return "edit thành công không thay đổi pass";
                    }
                    catch (Exception e)
                    {
                        return e.ToString();
                    }
                }
                // return "there are user";
            }
            return "error";

        }
        [HttpGet("[action]/{userid}")]
        public async Task<ActionResult<string>> ResetPass([FromRoute] int userid)
        {
            var tempitem = await context.TaiKhoans.getSingleAsync(usertemp => usertemp.Id == userid);
            if (tempitem != null)
            {
                CreatePasswordHash("user1234", out byte[] passwordHash, out byte[] passwordSalt);
                // temp.Username = item.username;

                tempitem.passwordHash = passwordHash;
                tempitem.passwordSalt = passwordSalt;
                try
                {
                    string token = createToken(tempitem);
                    context.TaiKhoans.Update(tempitem);
                    await context.SaveChangesAsync();
                    return "Reset thành công!!";
                }
                catch (Exception e)
                {
                    return e.ToString();
                }
            }
            else
                return "error";

        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
            // return  true;
        }

        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<TaiKhoan>> GetAllWithSizeAndIndex([FromRoute] int pageIndex, [FromRoute] int pageSize)
        {
            return await context.TaiKhoans.GetAsync(pageIndex, pageSize);
        }

        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<IEnumerable<TaiKhoan>> GetAllWithSizeAndIndexAndCateAndContent([FromRoute] int pageIndex, int pageSize, [FromQuery] string content)
        {
            return await context.TaiKhoans.GetAsync(pageIndex, pageSize, item => string.IsNullOrEmpty(content) || item.FirstName.Contains(content) || item.LastName.Contains(content) || item.phone_number.Contains(content) || item.email.Contains(content) || item.Id.ToString().Contains(content));
        }

        private string ConvertToPaddedString(int? number)
        {
            // Chuyển số nguyên thành chuỗi
            string strNumber = number.ToString();

            // Tính số lượng số 0 cần bù
            int zeroCount = 8 - strNumber.Length;

            // Bù số 0 nếu cần
            while (zeroCount > 0)
            {
                strNumber = '0' + strNumber;
                zeroCount--;
            }

            return strNumber;
        }



        private string createToken(TaiKhoan user)
        {
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()!),
                // new Claim(ClaimTypes.Name)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Concontext.GetSection("AppSettings:Token").Value!));
            // Concontext.GetSection("Appsettings:Token")
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }






        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                await context.TaiKhoans.DeleteAsync(id);
                await context.SaveChangesAsync();
                return Ok("xóa thành Công");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
    }
}
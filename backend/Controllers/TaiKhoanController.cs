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

        //  public TaiKhoanController(IConfiguration context)
        // {
        //     this.Concontext = context;
        // }

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
                return StatusCode(404, "alredy have user");
            }
            else
            {
                CreatePasswordHash(item.password, out byte[] passwordHash, out byte[] passwordSalt);
                temp.Username = item.username;
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

        // [HttpPost("[action]")]
        // public async Task<ActionResult> Update([FromBody] Dbosach item)
        // {

        //     try
        //     {
        //         context.Dbosaches.Update(item);
        //         await context.SaveChangesAsync();
        //         return Ok();
        //     }
        //     catch (Exception e)
        //     {
        //         return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
        //     }
        // }

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
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
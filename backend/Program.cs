
// using backend.DataAccess;
// using backend.models;
using System.Text;
using backend;
using backend.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option=>{
    option.AddSecurityDefinition("oauth2",new OpenApiSecurityScheme{
         Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    option.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("AppSettings:Token").Value!
        )),
        ValidateIssuer= false,
        ValidateAudience= false  
    };

});


builder.Services.AddDbContext<DbContext, LibraryContext>(option =>
{
    option.UseSqlServer("Server=localhost,1433;Database=library;User ID=SA;Password=Password123;Trusted_Connection=False;TrustServerCertificate=True;Encrypt=True;");
});
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddCors(cors =>
{
    cors.AddPolicy("default", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

var app = builder.Build();
app.UseCors("default");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

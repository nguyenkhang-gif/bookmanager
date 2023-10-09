using backend.DataAccess;
using backend.models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbContext,BookDbContext>(option=>{
    option.UseSqlServer("Data Source=DESKTOP-NQ9064U\\SQLEXPRESS;Initial Catalog=bookDB;Trusted_Connection=Yes;TrustServerCertificate=True;");
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

app.UseAuthorization();

app.MapControllers();

app.Run();

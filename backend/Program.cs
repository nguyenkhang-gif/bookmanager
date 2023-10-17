// using backend.DataAccess;
// using backend.models;
using backend;
using backend.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbContext, LibraryContext>(option =>
{
    option.UseSqlServer("Server=localhost,1433;Database=library;User ID=sa;Password={Luunhungbinthy1};Trusted_Connection=False;TrustServerCertificate=True;Encrypt=True;");
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
// app.UseCors("default");
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

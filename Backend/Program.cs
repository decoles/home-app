using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Utilities;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<SchwabTokenRefresher>();
builder.Services.AddHttpClient<SchwabApiService>();

builder.Services.AddLogging();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=home-financialdb.db"));


builder.Services.AddControllers();
builder.Services.AddScoped<TransactionsService>();
builder.Services.AddScoped<FinancialService>();

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

_ = Task.Run(async () =>
{
    var refresher = app.Services.GetRequiredService<SchwabTokenRefresher>();
    var timer = new PeriodicTimer(TimeSpan.FromMinutes(29));

    while (await timer.WaitForNextTickAsync())
    {
        var result = await refresher.RefreshTokensAsync();
        Console.WriteLine($"[Periodic Refresh] Result: {result ?? "Failed"}");
    }
});

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();  

app.Run();
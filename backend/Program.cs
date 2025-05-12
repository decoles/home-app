using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<SchwabTokenRefresher>();
builder.Services.AddHttpClient<SchwabApiService>();

builder.Services.AddLogging();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endpoints => { });
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


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

app.MapGet("/account-data", async (SchwabApiService api) =>
{
    var data = await api.GetAccountDataAsync();
    return data ?? "Failed to fetch account data.";
});

app.UseHttpsRedirection();

app.MapPost("/upload", async (IFormFile file) =>
{
    if (file == null || file.Length == 0)
        return Results.BadRequest("No file uploaded.");

    var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
    Directory.CreateDirectory(uploadsPath);

    var filePath = Path.Combine(uploadsPath, file.FileName);

    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);


    return Results.Ok($"File uploaded: {file.FileName}");
})
.DisableAntiforgery()
.Accepts<IFormFile>("multipart/form-data")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest);
app.Run();
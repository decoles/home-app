using System.Text.Json;
using Backend.Models;
using Backend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Backend.Services;

public class TransactionsService
{
    private readonly AppDbContext _db;
    private readonly ILogger<TransactionsService> _logger;

    public TransactionsService(AppDbContext db, ILogger<TransactionsService> logger)
    {
        _logger = logger; 
        _db = db;
    }

    public async Task<List<TransactionRecord>> HandleJson(IFormFile file)
    {
        using var stream = new StreamReader(file.OpenReadStream());

        using var document = JsonDocument.Parse(await stream.ReadToEndAsync());
        var root = document.RootElement;

        var postedTransactionsElement = root.GetProperty("PostedTransactions");

        var postedTransactions = JsonSerializer.Deserialize<List<TransactionRecord>>(
            postedTransactionsElement.GetRawText(),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        _logger.LogInformation($"Parsed {postedTransactions} transactions from JSON.\n");
        _logger.LogInformation($"PostedTransactions: {postedTransactionsElement.GetRawText()}");

        if (postedTransactions != null && postedTransactions.Any())
        {
            _db.AddRange(postedTransactions);
            await _db.SaveChangesAsync();
        }

        return postedTransactions ?? new List<TransactionRecord>();
    }
}
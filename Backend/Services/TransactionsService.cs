using System.Text.Json;
using Backend.Models;
using Backend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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

        if (postedTransactions == null || postedTransactions.Count == 0)
            return new List<TransactionRecord>();

        foreach (var tx in postedTransactions)
        {
            if (!string.IsNullOrEmpty(tx.Deposit))
            {
                tx.Deposit = tx.Deposit.Replace("$", "").Replace(",", "").Trim();
            }

            if (!string.IsNullOrEmpty(tx.Withdrawal))
            {
                tx.Withdrawal = tx.Withdrawal.Replace("$", "").Replace(",", "").Trim();
            }
        }

        var existingTransactions = await _db.Transactions.ToListAsync();

        var newTransactions = postedTransactions
            .Where(pt => !existingTransactions.Any(et =>
                et.Date == pt.Date &&
                et.Description == pt.Description &&
                et.Withdrawal == pt.Withdrawal &&
                et.Deposit == pt.Deposit &&
                et.RunningBalance == pt.RunningBalance &&
                et.Type == pt.Type
            ))
            .ToList();

        if (newTransactions.Any())
        {
            _db.Transactions.AddRange(newTransactions);
            await _db.SaveChangesAsync();
        }
        else
        {
            _logger.LogInformation("No new transactions to add.");
        }
        _logger.LogInformation($"Uploaded {newTransactions.Count} transaction records.");

        return newTransactions;
    }
}
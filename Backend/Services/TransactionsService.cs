using System.Text.Json;
using Backend.Models;
using Backend.Utilities;
using Microsoft.EntityFrameworkCore;

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
        using StreamReader stream = new StreamReader(file.OpenReadStream());

        using JsonDocument document = JsonDocument.Parse(await stream.ReadToEndAsync());
        JsonElement root = document.RootElement;

        JsonElement postedTransactionsElement = root.GetProperty("PostedTransactions");

        List<TransactionRecord> postedTransactions = JsonSerializer.Deserialize<List<TransactionRecord>>(
            postedTransactionsElement.GetRawText(),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        if (postedTransactions == null || postedTransactions.Count == 0)
            return new List<TransactionRecord>();

        foreach (TransactionRecord tx in postedTransactions)
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

        List<TransactionRecord> existingTransactions = await _db.Transactions.ToListAsync();

        List<TransactionRecord> newTransactions = postedTransactions
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
using System.Globalization;
using Backend.Models;
using Backend.Utilities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class FinancialService
{
    private readonly AppDbContext _db;
    private readonly SchwabApiService _schwabApiService;

    public FinancialService(SchwabApiService schwabApiService, AppDbContext db)
    {
        _db = db;
        _schwabApiService = schwabApiService;
    }

    public async Task<string?> GetAccountDataAsync()
    {
        return await _schwabApiService.GetAccountDataAsync();
    }

    public async Task<List<TransactionRecord>> GetTransactionDataAsync(string month)
    {
        if (!DateTime.TryParseExact(month, "MMMM", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
            throw new ArgumentException("Invalid month name. Use month name in full (e.g., January, February).");

        int targetMonth = parsedDate.Month;
        int currentYear = DateTime.Now.Year;

        var allTransactions = await _db.Transactions.ToListAsync();

        var transactions = allTransactions
            .Where(tr =>
                DateTime.TryParse(tr.Date, out var date) &&
                date.Month == targetMonth &&
                date.Year == currentYear)
            .ToList();

        return transactions;
    }

    public async Task<bool> SetTagsForTransactionAsync(int transactionId, List<string> tagNames)
    {
        var transaction = await _db.Transactions
            .Include(t => t.Tags)
            .FirstOrDefaultAsync(t => t.Id == transactionId);

        if (transaction == null) return false;

        // Clear old tags if needed
        transaction.Tags.Clear();

        foreach (var tagName in tagNames)
        {
            var tag = await _db.Tags.FirstOrDefaultAsync(t => t.Name == tagName);
            if (tag == null)
            {
                tag = new Tag { Name = tagName };
                _db.Tags.Add(tag);
            }

            transaction.Tags.Add(tag);
        }

        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<List<Tag>> GetTagsAsync()
    {
        var tags = await _db.Tags
            .Include(t => t.Transactions)
            .ToListAsync();
        return tags;
    }
}
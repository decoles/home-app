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
}
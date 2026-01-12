using System.Globalization;
using System.Net.Http.Headers;
using System.Text.Json;
using Backend.Models;
using Backend.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Backend.Services;

public class FinancialService
{
    private readonly AppDbContext _db;
    private readonly SchwabTokenRefresher _tokenRefresher;
    private readonly HttpClient _httpClient;
    private readonly ILogger<FinancialService> _logger;

    public FinancialService(
        AppDbContext db,
        SchwabTokenRefresher tokenRefresher,
        HttpClient httpClient,
        ILogger<FinancialService> logger)
    {
        _db = db;
        _tokenRefresher = tokenRefresher;
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<SchwabUserPreferences?> GetUserPreferencesAsync()
    {
        try
        {
            var accessToken = await _tokenRefresher.GetValidAccessTokenAsync();

            if (string.IsNullOrEmpty(accessToken))
            {
                _logger.LogError("Failed to obtain access token");
                return null;
            }

            var request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.schwabapi.com/trader/v1/userPreference");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Successfully retrieved user preferences from Schwab");

                var preferences = JsonSerializer.Deserialize<SchwabUserPreferences>(responseContent,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                _logger.LogInformation("Retrieved preferences with {Count} accounts",
                    preferences?.accounts?.Count ?? 0);

                return preferences;
            }
            else
            {
                _logger.LogError("Failed to retrieve user preferences: {StatusCode} - {Response}",
                    response.StatusCode, responseContent);
                return null;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while fetching user preferences");
            return null;
        }
    }

    public async Task<List<SchwabAccount>> GetAccountDataAsync()
    {
        try
        {
            var accessToken = await _tokenRefresher.GetValidAccessTokenAsync();

            if (string.IsNullOrEmpty(accessToken))
            {
                _logger.LogError("Failed to obtain access token");
                return new List<SchwabAccount>();
            }

            var request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.schwabapi.com/trader/v1/accounts");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Successfully retrieved account data from Schwab");

                // Deserialize with wrapper structure
                var wrappers = JsonSerializer.Deserialize<List<SchwabAccountWrapper>>(responseContent,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                // Extract the securitiesAccount from each wrapper
                var accounts = wrappers?.Select(w => w.securitiesAccount).ToList()
                    ?? new List<SchwabAccount>();

                _logger.LogInformation("Retrieved {Count} accounts", accounts.Count);
                return accounts;
            }
            else
            {
                _logger.LogError("Failed to retrieve account data: {StatusCode} - {Response}",
                    response.StatusCode, responseContent);
                return new List<SchwabAccount>();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while fetching account data");
            return new List<SchwabAccount>();
        }
    }

public async Task<List<AccountValueWithName>> GetOtherAccountValueAndNickNameAsync()
{
    List<AccountValueWithName> resultAccounts = new List<AccountValueWithName>();

    // Get the last account running balance for any unique account names in transaction db.
    var accountNames = await _db.Transactions
        .Select(t => t.AccountName)
        .Distinct()
        .ToListAsync();

    foreach (var accountName in accountNames)
    {
        // Load all transactions for this account into memory first
        var accountTransactions = await _db.Transactions
            .Where(t => t.AccountName == accountName && !string.IsNullOrEmpty(t.Date))
            .ToListAsync();
        
        // Parse dates and find the most recent transaction in memory
        var lastTransaction = accountTransactions
            .Select(t => new 
            { 
                Transaction = t,
                ParsedDate = DateTime.TryParse(t.Date, out var date) ? date : (DateTime?)null
            })
            .Where(x => x.ParsedDate.HasValue)
            .OrderByDescending(x => x.ParsedDate)
            .Select(x => x.Transaction)
            .FirstOrDefault();
            
        if (lastTransaction != null && !string.IsNullOrEmpty(lastTransaction.RunningBalance))
        {
            // Remove $ and commas, then parse
            string cleanBalance = lastTransaction.RunningBalance.Replace("$", "").Replace(",", "").Trim();
            
            if (decimal.TryParse(cleanBalance, out decimal runningBalanceDecimal))
            {
                resultAccounts.Add(new AccountValueWithName
                {
                    NickName = accountName,
                    AccountValue = runningBalanceDecimal,
                    type = "Checking"
                });
            }
        }
    }
    
    return resultAccounts;
}

    public async Task<List<AccountValueWithName>> GetAccountValueAndNickNameAsync()
    {
        List<SchwabAccount> accountsSchwab = await GetAccountDataAsync();
        SchwabUserPreferences preferences = await GetUserPreferencesAsync();
        List<AccountValueWithName> resultAccounts = new List<AccountValueWithName>();

        if (preferences?.accounts == null || accountsSchwab.Count == 0)
            return resultAccounts;

        foreach (var account in accountsSchwab)
        {
            var matchingPreference = preferences.accounts
                .FirstOrDefault(p => p.accountNumber == account.accountNumber);
            if (matchingPreference != null)
            {
                string nickNameLower = matchingPreference.nickName?.ToLower() ?? "";

                string AccountType = nickNameLower switch
                {
                    var n when n.Contains("emergency") => "Emergency Fund",
                    var n when n.Contains("savings") => "Savings",
                    var n when n.Contains("checking") => "Checking",
                    var n when n.Contains("investment") => "Investment",
                    _ => "Investment" // Default
                };

                resultAccounts.Add(new AccountValueWithName
                {
                    NickName = matchingPreference.nickName,
                    AccountValue = account.initialBalances.accountValue,
                    type = AccountType
                });
            }
        }

        resultAccounts.AddRange(await GetOtherAccountValueAndNickNameAsync());

        return resultAccounts;
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
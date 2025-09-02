using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Backend.Models;

namespace Backend.Services;

public class SchwabApiService
{
    private readonly HttpClient _httpClient;
    private readonly SchwabTokenRefresher _refresher;
    private readonly ILogger<SchwabApiService> _logger;

    public SchwabApiService(HttpClient httpClient, SchwabTokenRefresher refresher, ILogger<SchwabApiService> logger)
    {
        _httpClient = httpClient;
        _refresher = refresher;
        _logger = logger;
    }

    public async Task<string?> GetAccountDataAsync()
    {
        // var token = await _refresher.RefreshTokensAsync();
        // if (token == null)
        // {
        //     _logger.LogError("Access token was null.");
        //     return null;
        // }

        // var request = new HttpRequestMessage(HttpMethod.Get, "https://api.schwabapi.com/trader/v1/accounts");
        // request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // var response = await _httpClient.SendAsync(request);
        // var content = await response.Content.ReadAsStringAsync();

        // if (!response.IsSuccessStatusCode)
        // {
        //     _logger.LogError("Failed to retrieve account data: {Content}", content);
        //     return null;
        // }

        // _logger.LogInformation("Successfully retrieved account data.");


        // //var accounts = JsonSerializer.Deserialize<List<SchwabAccountResponse>>(content);

        // if (accounts == null || accounts.Count == 0)
        // {
        //     _logger.LogWarning("No account data returned.");
        //     return null;
        // }

        // var accountInfo = accounts.Select(acc => new
        // {
        //     AccountNumber = acc.securitiesAccount.accountNumber,
        //     LiquidationValue = acc.securitiesAccount.currentBalances.liquidationValue
        // });

        //return JsonSerializer.Serialize(accountInfo);
        
        return "Schwab API integration is currently disabled.";
    }
}

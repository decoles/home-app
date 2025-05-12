using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using dotenv.net;
using Microsoft.Extensions.Logging;

public class SchwabTokenRefresher
{
    private readonly ILogger<SchwabTokenRefresher> _logger;
    private readonly HttpClient _httpClient;

    public SchwabTokenRefresher(ILogger<SchwabTokenRefresher> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;

        // Load env variables
        DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "secrets.env") }));

    }

    public async Task<string?> RefreshTokensAsync()
    {
        _logger.LogInformation("Initializing token refresh...\n");

        var appKey = Environment.GetEnvironmentVariable("APP_KEY");
        var appSecret = Environment.GetEnvironmentVariable("APP_SECRET");
        var refreshToken = Environment.GetEnvironmentVariable("REFRESH_TOKEN");

        if (string.IsNullOrWhiteSpace(appKey) || string.IsNullOrWhiteSpace(appSecret) || string.IsNullOrWhiteSpace(refreshToken))
        {
            _logger.LogError("Missing environment variables for Schwab credentials.");
            return null;
        }

        var credentials = $"{appKey}:{appSecret}";
        var base64Credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.schwabapi.com/v1/oauth/token");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", base64Credentials);

        string body = $"grant_type=refresh_token&refresh_token={Uri.EscapeDataString(refreshToken)}";
        request.Content = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");


        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("Retrieved new tokens successfully using refresh token.");
            _logger.LogDebug("Token response: {Response}", responseContent);

            var tokenResponse = JsonSerializer.Deserialize<SchwabTokenResponse>(responseContent);
            return tokenResponse?.access_token;
        }
        else
        {
            _logger.LogError("Error refreshing access token: {Response}", responseContent);
            return null;
        }
    }
}

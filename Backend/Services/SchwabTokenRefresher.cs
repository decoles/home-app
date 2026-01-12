using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using dotenv.net;
using Backend.Models;

namespace Backend.Services;

public class SchwabTokenRefresher
{
    private readonly ILogger<SchwabTokenRefresher> _logger;
    private readonly HttpClient _httpClient;
    private string? _cachedAccessToken;
    private DateTime _tokenExpiry = DateTime.MinValue;
    
    public SchwabTokenRefresher(ILogger<SchwabTokenRefresher> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
        DotEnv.Load(options: new DotEnvOptions(
            envFilePaths: new[] { Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "secrets.env") }));
    }
    
    public async Task<string?> GetValidAccessTokenAsync()
    {
        // Return cached token if still valid (with 5 min buffer)
        if (!string.IsNullOrEmpty(_cachedAccessToken) && DateTime.UtcNow < _tokenExpiry.AddMinutes(-5))
        {
            _logger.LogDebug("Using cached access token");
            return _cachedAccessToken;
        }
        
        // Need to refresh
        return await RefreshTokensAsync();
    }
    
    public async Task<string?> RefreshTokensAsync()
    {
        _logger.LogInformation("Refreshing tokens...");
        
        var appKey = Environment.GetEnvironmentVariable("APP_KEY");
        var appSecret = Environment.GetEnvironmentVariable("APP_SECRET");
        var refreshToken = Environment.GetEnvironmentVariable("REFRESH_TOKEN");
        
        if (string.IsNullOrWhiteSpace(appKey) || string.IsNullOrWhiteSpace(appSecret) || 
            string.IsNullOrWhiteSpace(refreshToken))
        {
            _logger.LogError("Missing environment variables for Schwab credentials.");
            return null;
        }
        
        var credentials = $"{appKey}:{appSecret}";
        var base64Credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));
        
        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.schwabapi.com/v1/oauth/token");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", base64Credentials);
        
        var formData = new Dictionary<string, string>
        {
            { "grant_type", "refresh_token" },
            { "refresh_token", refreshToken }
        };
        request.Content = new FormUrlEncodedContent(formData);
        
        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();
        
        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("Retrieved new tokens successfully");
            
            var tokenResponse = JsonSerializer.Deserialize<SchwabTokenResponse>(responseContent);
            
            if (tokenResponse != null)
            {
                _cachedAccessToken = tokenResponse.access_token;
                _tokenExpiry = DateTime.UtcNow.AddSeconds(tokenResponse.expires_in);
                
                await UpdateRefreshTokenInEnvFile(tokenResponse.refresh_token);
                
                _logger.LogInformation($"Access token valid until: {_tokenExpiry}");
                
                return tokenResponse.access_token;
            }
        }
        else
        {
            _logger.LogError("Error refreshing access token: {StatusCode} - {Response}", 
                response.StatusCode, responseContent);
        }
        
        return null;
    }
    
    private async Task UpdateRefreshTokenInEnvFile(string newRefreshToken)
    {
        try
        {
            var envFilePath = Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "secrets.env");
            var lines = await File.ReadAllLinesAsync(envFilePath);
            
            for (int i = 0; i < lines.Length; i++)
            {
                if (lines[i].StartsWith("REFRESH_TOKEN="))
                {
                    lines[i] = $"REFRESH_TOKEN={newRefreshToken}";
                    break;
                }
            }
            
            await File.WriteAllLinesAsync(envFilePath, lines);
            
            // Update the environment variable for current session
            Environment.SetEnvironmentVariable("REFRESH_TOKEN", newRefreshToken);
            
            _logger.LogInformation("Updated refresh token in secrets.env");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update refresh token in env file");
        }
    }
}

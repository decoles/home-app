namespace Backend.Models;

// User Preferences Response
public class SchwabUserPreferences
{
    public List<UserAccount> accounts { get; set; } = new();
    public List<StreamerInfo> streamerInfo { get; set; } = new();
    public List<Offer> offers { get; set; } = new();
}

public class UserAccount
{
    public string accountNumber { get; set; } = string.Empty;
    public bool primaryAccount { get; set; }
    public string type { get; set; } = string.Empty;
    public string nickName { get; set; } = string.Empty;
    public string displayAcctId { get; set; } = string.Empty;
    public bool autoPositionEffect { get; set; }
    public string accountColor { get; set; } = string.Empty;
    public string lotSelectionMethod { get; set; } = string.Empty;
    public bool hasFuturesAccount { get; set; }
    public bool hasForexAccount { get; set; }
}

public class StreamerInfo
{
    public string streamerSocketUrl { get; set; } = string.Empty;
    public string schwabClientCustomerId { get; set; } = string.Empty;
    public string schwabClientCorrelId { get; set; } = string.Empty;
    public string schwabClientChannel { get; set; } = string.Empty;
    public string schwabClientFunctionId { get; set; } = string.Empty;
}

public class Offer
{
    public bool level2Permissions { get; set; }
    public string mktDataPermission { get; set; } = string.Empty;
}
namespace Backend.Models;

public class SchwabAccountResponse
{
    public SecuritiesAccount securitiesAccount { get; set; } = new();
}

public class SecuritiesAccount
{
    public string accountNumber { get; set; } = string.Empty;
    public CurrentBalances currentBalances { get; set; } = new();
}

public class CurrentBalances
{
    public decimal liquidationValue { get; set; }
}
namespace Backend.Models;

// Wrapper for Schwab's response
public class SchwabAccountWrapper
{
    public SchwabAccount securitiesAccount { get; set; } = new();
    public AggregatedBalance aggregatedBalance { get; set; } = new();
}

public class SchwabAccount
{
    public string type { get; set; } = string.Empty;
    public string accountNumber { get; set; } = string.Empty;
    public int roundTrips { get; set; }
    public bool isDayTrader { get; set; }
    public bool isClosingOnlyRestricted { get; set; }
    public bool pfcbFlag { get; set; }
    public AccountBalances initialBalances { get; set; } = new();
    public AccountBalances currentBalances { get; set; } = new();
    public ProjectedBalances projectedBalances { get; set; } = new();
}

public class AccountBalances
{
    public decimal accruedInterest { get; set; }
    public decimal cashBalance { get; set; }
    public decimal cashReceipts { get; set; }
    public decimal longOptionMarketValue { get; set; }
    public decimal liquidationValue { get; set; }
    public decimal longMarketValue { get; set; }
    public decimal moneyMarketFund { get; set; }
    public decimal savings { get; set; }
    public decimal shortMarketValue { get; set; }
    public decimal pendingDeposits { get; set; }
    public decimal mutualFundValue { get; set; }
    public decimal bondValue { get; set; }
    public decimal shortOptionMarketValue { get; set; }
    public decimal cashAvailableForTrading { get; set; }
    public decimal cashAvailableForWithdrawal { get; set; }
    public decimal cashCall { get; set; }
    public decimal longNonMarginableMarketValue { get; set; }
    public decimal totalCash { get; set; }
    public decimal cashDebitCallValue { get; set; }
    public decimal unsettledCash { get; set; }
    public bool isInCall { get; set; }
    public decimal accountValue { get; set; }
    
    // Margin-specific fields (will be 0 for CASH accounts)
    public decimal availableFundsNonMarginableTrade { get; set; }
    public decimal buyingPower { get; set; }
}

public class ProjectedBalances
{
    public decimal cashAvailableForTrading { get; set; }
    public decimal cashAvailableForWithdrawal { get; set; }
}

public class AggregatedBalance
{
    public decimal currentLiquidationValue { get; set; }
    public decimal liquidationValue { get; set; }
}
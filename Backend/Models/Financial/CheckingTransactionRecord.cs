namespace Backend.Models;

public class TransactionRecord
{
    public int Id { get; set; }
    public string? Date { get; set; }
    public string? Type { get; set; }
    public string? Description { get; set; }
    public string? Withdrawal { get; set; }
    public string? Deposit { get; set; }
    public string? RunningBalance { get; set; }
    public bool isRecurring { get; set; } = false;
    public bool isIncludedInBudget { get; set; } = true;

    // Foreign key to Categories
    public int? CategoryId { get; set; }
    public Categories? Category { get; set; }
}
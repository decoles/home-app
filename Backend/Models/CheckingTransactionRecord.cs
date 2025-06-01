namespace Backend.Models;

public class TransactionRecord
{
    public int Id { get; set; }
    public string? Date { get; set; }
    public string? Status { get; set; }
    public string? Type { get; set; }
    public string? CheckNumber { get; set; }
    public string? Description { get; set; }
    public string? Withdrawal { get; set; }
    public string? Deposit { get; set; }
    public string? RunningBalance { get; set; }
    public ICollection<Tag>? Tags { get; set; } = new List<Tag>();
}
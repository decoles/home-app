using Backend.Models;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<TransactionRecord> Transactions { get; set; } = new List<TransactionRecord>();
}
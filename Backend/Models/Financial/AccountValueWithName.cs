namespace Backend.Models;

public class AccountValueWithName
{
    public string NickName { get; set; } = string.Empty;
    public decimal AccountValue { get; set; }
    public string type { get; set; } = string.Empty;
}
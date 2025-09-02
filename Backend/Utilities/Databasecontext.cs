using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Utilities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<TransactionRecord> Transactions { get; set; }
    public DbSet<Categories> Categories { get; set; }
}

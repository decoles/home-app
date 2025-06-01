using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Utilities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<TransactionRecord> Transactions { get; set; }

    public DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TransactionRecord>()
            .HasMany(t => t.Tags)
            .WithMany(t => t.Transactions)
            .UsingEntity(j => j.ToTable("TransactionTags"));
    }
}

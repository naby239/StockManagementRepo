
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }
        public DbSet<StockItem> StockItems { get; set; }
        public DbSet<StockAccessory> Accessories { get; set; }
        public DbSet<StockImage> Images { get; set; }
    }
}
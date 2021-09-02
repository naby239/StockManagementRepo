using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class StockItemConfiguration:IEntityTypeConfiguration<StockItem>
    {
        public void Configure(EntityTypeBuilder<StockItem> builder)
        {
            builder.Property(p => p.RetailPrice).HasColumnType("decimal(18,2)");
            builder.Property(p => p.CostPrice).HasColumnType("decimal(18,2)");
            builder.HasMany(s => s.StockImages).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(s => s.Accessories).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}
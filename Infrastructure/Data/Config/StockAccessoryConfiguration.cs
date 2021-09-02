using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class StockAccessoryConfiguration : IEntityTypeConfiguration<StockAccessory>
    {
        public void Configure(EntityTypeBuilder<StockAccessory> builder)
        {
            
        }
    }
}
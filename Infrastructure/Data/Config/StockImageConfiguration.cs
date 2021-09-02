using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class StockImageConfiguration : IEntityTypeConfiguration<StockImage>
    {
        public void Configure(EntityTypeBuilder<StockImage> builder)
        {
            
        }
    }
}
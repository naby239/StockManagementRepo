using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IStockItemRepository
    {
         Task<StockItem> GetStockItemById(int id);
         Task<IQueryable<StockItem>> GetStockItemsAsync();
         Task<bool> AddStockItem(StockItem stockItem);
        Task<bool> UpdateStockItem(StockItem stockItem);
        Task<bool> DeleteStockItem(int id);
         
    }
}
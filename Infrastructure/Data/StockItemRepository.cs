using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StockItemRepository : IStockItemRepository
    {
        private readonly DataContext _context;
        public StockItemRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddStockItem(StockItem stockItem)
        {
            _context.Add(stockItem);
            var added = await _context.SaveChangesAsync();
            if (added > 0)
            {
                return true;
            }
            else
            {
                return false;
            }



        }

        public async Task<bool> DeleteStockItem(int id)
        {
            var stockItem = await _context.StockItems.Include(s => s.Accessories).Include(s => s.StockImages).FirstOrDefaultAsync(s => s.Id == id);

            _context.StockItems.Remove(stockItem);

            if (_context.SaveChanges() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<StockItem> GetStockItemById(int id)
        {
            return await _context.StockItems.Include(s => s.Accessories).Include(s => s.StockImages).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IQueryable<StockItem>> GetStockItemsAsync()
        {
            return _context.StockItems.Include(s => s.Accessories).Include(s => s.StockImages).AsNoTracking();
        }

        public async Task<bool> UpdateStockItem(StockItem stockItem)
        {
            var existingParent = _context.StockItems
        .Where(p => p.Id == stockItem.Id)
        .Include(p => p.StockImages)
        .Include(p => p.Accessories)
        .SingleOrDefault();

            if (existingParent != null)
            {
                // Update parent
                _context.Entry(existingParent).CurrentValues.SetValues(stockItem);

                // Delete children
                foreach (var existingChild in existingParent.StockImages.ToList())
                {
                    if (!stockItem.StockImages.Any(c => c.Id == existingChild.Id))
                        _context.Images.Remove(existingChild);
                }

                foreach (var existingChild in existingParent.Accessories.ToList())
                {
                    if (!stockItem.Accessories.Any(c => c.Id == existingChild.Id))
                        _context.Accessories.Remove(existingChild);
                }

                // Update and Insert children
                foreach (var childModel in stockItem.StockImages)
                {
                    var existingChild = existingParent.StockImages
                        .Where(c => c.Id == childModel.Id && c.Id != default(int))
                        .SingleOrDefault();

                    if (existingChild != null)
                        // Update child
                        _context.Entry(existingChild).CurrentValues.SetValues(childModel);
                    else
                    {
                        existingParent.StockImages.Add(childModel);
                    }
                }

                foreach (var childModel in stockItem.Accessories)
                {
                    var existingChild = existingParent.Accessories
                        .Where(c => c.Id == childModel.Id && c.Id != default(int))
                        .SingleOrDefault();

                    if (existingChild != null)
                        // Update child
                        _context.Entry(existingChild).CurrentValues.SetValues(childModel);
                    else
                    {
                        existingParent.Accessories.Add(childModel);
                    }
                }

                if (_context.SaveChanges() > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }



            return true;
        }
    }
}
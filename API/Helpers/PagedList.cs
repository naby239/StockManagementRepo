using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> where T : class
    {
        public PagedList(IEnumerable<T> items, int count,int currentCount, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count/(double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            CurrentCount = currentCount;
            Data = items;
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int CurrentCount { get; set; }
        public IEnumerable<T> Data { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1)*pageSize).Take(pageSize).ToListAsync();
            var currentCount =  items.Count();
            
            return new PagedList<T>(items, count, currentCount, pageNumber,pageSize);
        }
    }
}
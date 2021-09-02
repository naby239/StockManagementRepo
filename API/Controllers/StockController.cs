using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [Route("api/stock")]
    [ApiController]
    [Authorize]
    public class StockController : ControllerBase
    {
        private readonly IStockItemRepository _repo;
        public StockController(IStockItemRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("GetStock")]
        public async Task<ActionResult<PagedList<StockItem>>> GetStock([FromQuery]UserParams userParams)
        {
            var stockList = await _repo.GetStockItemsAsync();


            if (userParams.SearchText != "")
            {
                stockList = stockList.Where(s => s.Make.ToLower().Contains(userParams.SearchText.ToLower()) || s.Model.ToLower().Contains(userParams.SearchText.ToLower()));
            }
            switch (userParams.OrderBy)
            {
                case "dateCreated":
                    stockList = stockList.OrderBy(o => o.DateCreated);
                    break;
                case "costPriceAsc":
                    stockList = stockList.OrderBy(o => o.CostPrice);
                    break;
                case "costPriceDesc":
                    stockList = stockList.OrderByDescending(o => o.CostPrice);
                    break;
                case "retailPriceAsc":
                    stockList = stockList.OrderBy(o => o.RetailPrice);
                    break;
                case "retailPriceDesc":
                    stockList = stockList.OrderByDescending(o => o.RetailPrice);
                    break;
                case "modelYearAsc":
                    stockList = stockList.OrderBy(o => o.ModelYear);
                    break;
                case "modelYearDesc":
                    stockList = stockList.OrderByDescending(o => o.ModelYear);
                    break;
                default:
                    // code block
                    break;
            }


            return Ok( await PagedList<StockItem>.CreateAsync(stockList,userParams.pageNumber,userParams.PageSize) );
        }

        [HttpGet("getStockItem{id}")]
        public async Task<ActionResult<StockItem>> GetStockItem(int id)
        {
            var stockItem = await _repo.GetStockItemById(id);
            return Ok(stockItem);
        }

        [HttpPost("addStockItem")]
        public async Task<ActionResult<bool>> AddStockItem([FromBody]StockItemViewModel stockItem)
        {
            var stockImages = new List<StockImage>();
            foreach (var image in stockItem.StockImages)
            {
                var newImage = new StockImage()
                {
                    ImageData = Convert.FromBase64String(image.ImageData),
                    Name = image.Name
                };
                stockImages.Add(newImage);
            }

            var accessories = new List<StockAccessory>();
            foreach (var accessory in stockItem.Accessories)
            {
                var newAccessory = new StockAccessory()
                {
                    Name = accessory.Name,
                    Description = accessory.Description
                };
                accessories.Add(newAccessory);
            }

            var newStockItem = new StockItem()
            {
                RegistrationNumber = stockItem.RegistrationNumber,
                Make = stockItem.Make,
                Model = stockItem.Model,
                ModelYear = stockItem.ModelYear,
                Mileage = stockItem.Mileage,
                Color = stockItem.Color,
                VIN = stockItem.VIN,
                RetailPrice = stockItem.RetailPrice,
                CostPrice = stockItem.CostPrice,
                DateCreated = stockItem.DateCreated,
                Accessories = accessories,
                StockImages = stockImages
            };
            var added = await _repo.AddStockItem(newStockItem);

            return Ok(true);
        }

        [HttpPost("updateStockItem")]
        public async Task<ActionResult<bool>> UpdateStockItem([FromBody] StockItemViewModel stockItem)
        {
            var stockImages = new List<StockImage>();
            foreach (var image in stockItem.StockImages)
            {
                var newImage = new StockImage()
                {
                    Id = image.Id,
                    ImageData = Convert.FromBase64String(image.ImageData),
                    Name = image.Name,
                    StockItemId = image.StockItemId
                };
                stockImages.Add(newImage);
            }

            var accessories = new List<StockAccessory>();
            foreach (var accessory in stockItem.Accessories)
            {
                var newAccessory = new StockAccessory()
                {
                    Id = accessory.Id,
                    Name = accessory.Name,
                    Description = accessory.Description,
                    StockItemId = accessory.StockItemId
                };
                accessories.Add(newAccessory);
            }

            var newStockItem = new StockItem()
            {
                Id = stockItem.Id,
                RegistrationNumber = stockItem.RegistrationNumber,
                Make = stockItem.Make,
                Model = stockItem.Model,
                ModelYear = stockItem.ModelYear,
                Mileage = stockItem.Mileage,
                Color = stockItem.Color,
                VIN = stockItem.VIN,
                RetailPrice = stockItem.RetailPrice,
                CostPrice = stockItem.CostPrice,
                DateCreated = stockItem.DateCreated,
                DateUpdated = stockItem.DateUpdated,
                Accessories = accessories,
                StockImages = stockImages
            };
            var added = await _repo.UpdateStockItem(newStockItem);

            return Ok(true);
        }
        [HttpPost("deleteStockItem")]
        public async Task<ActionResult<bool>> DeleteStockItem([FromBody] int id)
        {

            var deleted = await _repo.DeleteStockItem(id);

            return Ok(true);
        }
    }

}

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.StockItems.Any())
                {
                    var stockItem = new StockItem();
                    stockItem.RegistrationNumber = "CAA 12200";
                    stockItem.Make = "BMW";
                    stockItem.Model = "M3";
                    stockItem.ModelYear = 2021;
                    stockItem.Mileage = 2500;
                    stockItem.Color = "Yas Marina blue";
                    stockItem.VIN = "TYB45BHYJ";
                    stockItem.RetailPrice = 1500000.00M;
                    stockItem.CostPrice = 1200000.00M;
                    stockItem.DateCreated = DateTime.Now;

                    context.StockItems.Add(stockItem);

                    await context.SaveChangesAsync();
                }

                if (!context.Accessories.Any())
                {
                    var accessory = new StockAccessory();

                    accessory.Name = "Bluetooth Audio";
                    accessory.Description = "Vehicle has a bluetooth audio system";
                    accessory.StockItemId = 1;

                    context.Accessories.Add(accessory);

                    await context.SaveChangesAsync();
                }

                if (!context.Images.Any())
                {
                    var image = new StockImage();
                    image.Name = "Front image of vehicle";
                    image.StockItemId = 1;
                    FileStream stream = File.OpenRead(@"C:\Users\nabeelg\Downloads\2021_bmw_m3_sedan_competition_fq_oem_1_815.jpg");
                    byte[] fileBytes = new byte[stream.Length];
                    stream.Read(fileBytes, 0, fileBytes.Length);
                    stream.Close();

                    image.ImageData = fileBytes;

                    context.Images.Add(image);

                    await context.SaveChangesAsync();

                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
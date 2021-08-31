using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class StockItem
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string ModelYear { get; set; }
        public string Mileage { get; set; }
        public string Color { get; set; }
        public string VIN { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal CostPrice { get; set; }
        public List<StockAccessory> Accessories { get; set; }
        public List<StockImage> StockImages { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
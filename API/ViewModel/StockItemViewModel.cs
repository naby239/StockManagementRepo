using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class StockItemViewModel
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int ModelYear { get; set; }
        public int Mileage { get; set; }
        public string Color { get; set; }
        public string VIN { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal CostPrice { get; set; }
        public List<StockAccessoryViewModel> Accessories { get; set; }
        public List<StockImageViewModel> StockImages { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
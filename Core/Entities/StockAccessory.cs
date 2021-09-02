namespace Core.Entities
{
    public class StockAccessory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int StockItemId { get; set; }
    }
}
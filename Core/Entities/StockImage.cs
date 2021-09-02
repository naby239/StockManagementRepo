namespace Core.Entities
{
    public class StockImage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; }
        public int StockItemId { get; set; }
    }
}
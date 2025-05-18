namespace NewsAPI.Models;

public class WeatherModel
{
    public int Id { get; set; }
    public string Day { get; set; } = string.Empty;
    public int Temp { get; set; }
    public int LowTemp { get; set; }
    public int HighTemp { get; set; }
    public string Condition { get; set; } = string.Empty;
} 
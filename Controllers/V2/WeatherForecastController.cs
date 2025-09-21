using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.V2
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("2.0")]
    [Authorize]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "سرد", "خنک", "معتدل", "گرم", "داغ", "بسیار گرم"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecastV2")]
        public IEnumerable<WeatherForecastV2> Get()
        {
            _logger.LogInformation("Getting weather forecast for version 2.0");
            
            return Enumerable.Range(1, 5).Select(index => new WeatherForecastV2
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                TemperatureF = 32 + (int)(Random.Shared.Next(-20, 55) / 0.5556),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                Humidity = Random.Shared.Next(30, 90),
                WindSpeed = Random.Shared.Next(5, 50)
            })
            .ToArray();
        }
    }

    public class WeatherForecastV2
    {
        public DateOnly Date { get; set; }
        public int TemperatureC { get; set; }
        public int TemperatureF { get; set; }
        public string Summary { get; set; } = string.Empty;
        public int Humidity { get; set; }
        public int WindSpeed { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace AP2_Chat_Dotnet_Rank.Models
{
    public class Ranking
    {
        public int id { get; set; }
        [BindProperty]
        public float rank { get; set; }
        [BindProperty]
        public string? name { get; set; }
        [BindProperty]
        public string? content { get; set; }
        public string? date { get; set; }
        public string? time { get; set; }
    }
}

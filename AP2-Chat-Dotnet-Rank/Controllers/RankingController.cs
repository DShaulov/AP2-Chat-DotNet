using Microsoft.AspNetCore.Mvc;
using AP2_Chat_Dotnet_Rank.Services;
using AP2_Chat_Dotnet_Rank.Models;

namespace AP2_Chat_Dotnet_Rank.Controllers
{
    public class RankingController : Controller
    {
        private readonly IRankingService _rankingService;
        public RankingController(IRankingService service)
        {
            _rankingService = service;
        }
        public IActionResult Index()
        {
            List<Ranking> allRankings = _rankingService.getAllRankings();
            float averageRank = _rankingService.getAverageRank();
            ViewBag.Rankings = allRankings;
            ViewBag.AverageRank = averageRank;
            return View("Index");
        }
        public IActionResult ViewRank(int rankingId)
        {
            Ranking? ranking = _rankingService.getRankingById(rankingId);
            ViewBag.Ranking = ranking;
            return View("Rank");

        }
        public IActionResult ViewAddRankingPage()
        {
            ViewBag.Warning = "";
            return View("AddRanking");
        }
        [HttpPost]
        public IActionResult AddRanking()
        {
            string name = this.Request.Form["name"];
            if (name == "")
            {
                ViewBag.Warning = "Name cannot be empty";
                return View("AddRanking");
            }
            string content = this.Request.Form["content"];
            string rank = this.Request.Form["rank"];
            int rankAsInt = Convert.ToInt32(rank);
            _rankingService.addRanking(rankAsInt, name, content);
            return Redirect("Index");
        }
        public IActionResult ViewEditRankingPage(int rankingId)
        {
            Ranking? ranking = _rankingService.getRankingById(rankingId);
            ViewBag.Ranking = ranking;
            return View("EditRanking");
        }
        public IActionResult SearchRankings()
        {
            string searchString = this.Request.Form["searchString"];
            List<Ranking> matchingRankings = _rankingService.getMatchingRankings(searchString);
            float averageRank = _rankingService.getAverageRank();
            ViewBag.Rankings = matchingRankings;
            ViewBag.AverageRank = averageRank;
            return View("Index");
        }


        public IActionResult EditRanking()
        {
            string name = this.Request.Form["name"];
            if (name == "")
            {
                ViewBag.Warning = "Name cannot be empty";
                return View("EditRanking");
            }
            string content = this.Request.Form["content"];
            string rank = this.Request.Form["rank"];
            int rankAsInt = Convert.ToInt32(rank);
            string rankingId = this.Request.Form["rankingId"];
            string trimmed = rankingId.Substring(0, rankingId.Length - 1);
            int rankingIdAsInt = Convert.ToInt32(trimmed);
            _rankingService.editRanking(rankingIdAsInt ,rankAsInt, name, content);
            return Redirect("Index");
        }
        public IActionResult DeleteRanking(int rankingId)
        {
            _rankingService.deleteRanking(rankingId);
            return Redirect("Index");
        }

    }
}

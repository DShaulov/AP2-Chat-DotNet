using AP2_Chat_Dotnet_Rank.Models;


namespace AP2_Chat_Dotnet_Rank.Services
{
    public class RankingService : IRankingService
    {
        private static List<Ranking> rankings;
        private static int numOfRankings = 0;
        public RankingService()
        {
            rankings = populateRankings();
        }
        public List<Ranking> getAllRankings()
        {
            return rankings;
        }
        public Ranking? getRankingById(int rankingId)
        {
            for (int i = 0; i < rankings.Count; i++)
            {
                if (rankings[i].id == rankingId)
                {
                    return rankings[i];
                }
            }
            return null;
        }

        public void addRanking(float rank, string name, string content)
        {
            Ranking newRank = new Ranking();
            newRank.id = numOfRankings++;
            newRank.rank = rank;
            newRank.name = name;
            newRank.content = content;
            newRank.date = parseDate();
            newRank.time = parseTime();
            rankings.Add(newRank);
        }

        public List<Ranking> getMatchingRankings(string searchString)
        {
            List<Ranking> matchingRankings = new List<Ranking>();
            rankings.ForEach(ranking =>
            {
                if (ranking.name.Contains(searchString, System.StringComparison.CurrentCultureIgnoreCase))
                {
                    matchingRankings.Add(ranking);
                    
                }
                else if (ranking.content.Contains(searchString, System.StringComparison.CurrentCultureIgnoreCase))
                {
                    matchingRankings.Add(ranking);
                }
                else if (ranking.date.Contains(searchString))
                {
                    matchingRankings.Add(ranking);
                }
            });
            return matchingRankings;
        }

        public void editRanking(int rankingId ,float rank, string name, string content)
        {
            rankings.ForEach(ranking =>
            {
                if (ranking.id == rankingId)
                {
                    ranking.rank = rank;
                    ranking.name = name;
                    ranking.content = content;
                }
            });
        }
        public void deleteRanking(int rankingId)
        {
            Ranking? rankToDelete = rankings.FirstOrDefault(ranking => ranking.id == rankingId);
            if (rankToDelete != null)
            {
                rankings.Remove(rankToDelete);
            }
        }
        public string parseTime()
        {
            string time = DateTime.Now.ToString("HH:mm");
            return time;
        }
        public string parseDate()
        {
            string year = DateTime.Now.ToString("yyyy");
            string month = DateTime.Now.ToString("MM");
            string day = DateTime.Now.ToString("dd");
            return year + "-" + month + "-" + day;
        }
        public float getAverageRank()
        {
            float sumOfRanks = 0;
            float numOfRanks = 0;
            rankings.ForEach(ranking =>
            {
                sumOfRanks = sumOfRanks + ranking.rank;
                numOfRanks++;
            });
            float averageRank = sumOfRanks / numOfRanks;
            return averageRank;
        }

        public List<Ranking> populateRankings()
        {
            List<Ranking> hardcodedRankings = new List<Ranking>();
            Ranking rank1 = new Ranking();
            rank1.id = numOfRankings++;
            rank1.name = "Leo Messi";
            rank1.rank = (float)4.5;
            rank1.content = "Worst app i have ever seen";
            rank1.time = "14:34";
            rank1.date = "2022-04-24";

            Ranking rank2 = new Ranking();
            rank2.id = numOfRankings++;
            rank2.name = "Albert Einstein";
            rank2.rank = (float)4.5;
            rank2.content = "Relatively Awful";
            rank2.time = "21:21";
            rank2.date = "2022-04-24";

            Ranking rank3 = new Ranking();
            rank3.id = numOfRankings++;
            rank3.name = "Cristiano Ronaldo";
            rank3.rank = (float)5;
            rank3.content = "My disappointment is immeasureable, and my day is ruined";
            rank3.time = "18:12";
            rank3.date = "2022-04-29";

            Ranking rank4 = new Ranking();
            rank4.id = numOfRankings++;
            rank4.name = "John F. Kennedy";
            rank4.rank = (float)4;
            rank4.content = "Ask not what ranking you can give to the app, ask what ranking the app can give to you";
            rank4.time = "10:54";
            rank4.date = "2022-05-05";

            Ranking rank5 = new Ranking();
            rank5.id = numOfRankings++;
            rank5.name = "Stephen Hawking";
            rank5.rank = (float)4;
            rank5.content = "A black hole where dreams go to die";
            rank5.time = "07:45";
            rank5.date = "2022-04-28";

            hardcodedRankings.Add(rank1);
            hardcodedRankings.Add(rank2);
            hardcodedRankings.Add(rank3);
            hardcodedRankings.Add(rank4);
            hardcodedRankings.Add(rank5);

            return hardcodedRankings;
        }

    }
}

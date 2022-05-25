using AP2_Chat_Dotnet_Rank.Models;

namespace AP2_Chat_Dotnet_Rank.Services
{
    public interface IRankingService
    {
        public List<Ranking> getAllRankings();
        public List<Ranking> getMatchingRankings(string searchString);
        public void addRanking(float rank, string name, string content);
        public Ranking? getRankingById(int rankingId);
        public void editRanking(int rankingId, float rank, string name, string content);
        public void deleteRanking(int rankingId);
        public float getAverageRank();

    }
}

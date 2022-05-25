using AP2_Chat_DotNet_WebAPI.Models;

namespace AP2_Chat_DotNet_WebAPI.Services
{
    public class UserService : IUserService
    {
        private static List<User>? users;

        public UserService()
        {
            users = populateUsers();
        }
        public void addUser(User user)
        {
            users.Add(user);
        }
        public User? getUser(string id)
        {
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].id == id)
                {
                    return users[i];
                }
            }
            return null;
        }
        public bool checkIfUserExists(string id)
        {
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].id == id)
                {
                    return true;
                }
            }
            return false;
        }

        private List<User> populateUsers()
        {
            List<User> populatingUsers = new List<User>();
            User frank = new User();
            frank.id = "frank";
            frank.password = "123";
            frank.name = "Frank";
            frank.server = "https://localhost:7201";

            User dee = new User();
            dee.id = "dee";
            dee.password = "123";
            dee.name = "Dee";
            dee.server = "https://localhost:7201";

            User charlie = new User();
            charlie.id = "charlie";
            charlie.password = "123";
            charlie.name = "Charlie";
            charlie.server = "https://localhost:7201";

            User mac = new User();
            mac.id = "mac";
            mac.password = "123";
            mac.name = "Mac";
            mac.server = "https://localhost:7201";

            User dennis = new User();
            dennis.id = "dennis";
            dennis.password = "123";
            dennis.name = "Dennis";
            dennis.server = "https://localhost:7201";

            populatingUsers.Add(frank);
            populatingUsers.Add(charlie);
            populatingUsers.Add(dee);
            populatingUsers.Add(mac);
            populatingUsers.Add(dennis);

            return populatingUsers;

        }

    }
}

using AP2_Chat_DotNet_WebAPI.Models;
using System.Text.Json.Nodes;

namespace AP2_Chat_DotNet_WebAPI.Services
{
    public class LaunchSettings
    {

    }
    public class ContactService : IContactService
    {
        private static List<Contact>? contacts;
        public ContactService()
        {
            contacts = populateContacts();
        }
        public void addContact(string userId, string contactId, string name, string server)
        {
            Contact newContact = new Contact();
            newContact.name = name;
            newContact.server = server;
            newContact.id = contactId;
            newContact.last = null;
            newContact.lastdate = null;
            newContact.whose = userId;
            contacts.Add(newContact);
        }
        public List<Contact> getContacts(string id)
        {
            List<Contact> userContacts = new List<Contact>();
            contacts.ForEach(contact =>
            {
                if (contact.whose == id)
                {
                    userContacts.Add(contact);
                }
            });
            return userContacts;
        }
        public Contact? getContactById(string userId, string contactId)
        {
            List<Contact> userContacts = getContacts(userId);
            for (int i = 0; i < userContacts.Count; i++)
            {
                if (userContacts[i].id == contactId)
                {
                    return userContacts[i];
                }
            }
            return null;
        }
        public bool updateContactById(string userId,string contactId, string name, string server)
        {
            Contact? contact = getContactById(userId, contactId);
            if (contact != null)
            {
                contact.name = name;
                contact.server = server;
                return true;
            }
            return false;
        }
        public bool updateContactMessageById(string userId, string contactId, string last, string lastdate)
        {
            Contact? contact = getContactById(userId, contactId);
            if (contact != null)
            {
                contact.last = last;
                contact.lastdate = lastdate;
                return true;
            }
            return false;
        }
        public bool removeContactById(string userId, string contactId)
        {
            Contact? contact = getContactById(userId, contactId);
            if (contact != null)
            {
                contacts.Remove(contact);
                return true;
            }
            else
            {
                return false;
            }
        }

        private List<Contact> populateContacts()
        {
            List<Contact> populatingContacts = new List<Contact>();

            Contact frankOfCharlie = new Contact();
            Contact frankOfDee = new Contact();

            Contact dennisOfCharlie = new Contact();
            Contact dennisOfMac = new Contact();

            Contact macOfDee = new Contact();
            Contact macOfDennis = new Contact();

            Contact deeOfFrank = new Contact();
            Contact deeOfMac = new Contact();

            Contact charlieOfFrank = new Contact();
            Contact charlieOfDennis = new Contact();


            frankOfCharlie.name = "Frank";
            frankOfCharlie.server = "https://localhost:7201";
            frankOfCharlie.id = "frank";
            frankOfCharlie.last = "Botched toe, thats a botched toe.";
            frankOfCharlie.lastdate = "2022-04-24T08:00";
            frankOfCharlie.whose = "charlie";

            frankOfDee.name = "Frank";
            frankOfDee.server = "https://localhost:7201";
            frankOfDee.id = "frank";
            frankOfDee.last = "Deandra will take care of me.";
            frankOfDee.lastdate = "2022-04-24T08:02";
            frankOfDee.whose = "dee";

            dennisOfCharlie.name = "Dennis";
            dennisOfCharlie.server = "https://localhost:7201";
            dennisOfCharlie.id = "dennis";
            dennisOfCharlie.last = "Ghouls dont exist.";
            dennisOfCharlie.lastdate = "2022-04-24T16:00";
            dennisOfCharlie.whose = "charlie";

            dennisOfMac.name = "Dennis";
            dennisOfMac.server = "https://localhost:7201";
            dennisOfMac.id = "dennis";
            dennisOfMac.last = "I have a dennis shaped hole inside of me.";
            dennisOfMac.lastdate = "2022-04-24T16:00";
            dennisOfMac.whose = "mac";

            frankOfDee.name = "Frank";
            frankOfDee.server = "https://localhost:7201";
            frankOfDee.id = "frank";
            frankOfDee.last = "Deandra will take care of me.";
            frankOfDee.lastdate = "2022-04-24T08:02";
            frankOfDee.whose = "dee";

            macOfDee.name = "Mac";
            macOfDee.server = "https://localhost:7201";
            macOfDee.id = "mac";
            macOfDee.last = "My elbows are massive.";
            macOfDee.lastdate = "2022-04-24T07:04";
            macOfDee.whose = "dee";

            macOfDennis.name = "Mac";
            macOfDennis.server = "https://localhost:7201";
            macOfDennis.id = "mac";
            macOfDennis.last = "I have a dennis shaped hole inside of me.";
            macOfDennis.lastdate = "2022-04-24T07:04";
            macOfDennis.whose = "dennis";

            deeOfFrank.name = "Dee";
            deeOfFrank.server = "https://localhost:7201";
            deeOfFrank.id = "dee";
            deeOfFrank.last = "Deandra will take care of me.";
            deeOfFrank.lastdate = "2022-04-24T18:04";
            deeOfFrank.whose = "frank";

            deeOfMac.name = "Dee";
            deeOfMac.server = "https://localhost:7201";
            deeOfMac.id = "dee";
            deeOfMac.last = "My elbows are massive.";
            deeOfMac.lastdate = "2022-04-24T21:05";
            deeOfMac.whose = "mac";

            charlieOfDennis.name = "Charlie";
            charlieOfDennis.server = "https://localhost:7201";
            charlieOfDennis.id = "charlie";
            charlieOfDennis.last = "Ghouls dont exist.";
            charlieOfDennis.lastdate = "2022-04-24T19:04";
            charlieOfDennis.whose = "dennis";

            charlieOfFrank.name = "Charlie";
            charlieOfFrank.server = "https://localhost:7201";
            charlieOfFrank.id = "charlie";
            charlieOfFrank.last = "Botched toe, thats a botched toe.";
            charlieOfFrank.lastdate = "2022-04-24T15:34";
            charlieOfFrank.whose = "frank";


            populatingContacts.Add(frankOfCharlie);
            populatingContacts.Add(frankOfDee);
            populatingContacts.Add(charlieOfDennis);
            populatingContacts.Add(charlieOfFrank);
            populatingContacts.Add(dennisOfCharlie);
            populatingContacts.Add(dennisOfMac);
            populatingContacts.Add(deeOfMac);
            populatingContacts.Add(deeOfFrank);
            populatingContacts.Add(macOfDee);
            populatingContacts.Add(macOfDennis);

            return populatingContacts;
        }

    }
}

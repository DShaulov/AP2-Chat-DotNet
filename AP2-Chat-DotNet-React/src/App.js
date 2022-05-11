import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect , useRef} from 'react';
import AppRouter from './components/App-Router/AppRouter';

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [contacts, setContacts] = useState([]);
    const [token, setToken] = useState("");
    const [messages, updateMessages] = useState([]);
    const [finishedSettingContacts, setFinishedSettingContacts] = useState(false);
    const [finishedSettingMessages, setFinishedSettingMessages] = useState(false);
    const notFirstRender = useRef(false);
    const notFirstRenderContacts = useRef(false);
    const notFirstRenderMessages = useRef(false);

    useEffect(() => {
        async function fetchData() {
            if (currentUser !== "" && token !== "") {
                var allContacts = [];
                var allMessages = {};
                // Fetch all contacts
                await fetch("/api/contacts", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    },
                })
                    .then(response => response.json())
                    .then(contactsList => {
                        for (var i = 0; i < contactsList.length; i++) {
                            allContacts.push(contactsList[i]);
                        }
                    });
                // Fetch messages for each contact
                for (var i = 0; i < allContacts.length; i++) {
                    await fetch(`/api/contacts/${allContacts[i].id}/messages`, {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    })
                        .then(data => data.json())
                        .then(contactMessages => {
                            allMessages[allContacts[i].id] = [];
                            for (var j = 0; j < contactMessages.length; j++) {
                                allMessages[allContacts[i].id].push(contactMessages[j]);
                            }
                        });
                }
                updateMessages(allMessages);
                setContacts(allContacts);
            }
        }
        if (notFirstRender.current) {
            fetchData();
        }
        else {
            notFirstRender.current = true;
        }
    }, [token]);

    useEffect(() => {
        if (notFirstRenderContacts.current) {
            console.log(contacts);
            setFinishedSettingContacts(true);
        }
        else {
            notFirstRenderContacts.current = true;
        }
        
    }, [contacts]);

    useEffect(() => {
        if (notFirstRenderMessages.current) {
            console.log(messages);
            setFinishedSettingMessages(true);
        }
        else {
            notFirstRenderMessages.current = true;
        }

    }, [messages]);
    const loginFunctions = {
        setCurrentUser: setCurrentUser,
        setToken: setToken
    };
    const registerFunctions = {
        setCurrentUser: setCurrentUser,
        setToken: setToken
    };
    const chatFunctions = {
        updateMessages: updateMessages,
        setCurrentUser: setCurrentUser,
        setToken: setToken,
        setFinishedSettingContacts: setFinishedSettingContacts,
        setFinishedSettingMessages: setFinishedSettingMessages
    }
    return (
        <AppRouter
            registerFunctions={registerFunctions} loginFunctions={loginFunctions} chatFunctions={chatFunctions}
            currentUser={currentUser} contacts={contacts} messages={messages} token={token}
            finishedSettingContacts={finishedSettingContacts}
        />
    );
}
export default App;
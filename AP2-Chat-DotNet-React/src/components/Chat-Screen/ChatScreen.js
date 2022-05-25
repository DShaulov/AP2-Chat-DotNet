import './Styles/ChatScreen.css';
import MessageDisplay from './MessageDisplay';
import ContactDisplay from './ContactDisplay';
import { useState, useRef, useEffect } from 'react';
import apiPort from "../../ApiPort";

function ChatScreen(props) {
    const [showMessageDisplay, setShowMessageDisplay] = useState(false);
    const [chattingWith, setChattingWith] = useState('');
    const [chattingWithId, setChattingWithId] = useState('');
    const [messages, setMessages] = useState([]);
    const [finishedSetting, setFinishedSetting] = useState(false);
    const firstRender = useRef(false);
    const secondRender = useRef(false);

    const setLoggedIn = props.functions.setLoggedIn;
    const updateUsers = props.functions.updateUsers;
    const updateMessages = props.functions.updateMessages;
    const setCurrentUser = props.functions.setCurrentUser;
    const setToken = props.functions.setToken;
    const setFinishedSettingContacts = props.functions.setFinishedSettingContacts;
    const setFinishedSettingMessages = props.functions.setFinishedSettingMessages;

    const webApiPort = apiPort;

    useEffect(() => {
        async function fetchMessages() {
            if (chattingWithId !== '') {
                var allMessages = [];
                await fetch("https://localhost:" + webApiPort + `/api/contacts/${props.chattingWithId}/messages`, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + props.token
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        for (var i = 0; i < json.length; i++) {
                            allMessages.push(json[i]);
                        }
                    });
                setMessages(allMessages);
            }
        }
        fetchMessages();
    }, [chattingWithId]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;

        }
        else if (secondRender.current) {
            secondRender.current = false;
        }
        else {
            setFinishedSetting(true);
            console.log(messages);
        }
    }, [messages]);
    
    const contactDisplayFunctions = {
        updateUsers,
        setLoggedIn,
        openMessageDisplay,
        setCurrentUser,
        setToken,
        setFinishedSettingContacts,
        setFinishedSettingMessages,
        setChattingWithId,
    };
    const messageDisplayFunctions = {
        updateMessages
    }
    /**
     * Opens the chat window with the appropriate user
     */
    function openMessageDisplay(userId, displayName) {
        if (displayName === chattingWith) {
            setShowMessageDisplay(false);
            setChattingWith('');
            setChattingWithId('');
        }
        else {
            setShowMessageDisplay(true);
            setChattingWith(displayName);
            setChattingWithId(userId);
        }
    }
    
    return (
        <div className="ChatScreen-div">
            <div className="ChatScreen-div__ContactDisplay-div">
                <ContactDisplay functions={contactDisplayFunctions} currentUser={props.currentUser} contacts={props.contacts} token={props.token} firstRender={firstRender} secondRender={secondRender} />
            </div>
            <div className="ChatScreen-div__MessageDisplay-div">
                {
                    (showMessageDisplay && finishedSetting) &&
                    <MessageDisplay userChattingWith={chattingWith} userChattingWithId={chattingWithId} currentUser={props.currentUser} functions={messageDisplayFunctions} contacts={props.contacts} messages={props.messages} token={props.token} />
                }
            </div>
        </div>
    );
}
export default ChatScreen;
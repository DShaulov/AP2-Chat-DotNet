import './Styles/MessageDisplay.css';
import { useState, useEffect } from 'react';
import { ListGroup, Navbar, Image, Button, Form, Popover, OverlayTrigger, Modal } from 'react-bootstrap';
import { Paperclip, ArrowRightCircle, Mic, Camera, CameraVideo } from 'react-bootstrap-icons';
import apiPort from "../../ApiPort";

function MessageDisplay(props) {
    const webApiPort = apiPort;
    useEffect(()=> {
        // Scroll chat window to bottom on render
        let chatDiv = document.getElementsByClassName("messages-div")[0];
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });
    const date = new Date();
    /**
     * Sends a text message to another user
     */
    async function sendTextMessage(event) {
        event.preventDefault();
        let server = retrieveContactServer(props.userChattingWithId);
        let isMyServer = (server === "http://localhost:" + webApiPort) || (server === "localhost:" + webApiPort) || (server === "https://localhost:" + webApiPort) || (server === "http://localhost:" + webApiPort);
        let content = event.target[0].value;
        await fetch(`api/contacts/${props.userChattingWithId}/messages?content=${content}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token
            },
        });

        if (isMyServer) {
            await fetch(`api/transfer?from=${props.currentUser.id}&to=${props.userChattingWithId}&content=${content}`, {
                method: "POST",
            });
        }
        else {
            await fetch(server + `/api/transfer?from=${props.currentUser}&to=${props.userChattingWithId}&content=${content}`, {
                method: "POST",
            });
        }

        event.target[0].value = "";
        await fetch(`api/hub/update`, {
            method: "POST",
        });
    };
    function retrieveContactServer(contactId) {
        let server = "";
        props.contacts.forEach(contact => {
            if (contact.id === contactId) {
                server = contact.server;
            }
        })
        return server;
    }
    /**
     * Returns current date in dd/mm/yy format
     */
    function parseDate() {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = String(date.getFullYear());
        return year + '-' + month + '-' + day;
    }
    /**
     * Returns current time in minutes:hours format
     */
    function parseTime() {
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        return hours + ':' + minutes;
    }
    /**
     * Builds DOM elements out of messages
     */
    function buildMessages() {
        let messageId = 0;
        let messageList = [];
        for (const message of props.messages[props.userChattingWithId]) {
                buildTextMessage(message, messageList, messageId);
                messageId++;
        }
        return messageList;
    }
    /**
     * Helper function
     */
    function buildTextMessage(message ,messageList, messageId) {
        let className = '';
        var timeCreated = message.created;
        var dateTimeArray = timeCreated.split("T");
        if (message.sent === true) {
            className = 'chat-bubble-to';
            messageList.push(
                <div className="chat-bubble-container" key={messageId}>
                    <time className="to-message-timestamp">{dateTimeArray[1]}</time>
                    <time className="to-message-datestamp">{dateTimeArray[0]}</time>
                    <div className={className} >
                        <p className="text-message-paragraph">{message.content}</p>
                    </div>
                </div>
            )
        }
        else {
            className = 'chat-bubble-from';
            messageList.push(
                <div className="chat-bubble-container"  key={messageId}> 
                    <div className={className}>
                        <p className="text-message-paragraph">{message.content}</p>
                    </div>
                    <time className="from-message-timestamp">{dateTimeArray[1]}</time>
                    <time className="from-message-datestamp">{dateTimeArray[0]}</time>
                </div>
            )
        }
    }
    return (
        <div className="MessageDisplay">
            <Navbar className="custom-navbar" variant="light" bg="light">
                <Image src={require(`../../userImages/default-user.png`)} className="custom-navbar__contact-image"></Image>
                <Navbar.Brand className="custom-navbar__contact-brand"><h5>{props.userChattingWith}</h5></Navbar.Brand>
                <p className="spacer">a</p>
            </Navbar>
            <div className="messages-div">
                {buildMessages()}
            </div>
            <Navbar className="custom-footer" variant="light" bg="light">
                <Form className="custom-footer__custom-form" onSubmit={sendTextMessage}>
                    <Form.Group className="custom-footer__custom-form__custom-grp">
                        <Form.Control placeholder="Enter message" className="custom-footer__custom-form__custom-grp__custom-control"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            <ArrowRightCircle/>
                        </Button>
                    </Form.Group>
                </Form>
            </Navbar>
        </div>
    );
}
export default MessageDisplay;
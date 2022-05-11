import './Styles/ContactDisplay.css';
import { useState } from 'react';
import { Button, Dropdown, ListGroup, Modal, Form, Navbar, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { CameraFill, CameraVideoFill, MicFill } from 'react-bootstrap-icons';


function ContactDisplay(props) {
    const [ windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [ windowHeight, setWindowHeight ] = useState(window.innerHeight);
    const [ showAddContactPopup, setShowAddContactPopup ] = useState(false);
    const [ contactDoesNotExist, setContactDoesNotExist ] = useState(false);
    const date = new Date();
    const navigate = useNavigate();
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    });
    /**
     * Deletes local storage associated with user and logs him out
     */
    function logOut() {
        props.functions.setLoggedIn(false);
        props.functions.setCurrentUser('');
        props.functions.setToken('');
        props.functions.setFinishedSettingMessages(false);
        props.functions.setFinishedSettingContacts(false);
        navigate("/");
    }
    /**
     * Opens the message display upon clicking on a contact
     */
    function openChat(event) {
        let parentElement = event.target;
        while (parentElement.nodeName !== 'BUTTON') {
            parentElement = parentElement.parentNode;
        }
        props.functions.openMessageDisplay(parentElement.id ,parentElement.name);
    }
    /**
     * Creates the list items making up the contact list
     */
    function makeContactList() {
        let contactListItems = [];
        let id = 0;
        let currentUserContacts = props.contacts;
        for (const contact of currentUserContacts) {
            contactListItems.push(
                <ListGroup.Item action="true" onClick={openChat} className="overflow-hidden" key={id} name={contact.name} id={contact.id}>
                    <div className="list-card-div">
                        <div className="list-card-div__profile-image-div">
                            <img className="list-card-div__profile-image-div__img" 
                            src={require(`../../userImages/default-user.png`)} alt=''></img>
                        </div>
                        <div className="list-card-div__contact-name-div">
                            <div className="list-card-div__contact-name-div__name-title-div">
                                <h5 className="list-card-div__contact-name-div__name-title-div__name-title">{ contact.name }</h5>
                            </div>
                            <div className="list-card-div__contact-name-div__last-message-div">
                                <div className="last-message-div">
                                    {parseLastMessage(contact)}
                                </div> 
                            </div>
                        </div>
                        <div className="list-card-div__time-div">
                            <time className="list-card-div__time-div__time">{parseLastMessageTime(contact)}</time>
                        </div>
                    </div>
                </ListGroup.Item>
            );
            id ++;
        };
        return contactListItems;
    };
    /**
     * Retrives the last message exchanged between users
     */
    function parseLastMessage(contact) {
        return (
            <p className="list-card-div__contact-name-div__last-message-div__last-message">{contact.last}</p>
        );
    }
    /**
     * Retries the time of the last message exchange
     */
    function parseLastMessageTime(contact) {
        let lastDateString = contact.lastdate;
        if (lastDateString !== null) {
            let splitString = lastDateString.split("T");
            let today = parseDate();
            if (splitString[0].replace(/\s+/g, "") !== today.valueOf()) {
                return splitString[0];
            }
            else {
                return splitString[1];
            }
        }
        
    }
    function parseDate() {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = String(date.getFullYear());
        return year + '-' + month + '-' + day;
    }
    /**
     * Adds contact if it exists
     */
    async function addContact(e) {
        e.preventDefault();
        let displayName = e.target[0].value;
        let contactId = e.target[1].value;
        let server = e.target[2].value;

        let isMyServer = (server === "http://localhost:3000") || (server === "localhost:3000") || (server === "https://localhost:3000") || (server === "http://localhost:3000");
        if (isMyServer) {
            let contactExists;
            console.log("CHECKING MY SERVER");
            await fetch(`userauth/checkexists?id=${contactId}`, {
                method: "POST"
            })
                .then(data => data.text())
                .then(text => { contactExists = text });
            if (contactExists === "EXISTS") {
                await fetch(`/api/contacts?id=${contactId}&name=${displayName}&server=${server}`, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + props.token
                    },
                })
                    .then(data => data.text())
                    .then(text => console.log(text));
            }
            else {
                setContactDoesNotExist(true);
            }
        }
        else {

        }
    };
    function hideModal() {
        setShowAddContactPopup(false);
        setContactDoesNotExist(false);
    }
    return (
        <div className="Contact-Display-div">
            <Navbar className="custom-navbar" bg="light" variant="light">
                <Container className="custom-navbar__image-brand-container">
                    <Image src={require(`../../userImages/default-user.png`)} className="custom-navbar__image"></Image>
                    <Navbar.Brand className="custom-navbar__brand"><h5>{props.currentUser.name}</h5></Navbar.Brand>
                    <Dropdown drop={"start"}>
                        <DropdownToggle>Options</DropdownToggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setShowAddContactPopup(true)}}>Add Contact</Dropdown.Item>
                            <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <div className="Contact-Display-div__contacts-div">
                <ListGroup className="overflow-auto custom-list">
                    {makeContactList()}
                </ListGroup>
            </div>
            <Modal  show={showAddContactPopup} onHide={hideModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addContact} className="modal__form">
                        <Form.Group >
                            <Form.Label>Contact:</Form.Label>
                            <Form.Control placeholder="Enter contact nickname"></Form.Control>
                            <Form.Control placeholder="Enter contact username"></Form.Control>
                            <Form.Control placeholder="Enter contact server"></Form.Control>
                            {contactDoesNotExist &&
                            <Form.Text className="warning-text">*Contact does not exist</Form.Text>
                            }
                        </Form.Group>
                        <Form.Group className="modal__form__add-btn-grp">
                            <Button variant="primary" type="submit" className="modal__form__add-btn">Add</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default ContactDisplay;
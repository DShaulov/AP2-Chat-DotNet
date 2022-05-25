import './Styles/LoginScreen.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiPort from "../../ApiPort";

function LoginScreen(props) {
    const [usernameNotFilled, setUsernameNotFilled] = useState(false);
    const [passwordNotFilled, setPasswordNotFilled] = useState(false);
    const [userNotValid, setUserNotValid] = useState(false);
    const webApiPort = apiPort;
    /**
     * Handles submission of login form - 
     * If username or password fields are empty, displays error
     * If username and password dont match, displays error
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = e.target[0].value;
        let password = e.target[1].value;
        // If username/password empty, display warning
        if (username === '' ) {
            setUsernameNotFilled(true);
        } else {
            if (usernameNotFilled) {setUsernameNotFilled(false)};
        }
        if (password === '') {
            setPasswordNotFilled(true);
        }
        else {
            if (passwordNotFilled) {setPasswordNotFilled(false)};
        }
        if (usernameNotFilled || passwordNotFilled) {
            setUserNotValid(false);
            return;
        }
        var token;
        // Make POST request to server to login
        await fetch("https://localhost:" + webApiPort + `/userauth?username=${username}&password=${password}`, {
            method: "POST"
        })
            .then(data => data.text())
            .then(text => { token = text });
        if (token == "Invalid") {
            setUserNotValid(true);
        }
        else {
            var userJson;
            await fetch("https://localhost:" + webApiPort + `/userauth/getuser?id=${username}`, {
                method: "POST"
            })
                .then(data => data.json())
                .then(json => { userJson = json });
            props.functions.setCurrentUser(userJson);
            props.functions.setLoggedIn(true);
            props.functions.setToken(token);
        }
    }
    return (
        <div className="login-screen-div">
            <Form onSubmit={handleSubmit} className="login-screen-div__form">
                <Form.Group className="login-screen-div__form__username-grp">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control placeholder="Enter username"></Form.Control>
                    {usernameNotFilled &&
                    <Form.Text className="login-screen-div__form__warning-text">*Username cannot be empty</Form.Text>
                    }
                </Form.Group>
                <Form.Group className="login-screen-div__form__password-grp">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control placeholder="Enter password"></Form.Control>
                    {passwordNotFilled &&
                    <Form.Text className="login-screen-div__form__warning-text">*Password cannot be empty</Form.Text>
                    }
                </Form.Group>
                <Form.Group className="login-screen-div__form__btn-link-grp">
                    <Button variant="primary" type="submit" className="login-screen-div__form__login-btn">Log In</Button>
                </Form.Group>
            </Form>
            {userNotValid &&
            <p className="login-screen-div__form__warning-text">*Username and password dont match</p>
            }
            <p className="login-screen-div__register-link-paragraph">Not registered? <Link to='/register'>Click here</Link> to register.</p>
        </div>
    );
}

export default LoginScreen;
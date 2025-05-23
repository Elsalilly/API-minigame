import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/login.css";

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [attemptedLogin, setAttemptedLogin] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        setAttemptedLogin(true);

        //Check for empty fields
        if (!loginUsername.trim() || !loginPassword.trim()) {
            setVerified(false);
            return;
        }
        //Get registrerd users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        //Find matching user
        const matchedUser = users.find(
            (user) =>
                user.username === loginUsername.trim() &&
                user.password === loginPassword.trim()
        );

        if (matchedUser) {
            setVerified(true); //if a user was found, login succesful
            localStorage.setItem("isLoggedIn", "true"); //Save to know that the user is logged in
            navigate("/game");
        } else {
            setVerified(false);
        };
        //clear input fields
        setLoginUsername("");
        setLoginPassword("");
    };
    
    return (
        <div className="login-container">
            <h1>Log in to play the game</h1>

            <input 
                type="text" 
                placeholder="Username" 
                value={loginUsername} 
                onChange={e => setLoginUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password"  
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)} 
            />
            <button className="login-btn" onClick={handleLogin}>
                Log in
            </button>
            <button className="back-btn"><Link to="/" className="back-text">
                Go Back
            </Link></button>
            {attemptedLogin && !verified && (
                <h3>Incorrect username or password, try again!</h3>
            )}
        </div>
    )
}

export default Login;
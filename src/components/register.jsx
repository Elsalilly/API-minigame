import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import "../styles/register.css";

const Register = () => {
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState("");
    const [attemptedRegister, setAttemptedRegister] = useState(false);
    const [registerVerify, setRegisterVerify] = useState(false);

    const navigate = useNavigate();

    const handleRegister = () => {
        const newUsername = username.trim();
        const newUserPassword = password.trim();

        //Validation name length and min 4 characters, one letter and one number
        const isValidUsername = newUsername.length >= 4;
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(newUserPassword);

        //Check requirements
        if(!isValidUsername || !isValidPassword) {
            setAttemptedRegister(true);
            setRegisterVerify(false);
            return;
        }

        if (!newUsername || !newUserPassword) {
            setAttemptedRegister(true);
            setRegisterVerify(false);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const usernameExists = existingUsers.some(
            (user) => user.username === newUsername.trim()
        );

        if (usernameExists) {
            setAttemptedRegister(true);
            setRegisterVerify(false);
            return;
        }

        const newUser = {
            username: newUsername.trim(),
            password: newUserPassword.trim(),
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        setRegisterVerify(true);
        setAttemptedRegister(false);
        navigate("/login");
    };

    return (
        <div className="register-container">
            <h1>Register here</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="register-btn" onClick={handleRegister}>
                Register
            </button>
            <button className="back-btn"><Link to="/" className="back-text">
                Go Back
            </Link></button>
            {attemptedRegister && !registerVerify && (
                <h3>Username must be atleast 4 characters, password must be 4 characters, atleast one letter and number!</h3>
            )}
        </div>
    );
};

export default Register;
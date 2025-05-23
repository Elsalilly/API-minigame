import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";

const Navbar = ({score, lives}) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/Home");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>🐾 Guess The Good Doggo 🐾</h2>
            </div>
            <div className="navbar-center">
                <span className="score">Score: {score}</span>
                <span className="lives">Lives: {"❤️".repeat(lives)}</span>
            </div>
            <div className="navbar-right">
                <button className="logout-btn" onClick={logout}>
                    Log out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
import React from "react";
import { Link } from 'react-router-dom';

import "../styles/home.css";

const Home = () => (
   <div className="home-container">
      <h1>Welcome to the Dog Game</h1>
      <div className="box">
         <Link to="/register" className="reg-button">Register</Link>
         <Link to="/login" className="log-button">Log in</Link>
      </div>
   </div>
);

export default Home;
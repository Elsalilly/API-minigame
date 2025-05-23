import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from "./components/game.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";

import './App.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App

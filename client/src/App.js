import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from "./views/pages/chat";
import Home from "./views/pages/home";
import Login from "./views/pages/login";
import Register from "./views/pages/register"; 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;

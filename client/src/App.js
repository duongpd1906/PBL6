import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from "./views/pages/chat";
import Home from "./views/pages/home";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;

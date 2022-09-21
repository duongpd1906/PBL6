import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../pages/chat";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GuestRoute from "../routes/guest-route";
import AuthenticatedRoute from "../routes/authenticated-route";
function AllRoutes() {
    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route  path="/" element={<AuthenticatedRoute />}>
                <Route index element={<Home />} />
                <Route path="chat" element={<Chat />} />
            </Route>
        </Routes>
    );
}
export default AllRoutes;

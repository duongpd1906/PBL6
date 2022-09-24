import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout"
import Chat from "../pages/chat";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GuestRoute from "../routes/guest-route";
import AuthenticatedRoute from "../routes/authenticated-route";
import Error from "../pages/error";
function AllRoutes() {
    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route  path="/" element={<AuthenticatedRoute />}>
                <Route index element={<MainLayout component={Home} />}/>
                <Route path="chat"element={<MainLayout component={Chat} />}/>
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}
export default AllRoutes;

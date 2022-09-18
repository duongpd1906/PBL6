import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Post from "../../../components/post";
import "./home.scss";
function Home() {
    return (
        <div className="home-container">
            <div className="home-container__header">
            </div>
            <Post/>
        </div>
    );
}

export default Home;

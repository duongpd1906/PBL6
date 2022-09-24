import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Post from "../../../components/post";
import FriendTag from "../../../components/friend/tag";
import Posting from "../../../components/posting";
import { listFriendTag } from "../../../utils"
import "./home.scss";
function Home() {
    listFriendTag.sort((a, b) => b.status - a.status);
    return (
        <div className="home-container">
            <div className="m-auto">
                <Posting/>
                <Post/>
            </div>
            <div className="home-container__list-friend">
                <div className="d-flex my-2">
                    <h5>Bạn bè</h5>
                    <a href="/">Xem tất cả</a>
                </div>
                { listFriendTag.map((item) => <FriendTag data={item} />) }
            </div>
        </div>
    );
}

export default Home;

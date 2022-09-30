import React, { useState } from "react";
import FriendCard from "../../../components/friend/card";
import { listFriends } from "../../../utils";
import "./friend.scss";

const ALL_FRIENDS_TAB = 1;
const hadInvitation_TAB = 2;
const SUGGESTIONS_TAB = 3;

function Friends() {
    const [tab, setTab] = useState(ALL_FRIENDS_TAB);
    return (
        <div className="friend-container col-8">
            <div className="friend-container__tabs">
                <div
                    className={
                        tab === ALL_FRIENDS_TAB ? "col-4 active" : "col-4"
                    }
                    onClick={() => setTab(ALL_FRIENDS_TAB)}
                >
                    Tất cả bạn bè
                </div>
                <div
                    className={
                        tab === hadInvitation_TAB ? "col-4 active" : "col-4"
                    }
                    onClick={() => setTab(hadInvitation_TAB)}
                >
                    Lời mời kết bạn
                </div>
                <div
                    className={
                        tab === SUGGESTIONS_TAB ? "col-4 active" : "col-4"
                    }
                    onClick={() => setTab(SUGGESTIONS_TAB)}
                >
                    Gợi ý kết bạn
                </div>
            </div>
            <div className="friend-container__content">
                {tab !== ALL_FRIENDS_TAB
                    ? tab === hadInvitation_TAB
                        ? listFriends.map((friend) => !friend.isFriend &&
                                                        friend.hadInvitation && 
                                                        <FriendCard data={friend} />)
                        : listFriends.map((friend) => !friend.hadInvitation && 
                                                        <FriendCard data={friend} />)
                    : listFriends.map((friend) => friend.isFriend && 
                                                    <FriendCard data={friend} />)
                }
            </div>
        </div>
    );
}
export default Friends;

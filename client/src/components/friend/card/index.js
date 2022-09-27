import React from "react";
import "./friend-card.scss";

function FriendCard(props) {
    const { avatar, name, mutual_friend } = props.data;
    return (
        <div className="friend-card col-4">
            <img src={avatar} alt="" />
            <div className="p-2">
                <p>{name}</p>
                <span>{mutual_friend} bạn chung</span>
                <button className="btn-blue">Nhắn tin</button>
                <button>Hủy kết bạn</button>
            </div>
        </div>
    );
}
export default FriendCard;

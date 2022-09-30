import React from "react";
import "./friend-card.scss";

function FriendCard(props) {
    const { avatar, name, mutualFriend, isFriend, hadInvitation } = props.data;
    return (
        <div className="friend-card">
            <img src={avatar} alt="" />
            <div className="p-2 mx-1">
                <p>{name}</p>
                <span>{mutualFriend} bạn chung</span>
                <button className="btn-blue">
                    { !isFriend ? hadInvitation ? "Xác nhận" : "Kết bạn" : "Nhắn tin"}
                </button>
                <button>
                    { isFriend ? "Hủy kết bạn" : "Xóa"}
                </button>
            </div>
        </div>
    );
}
export default FriendCard;

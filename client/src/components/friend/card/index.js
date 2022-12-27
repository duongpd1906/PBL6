import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import "./friend-card.scss";

const ALL_FRIENDS_TAB = 1;
const INVITATION_TAB = 2;

function FriendCard(props) {
    const navigate = useNavigate();
    const { fullName, user } = props.data;
    const userProfile = props.userProfile
    const tabStatus = props.tabStatus
    const { sendInvitation, acceptInvitation } = useAppContext()
    const handleSendInvitation = () => {
        sendInvitation(user._id);
        window.location.reload(false)
    }
    const handleAcceptInvitation = () => {
        acceptInvitation(user._id);
        window.location.reload(false)
    }
    const width = window.location.pathname.includes("friend") ? "24%" : "32%"
    const listCommonFriend = props.data?.friends?.filter(
        (user) =>
            userProfile?.friends?.includes(user)
    );

    return (
        <div className="friend-card" style={{ width: width }}>
            <img src={props.data.user?.avatar} alt="" onClick={() => navigate(`/users/${props.data.user._id}`)} />
            <div className="p-2 mx-1">
                <p onClick={() => navigate(`/users/${user._id}`)}>{fullName !== "" ? fullName : user.username}</p>
                <span>{listCommonFriend.length} bạn chung</span>
                {
                    tabStatus !== ALL_FRIENDS_TAB
                        ? tabStatus === INVITATION_TAB
                            ? <button className="btn-blue" onClick={handleAcceptInvitation}>Xác nhận</button>
                            : <button className="btn-blue" onClick={handleSendInvitation}>Kết bạn</button>
                        : <button className="btn-blue" onClick={() => navigate("/chat", { state: { friend_id: user._id } })}>Nhắn tin</button>

                }
                {
                    tabStatus === ALL_FRIENDS_TAB
                        ? <button className="btn-gray" onClick={handleAcceptInvitation}>Hủy kết bạn</button>
                        : <button onClick={() => navigate("/chat", { state: { friend_id: user._id } })}>Nhắn tin</button>
                }
            </div>
        </div>
    );
}
export default FriendCard;

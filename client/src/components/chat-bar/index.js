import React from "react";

import "./chat-bar.scss";

function ChatBar(props) {
    const { name, avatar, message, time } = props.data;
    return (
        <div className="chat-bar-content px-3">
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div className="name">
                <div>{name}</div>
                <div>
                    {message}・{time}{" "}
                </div>
            </div>
        </div>
    );
}
export default ChatBar;

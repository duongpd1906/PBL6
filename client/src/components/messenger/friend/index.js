import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "./friend-mesenger.scss";

function FriendMessages({ message, avatar }) {
    const [showHiddenComment, setShowHiddenComment] = useState(false);
    return (
        <div className="friend-messages-content">
            <div className="avatar">
                <img alt="" src={avatar} />
            </div>
            <div
                className={
                    showHiddenComment
                        ? "friend-messages-content__text"
                        : "friend-messages-content__text border"
                }
            >
                <div
                    className={
                        !showHiddenComment && message.status === "negative"
                            ? "messange hidden"
                            : "messange"
                    }
                >
                    {message.text}
                </div>
                {message.status === "negative" && !showHiddenComment && (
                    <div className="comment-overlay">
                        <Tooltip title="View chat">
                            <EyeOutlined
                                className="icons-show-comment"
                                onClick={() => setShowHiddenComment(true)}
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
}
export default FriendMessages;

import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./my-messenger.scss";

function MyMessages({ message }) {
    const [showHiddenComment, setShowHiddenComment] = useState(false);
    return (
        <div className={
            showHiddenComment ? "my-messages-content" : "my-messages-content border"
        }>
            <div
                className={
                    !showHiddenComment && message.status === "negative"
                        ? "messange hidden"
                        : "messange"
                }
            >
                <p dangerouslySetInnerHTML={{__html: message.text.replace(/\n/g, '<br/>')}} />
            
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
    );
}
export default MyMessages;

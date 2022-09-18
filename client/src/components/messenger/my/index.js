import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import "./my-messenger.scss";

function MyMessages(props) {
    const { name, avatar, message, time } = props.data;
    return (
        <div className="my-messages-content">
            <div className="messange">{message}</div>
        </div>
    );
}
export default MyMessages;

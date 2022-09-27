import React from "react";

import "./my-messenger.scss";

function MyMessages(props) {
    const { message } = props.data;
    return (
        <div className="my-messages-content">
            <div className="messange">{message}</div>
        </div>
    );
}
export default MyMessages;

import React from "react";
import "./friend-mesenger.scss";

function FriendMessages(props) {
    const { message } = props.data;
    return (
        <div className="friend-messages-content">
            <div className="avatar">
                <img alt="" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/280374790_1477115089370427_2274356777150785265_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BGiT7grLdloAX9IRJ_q&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9cSGOCa9XgxlLhOaqjXNYXm19qGb65c2eSuzlvgQuLGQ&oe=63279F08" />
            </div>
            <div className="messange">{message}</div>
        </div>
    );
}
export default FriendMessages;

import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FriendMessages from "./friend";
import MyMessages from "./my";
import ChatFooter from "../chat-footer";
import { chatHistory } from "../../utils";
import "./messenger.scss";

function Messages(props) {
    return (
        <div
            className="messages-content"
            style={{ display: props.state ? "block" : "none" }}
        >
            <div className="messages-content__header">
                <div className="avatar">
                    <img alt="" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/280374790_1477115089370427_2274356777150785265_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BGiT7grLdloAX9IRJ_q&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9cSGOCa9XgxlLhOaqjXNYXm19qGb65c2eSuzlvgQuLGQ&oe=63279F08" />
                </div>
                <div className="name">Hiếu</div>
                <AiOutlineInfoCircle className="icon" />
            </div>
            <div className="messages-content__messanges">
                {chatHistory.map((item) =>
                    item.name === "Hieu" ? (
                        <MyMessages data={item} />
                    ) : (
                        <FriendMessages data={item} />
                    )
                )}
            </div>
            <ChatFooter/>            
        </div>
    );
}
export default Messages;

import React, { useEffect, useState,useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FriendMessages from "./friend";
import MyMessages from "./my";
import ChatFooter from "../chat-footer";
import "./messenger.scss";
import axios from "axios";

function Messages(props) {
	const [messageHeight, setMessageHeight] = useState(515);
	const [friend, setFriend] = useState([]);
	const bottomRef = useRef(null);
	// bottomRef.current?.scrollIntoView({block: "start"});

	useEffect(() => {
		bottomRef.current?.scrollIntoView({block: "end", behavior: 'smooth'});
	}, [props.newMessage]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axios(
					"/api/user/byid?userId=" + props.friendId
				);
				setFriend(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [props.friendId]);

	const onHeightChange = (values) => {
		setMessageHeight(515 - (values-32))
	}
	return (
		<div className="messages-content">
			<div className="messages-content__header">
				<div className="avatar">
					<img alt="" src={friend.avatar} />
				</div>
				<div className="name">{friend.username}</div>
				<AiOutlineInfoCircle className="icon" />
			</div>
			<div className="messages-content__messanges py-2" style={{height: messageHeight}} >
				{props.listmessages.map((item) =>
					item.sender !== props.friendId ? (
						<MyMessages message={item.text} />
					) : (
						<FriendMessages
							message={item.text}
							avatar={friend.avatar}
						/>
					)
				)}
				<div ref={bottomRef} ></div>
			</div>
			<ChatFooter
				handleSubmit={props.handleSubmit}
				onHeightChange={onHeightChange}
				setNewMessage={props.setNewMessage}
				newMessage={props.newMessage}
			/>
			
		</div>
	);
}
export default Messages;

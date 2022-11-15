import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Emoji from "../../emoji";
import { getDateTime } from "../../../helpers/formatDate";
import "./replied-comment.scss";
import { useAppContext } from "../../../context/appContext";
function RepliedComment({repliedComment}) {
  const [showEmoji, setShowEmoji] = useState(false);
  const { listUsers } = useAppContext();
  const repliedUser = listUsers.find(userInfo => userInfo.user._id === repliedComment.commenter)
  return (
    <div className="reply-comment-container">
      <img
        className="img-circle"
        alt=""
        src={repliedUser?.user.avatar}
      />
      <div className="ms-2">
        <div className="reply-comment-container__text">
          <a className="user-name" href="/">
            {repliedUser?.fullName !=="" ? repliedUser.fullName: repliedUser.user.username}
          </a>
          <p>{repliedComment.text}</p>
        </div>
        <div className="reply-comment-container__reply-action ms-3">
          <a
            className="position-relative"
            href="/"
            onMouseEnter={() => setShowEmoji(true)}
            onMouseLeave={() => setShowEmoji(false)}
          >
            <Emoji state={showEmoji} />
            Thích
          </a>
          <label>{getDateTime(repliedComment.createdAt)}</label>
        </div>
      </div>
    </div>
  );
}

export default RepliedComment;

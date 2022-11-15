import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RepliedComment from "./replied";
import ReplyingComment from "./replying";
import Emoji from "../emoji";
import { getDateTime } from "../../helpers/formatDate";
import "./comment.scss";
import { useAppContext } from "../../context/appContext";
function Comment({comment, handleCreateComment}) {
    const [showReplying, setShowReplying] = useState(false);
    const [showRepliedComment, setShowRepliedComment] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const { listUsers } = useAppContext()
    const commenterUser = listUsers.find(userInfo => userInfo.user._id === comment.commenter._id)
    return (
        comment && 
        <div className="comment-container">
            <img
                className="img-circle"
                alt=""
                src={comment.commenter.avatar}
            />
            <div className="ms-2 col-11">
                <div className="comment-container__text">
                    <a className="user-name" href="/">
                        {commenterUser?.fullName !=="" ? commenterUser?.fullName: comment.commenter.username}
                    </a>
                    <p>{comment.text}</p>
                </div>
                <div className="comment-container__reply-action ms-3">
                    <a
                        className="position-relative"
                        href="/"
                        onMouseEnter={() => setShowEmoji(true)}
                        onMouseLeave={() => setShowEmoji(false)}
                    >
                        <Emoji state={showEmoji} />
                        Thích
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            setShowReplying(true);
                            setShowRepliedComment(true);
                        }}
                    >
                        Phản hồi
                    </a>
                    <label>{getDateTime(comment.createdAt)}</label>
                </div>
                <div className="ms-3">
                    {comment.comments?.length>0 && (
                        <>
                            <div className="comment-container__reply">
                                <div className="me-3 line"> </div>
                                {
                                    showRepliedComment 
                                        ?  <span style={{ fontWeight: "600" }} onClick={() => {setShowRepliedComment(!showRepliedComment);}}>Ẩn phản hồi</span>
                                        :  <span style={{ fontWeight: "600" }} onClick={() => {setShowRepliedComment(!showRepliedComment);}}>{comment.comments?.length}  Phản hồi</span>
                                }
                            </div>
                            {showRepliedComment &&
                                comment.comments.map((comment) => (
                                    <RepliedComment repliedComment={comment} />
                                ))}
                        </>
                    )}
                    {showReplying && <ReplyingComment parentComment={comment} handleCreateComment={handleCreateComment}/>}
                </div>
            </div>
        </div>
    );
}

export default Comment;

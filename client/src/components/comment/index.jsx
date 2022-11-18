import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RepliedComment from "./replied";
import ReplyingComment from "./replying";
import { getDateTime } from "../../helpers/formatDate";
import { useAppContext } from "../../context/appContext";
import "./comment.scss";

function Comment({ comment, handleCreateComment }) {
    const {
        user,
        userProfile,
        listUsers,
        createLike,
        commentsOfComment,
        getCommentsByParentId,
    } = useAppContext();
    const [showReplying, setShowReplying] = useState(false);
    const [showRepliedComment, setShowRepliedComment] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(comment.likes.length);
    const [ listToolTips, setListToolTips] = useState([]);
    const commenterUser = listUsers.find(
        (userInfo) => userInfo.user._id === comment.commenter._id
    );
    useEffect(() => {
        getCommentsByParentId(comment._id);
    }, [comment]);
    useEffect(() => {
        if (comment.likes.includes(user._id)) {
            setLikeState(true);
        }
        setListToolTips([])
        comment.likes.map(userId => {
            for(let i=0;i<listUsers.length;i++){
                if(listUsers[i].user._id === userId){
                    setListToolTips(listToolTips => [...listToolTips,listUsers[i]] );
                }
            }
        })
    }, []);
    const handleCreateLike = () => {
        const like = {
            commentId: comment._id,
        };
        createLike(like);
        if(likeState){
            setNumberOfLike(numberOfLike-1)
            const user = listToolTips.filter((item) => item.user._id !== userProfile.user._id);
            setListToolTips( user);
        } else{
            setNumberOfLike(numberOfLike+1)
            setListToolTips(listToolTips => [...listToolTips,userProfile] );
        }
        setLikeState(!likeState);
    };
    return (
        comment && (
            <div className="comment-container">
                <img
                    className="img-circle"
                    alt=""
                    src={comment.commenter.avatar}
                />
                <div className="ms-2 col-11">
                    <div className="comment-container__text">
                        <a className="user-name" href="/">
                            {commenterUser?.fullName !== ""
                                ? commenterUser?.fullName
                                : comment.commenter.username}
                        </a>
                        <p>{comment.text}</p>
                        {
                            numberOfLike > 0 &&
                            <Tooltip 
                                title={() => listToolTips.map(item=> 
                                    <>{item.fullName !== "" ? item.fullName : item.user.username}<br/></>
                                )}
                                className="icon-like"
                            >
                                <img
                                    className="img-circle"
                                    style={{ width: "18px", height: "18px" }}
                                    src={require("../../assets/images/like.png")}
                                    alt=""
                                />
                                <span>{numberOfLike}</span>
                            </Tooltip>
                        }
                    </div>
                    <div className="comment-container__reply-action ms-3">
                        <p
                            className={
                                !likeState
                                    ? "position-relative"
                                    : "position-relative txt-blue"
                            }
                            onClick={() => handleCreateLike()}
                        >
                            Thích
                        </p>
                        <p
                            onClick={() => {
                                setShowReplying(true);
                                setShowRepliedComment(true);
                            }}
                        >
                            Phản hồi
                        </p>
                        <label>{getDateTime(comment.createdAt)}</label>
                    </div>
                    <div className="ms-3">
                        {comment.comments?.length > 0 && (
                            <>
                                <div className="comment-container__reply">
                                    <div className="me-3 line"> </div>
                                    {showRepliedComment ? (
                                        <span
                                            style={{ fontWeight: "600" }}
                                            onClick={() => {
                                                setShowRepliedComment(
                                                    !showRepliedComment
                                                );
                                            }}
                                        >
                                            Ẩn phản hồi
                                        </span>
                                    ) : (
                                        <span
                                            style={{ fontWeight: "600" }}
                                            onClick={() => {
                                                setShowRepliedComment(
                                                    !showRepliedComment
                                                );
                                            }}
                                        >
                                            {comment.comments?.length} Phản hồi
                                        </span>
                                    )}
                                </div>
                                {showRepliedComment &&
                                    commentsOfComment.map((comment) => (
                                        <RepliedComment
                                            repliedComment={comment}
                                        />
                                    ))}
                            </>
                        )}
                        {showReplying && (
                            <ReplyingComment
                                parentComment={comment}
                                handleCreateComment={handleCreateComment}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

export default Comment;

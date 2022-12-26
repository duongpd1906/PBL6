import React, { useState, useEffect } from "react";
import { Tooltip, Modal } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CloseCircleOutlined, EyeOutlined } from "@ant-design/icons";
import RepliedComment from "./replied";
import ReplyingComment from "./replying";
import { getDateTime } from "../../helpers/formatDate";
import { useAppContext } from "../../context/appContext";
import "./comment.scss";
import axios from "axios";

function Comment({ post, comment, handleCreateComment }) {
    const { user, userProfile, listUsers, createLike } = useAppContext();
    const [showHiddenComment, setShowHiddenComment] = useState(false);
    const [commentsOfComment, setCommentsOfComment] = useState([]);
    const [isHoverComment, setIsHoverComment] = useState(false);
    const [showReplying, setShowReplying] = useState(false);
    const [showRepliedComment, setShowRepliedComment] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(comment.likes.length);
    const [listToolTips, setListToolTips] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const commenterUser = listUsers.find(
        (userInfo) => userInfo.user._id === comment.commenter._id
    );
    useEffect(() => {
        axios
            .get(`/api/comment/parent-comment/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setCommentsOfComment(res.data);
            });
    }, [comment]);
    useEffect(() => {
        if (comment.likes.includes(user._id)) {
            setLikeState(true);
        }
        setListToolTips([]);
        comment.likes.map((userId) => {
            for (let i = 0; i < listUsers.length; i++) {
                if (listUsers[i].user._id === userId) {
                    setListToolTips((listToolTips) => [
                        ...listToolTips,
                        listUsers[i],
                    ]);
                }
            }
        });
    }, []);
    const handleCreateLike = () => {
        const like = {
            comment_id: comment._id,
        };
        createLike(like);
        if (likeState) {
            setNumberOfLike(numberOfLike - 1);
            const user = listToolTips.filter(
                (item) => item.user._id !== userProfile.user._id
            );
            setListToolTips(user);
        } else {
            setNumberOfLike(numberOfLike + 1);
            setListToolTips((listToolTips) => [...listToolTips, userProfile]);
        }
        setLikeState(!likeState);
    };
    const handleDeleteCommnet = async (commentId) => {
        try {
            const response = await axios.delete(`/api/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert(response.data.message);
            window.location.reload(false);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        comment && (
            <div className="comment-container">
                <img
                    className="img-circle"
                    alt=""
                    src={comment.commenter.avatar}
                />
                <div className="ms-2 col-11 ">
                    <div
                        style={{ width: "fit-content" }}
                        className="d-flex position-relative"
                        onMouseEnter={() => setIsHoverComment(true)}
                        onMouseLeave={() => setIsHoverComment(false)}
                    >
                        <div className={
                            !showHiddenComment && comment.status === "negative"
                                ? "comment-container__text hidden"
                                : "comment-container__text"
                        }>
                            <a className="user-name" href="/">
                                {commenterUser?.fullName !== ""
                                    ? commenterUser?.fullName
                                    : comment.commenter.username}
                            </a>
                            <p>{comment.text}</p>
                            {numberOfLike > 0 && (
                                <Tooltip
                                    title={() =>
                                        listToolTips.map((item) => (
                                            <>
                                                {item.fullName !== ""
                                                    ? item.fullName
                                                    : item.user.username}
                                                <br />
                                            </>
                                        ))
                                    }
                                    className="icon-like"
                                >
                                    <img
                                        className="img-circle"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                        }}
                                        src={require("../../assets/images/like.png")}
                                        alt=""
                                    />
                                    <span>{numberOfLike}</span>
                                </Tooltip>
                            )}
                        </div>
                        {
                            comment.status === "negative" && !showHiddenComment &&
                            <div className="comment-overlay">
                                <Tooltip title="View comment">
                                    <EyeOutlined className="icons-show-comment" onClick={() => setShowHiddenComment(true)} />
                                </Tooltip>
                            </div>
                        }
                        {isHoverComment &&
                            (post.user._id === user._id ||
                                comment.commenter._id === user._id) && (
                                <div className="icon-delete-content">
                                    <CloseCircleOutlined
                                        className="icon-delete-comment"
                                        onClick={() => setShowDeleteModal(true)}
                                    />
                                </div>
                            )}
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
                                            post={post}
                                            repliedComment={comment}
                                            handleDeleteCommnet={
                                                handleDeleteCommnet
                                            }
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

                <Modal
                    className="delete-post-modal"
                    open={showDeleteModal}
                    footer={null}
                    onCancel={() => setShowDeleteModal(false)}
                >
                    <h5>Bạn không thể hoàn tác sau khi xóa bình luận </h5>
                    <div className="delete-post-modal__footer">
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Thoát
                        </button>
                        <button
                            type="primary"
                            className="btn-blue"
                            onClick={() => handleDeleteCommnet(comment._id)}
                        >
                            Xóa
                        </button>
                    </div>
                </Modal>
            </div>
        )
    );
}

export default Comment;

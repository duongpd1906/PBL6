import React, { useState, useEffect } from "react";
import { Tooltip, Modal } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CloseCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { getDateTime } from "../../../helpers/formatDate";
import { useAppContext } from "../../../context/appContext";
import "./replied-comment.scss";

function RepliedComment({ post, repliedComment, handleDeleteCommnet }) {
    const { user, userProfile, listUsers, createLike } = useAppContext();
    const [showHiddenComment, setShowHiddenComment] = useState(false);
    const [isHoverComment, setIsHoverComment] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(
        repliedComment.likes.length
    );
    const [listToolTips, setListToolTips] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const repliedUser = listUsers.find(
        (userInfo) => userInfo.user._id === repliedComment.commenter._id
    );
    useEffect(() => {
        if (repliedComment.likes.includes(user._id)) {
            setLikeState(true);
        }
        setListToolTips([]);
        repliedComment.likes.map((userId) => {
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
            commentId: repliedComment._id,
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
    return (
        <div className="reply-comment-container">
            <img
                className="img-circle"
                alt=""
                style={{ width: "30px", height: "30px" }}
                src={repliedUser?.user.avatar}
            />
            <div className="ms-2 ">
                <div
                    style={{ width: "fit-content" }}
                    className="d-flex  position-relative"
                    onMouseEnter={() => setIsHoverComment(true)}
                    onMouseLeave={() => setIsHoverComment(false)}
                >
                    <div
                        className={
                            !showHiddenComment && repliedComment.status === "negative"
                                ? "reply-comment-container__text hidden"
                                : "reply-comment-container__text"
                        }
                    >
                        <a className="user-name" href="/">
                            {repliedUser?.fullName !== ""
                                ? repliedUser.fullName
                                : repliedUser.user.username}
                        </a>
                        <p dangerouslySetInnerHTML={{__html: repliedComment.text.replace(/\n/g, '<br/>')}} />
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
                                    style={{ width: "18px", height: "18px" }}
                                    src={require("../../../assets/images/like.png")}
                                    alt=""
                                />
                                <span>{numberOfLike}</span>
                            </Tooltip>
                        )}
                    </div>
                    {repliedComment.status === "negative" && !showHiddenComment && (
                        <div className="comment-overlay">
                            <Tooltip title="View comment">
                                <EyeOutlined
                                    className="icons-show-comment"
                                    onClick={() => setShowHiddenComment(true)}
                                />
                            </Tooltip>
                        </div>
                    )}
                    {isHoverComment &&
                        (post.user._id === user._id ||
                            repliedComment.commenter._id === user._id) && (
                            <div className="icon-delete-content">
                                <CloseCircleOutlined
                                    className="icon-delete-comment"
                                    onClick={() => setShowDeleteModal(true)}
                                />
                            </div>
                        )}
                </div>
                <div className="reply-comment-container__reply-action ms-3">
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
                    <label>{getDateTime(repliedComment.createdAt)}</label>
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
                        onClick={() => handleDeleteCommnet(repliedComment._id)}
                    >
                        Xóa
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default RepliedComment;

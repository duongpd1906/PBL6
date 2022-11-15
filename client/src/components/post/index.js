import React, { useState, useRef, useEffect } from "react";
import { Carousel, Input } from "antd";
import Comment from "../comment";
import Emoji from "../emoji";
import { getDateTime } from "../../helpers/formatDate";
import { listPostsImages } from "../../utils";
import { useAppContext } from "../../context/appContext";
import "./post.scss";
const { TextArea } = Input;
function Post({post}) {
    const slider = useRef();
    const { user, commentPost , comments, getCommentsByPostId, listUsers, getAllUsers} = useAppContext();
    const { text, createdAt, status } = post;
    const [showComment, setShowComment] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [showHiddenPost, setShowHiddenPost] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [limit, setLimit] = useState(5);
    const postUser = listUsers.find(userInfo => userInfo.user._id === post.user._id)

    const handleEnter = (e) => {
        if (e.keyCode  === 13 && !e.shiftKey) {
            e.preventDefault();
        if(commentText !=="" ){
            const newComment = {
                postId: post._id,
                text: commentText,
            } 
            handleCreateComment(newComment)
            setCommentText("")
        }
      }
    }
    const handleCreateComment = (data) => {
        const comment = {
            postId: data.postId,
            text: data.text,
            parentId: data.parentId,
        }

        setShowComment(true)
        commentPost(comment)
        getCommentsByPostId(post._id, limit)
    }
    const handleOpenComment = () => {
        if(!showComment){
            getCommentsByPostId(post._id, limit)
        }
        setShowComment(!showComment)
    }
    useEffect(() => {
        getAllUsers()
        getCommentsByPostId(post._id, limit)
    }, [limit]);
    console.log(post);
    return (
        <div
            className={
                "post-container " +
                (!showHiddenPost && status === "0" ? "is-hidden" : "")
            }
        >
            <div className="post-content">
                <div className="mx-3">
                    <div className="d-flex align-items-center">
                        <div className="shape-circle">
                            <img
                                className="img-circle"
                                style={{ width: "50px", height: "50px" }}
                                alt=""
                                src={post.user.avatar}
                            />
                        </div>
                        <div className="ms-3">
                            <a className="user-name" href="/">
                                {postUser?.fullName !=="" ? postUser?.fullName: post.user.username}
                            </a>
                            <br />
                            <span>
                                {getDateTime(createdAt)}
                            </span>
                        </div>
                    </div>
                    <p className="mt-2">{text}</p>
                </div>
                <div className="position-relative">
                    <Carousel
                        className="post-container__list-images"
                        ref={(ref) => {
                            slider.current = ref;
                        }}
                    >
                        {listPostsImages.map((image) => (
                            <img alt="" src={image} />
                        ))}
                    </Carousel>
                    <div
                        className="post-container__list-images__btn-prev"
                        onClick={() => slider.current.prev()}
                    >
                        <img
                            alt=""
                            src={require("../../assets/images/btn-prev.png")}
                        />
                    </div>
                    <div
                        className="post-container__list-images__btn-next"
                        onClick={() => slider.current.next()}
                    >
                        <img
                            alt=""
                            src={require("../../assets/images/btn-next.png")}
                        />
                    </div>
                </div>
                <div className="post-container__bottom mx-3">
                    <div className="d-flex align-item-center">
                        <img
                            className="img-circle"
                            style={{ width: "20px" }}
                            src={require("../../assets/images/like.png")}
                            alt=""
                        />
                        <img
                            className="img-circle"
                            style={{ width: "20px" }}
                            src={require("../../assets/images/heart.png")}
                            alt=""
                        />
                        <img
                            className="img-circle"
                            style={{ width: "20px" }}
                            src={require("../../assets/images/haha.png")}
                            alt=""
                        />
                        <span className="ms-2">120</span>
                        <span 
                            className="ms-auto underline" 
                            onClick={() => handleOpenComment()}
                        >
                            {post.comments.length} bình luận
                        </span>
                    </div>
                    <div className="post-container__bottom__action">
                        <div
                            className="col-4"
                            onMouseEnter={() => setShowEmoji(true)}
                            onMouseLeave={() => setShowEmoji(false)}
                        >
                            <Emoji state={showEmoji} />
                            <p>Thích</p>
                        </div>
                        <div
                            className="col-4"
                            onClick={() => handleOpenComment()}
                        >
                            <p>Bình luận</p>
                        </div>
                        <div className="col-4">
                            <p>Chia sẻ</p>
                        </div>
                    </div>
                    <div className="post-container__bottom__comment col-12">
                        <img className="img-circle" alt="" src={user.avatar} />
                        <div className="comment">
                          <TextArea
                              className="textarea"
                              name="text"
                              placeholder="Viết bình luận..."
                              autoSize={{ maxRows: 5 }}
                              onChange={(e) => {
                                setCommentText(e.target.value);
                              }}
                              value={commentText}
                              onKeyDown={(e) => handleEnter(e)}
                              />
                        </div>
                    </div>
                    {showComment && comments?.length >0 &&
                        comments.map((comment, index) => (
                            comment.post === post._id &&
                            <Comment comment={comment} handleCreateComment={handleCreateComment} />
                        ))}
                    { 
                        limit < post.comments.length && showComment &&
                        <p className="more-comment" onClick={() => setLimit(limit+5)}>Xem thêm bình luận</p>
                    }
                </div>
            </div>
            <div className="post-overlay">
                <p className="post-overlay__message">
                    This post is hidden by some reasons.
                </p>
                <button
                    className="post-overlay__button"
                    onClick={() => setShowHiddenPost(true)}
                >
                    Click to view.
                </button>
            </div>
        </div>
    );
}

export default Post;

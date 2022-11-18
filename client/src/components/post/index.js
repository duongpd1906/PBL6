import React, { useState, useRef, useEffect } from "react";
import { Carousel, Input, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import Comment from "../comment";
import { getDateTime } from "../../helpers/formatDate";
import { listPostsImages } from "../../utils";
import { useAppContext } from "../../context/appContext";
import "./post.scss";
const { TextArea } = Input;
function Post({ post }) {
    const slider = useRef();
    const {
        user,
        userProfile,
        getProfileById,
        commentPost,
        commentsOfPost,
        getCommentsByPostId,
        listUsers,
        getAllUsers,
        createLike,
    } = useAppContext();
    const { text, createdAt, status } = post;
    const [showComment, setShowComment] = useState(false);
    const [showHiddenPost, setShowHiddenPost] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [limit, setLimit] = useState(5);
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(post.likes.length);
    const [numberOfComment, setNumberOfComment] = useState(post.comments.length);
    const [ listToolTips, setListToolTips] = useState([]);
    
    const postUser = listUsers.find(
        (userInfo) => userInfo.user._id === post.user._id
    );
    
    useEffect(() => {
        if (post.likes.includes(user._id)) {
            setLikeState(true);
        }
    }, []);
    useEffect(() => {
        getProfileById(user._id)
        getAllUsers();
        getCommentsByPostId(post._id, limit);
    }, [limit]);
    useEffect(() => {
        setListToolTips([])
        post.likes.map(userId => {
            for(let i=0;i<listUsers.length;i++){
                if(listUsers[i].user._id === userId){
                    setListToolTips(listToolTips => [...listToolTips,listUsers[i]] );
                }
            }
        })
    }, [listUsers]);
    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            if (commentText !== "") {
                const newComment = {
                    postId: post._id,
                    text: commentText,
                };
                handleCreateComment(newComment);
                setCommentText("");
            }
        }
    };
    const handleCreateComment = (data) => {
        const comment = {
            postId: data.postId,
            text: data.text,
            parentId: data.parentId,
        };

        setShowComment(true);
        commentPost(comment);
        getCommentsByPostId(post._id, limit);
        setNumberOfComment(numberOfComment+1)
    };
    const handleOpenComment = () => {
        if (!showComment) {
            getCommentsByPostId(post._id, limit);
        }
        setShowComment(!showComment);
    };
    const handleCreateLike = () => {
        const like = {
            postId: post._id,
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
                                {postUser?.fullName !== ""
                                    ? postUser?.fullName
                                    : post.user.username}
                            </a>
                            <br />
                            <span>{getDateTime(createdAt)}</span>
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
                        {
                            numberOfLike > 0 &&
                            <Tooltip
                                title={() => listToolTips.map(item=> 
                                    <>{item.fullName !== "" ? item.fullName : item.user.username}<br/></>
                                )}
                                style={{ cursor: "pointer",  whiteSpace:"pre-wrap" }}
                                className="underline"
                            >
                                <img
                                    className="img-circle"
                                    style={{ width: "20px" }}
                                    src={require("../../assets/images/like.png")}
                                    alt=""
                                />
                                <span className="ms-2">{numberOfLike}</span>
                            </Tooltip>
                        }
                        {
                            numberOfComment > 0 &&
                            <div className="ms-auto underline">
                                <span onClick={() => handleOpenComment()}>
                                    {numberOfComment} bình luận
                                </span>
                            </div>
                        }
                    </div>
                    <div className="post-container__bottom__action">
                        <div
                            className={
                                !likeState
                                    ? "col-4 d-flex justify-content-center"
                                    : "col-4 d-flex justify-content-center txt-blue"
                            }
                            onClick={() =>
                                handleCreateLike({ postId: post._id })
                            }
                        >
                            {likeState ? (
                                <LikeFilled className="icon" />
                            ) : (
                                <LikeOutlined className="icon" />
                            )}

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
                    {showComment &&
                        commentsOfPost?.length > 0 &&
                        commentsOfPost.map(
                            (comment, index) =>
                                comment.post === post._id && (
                                    <Comment
                                        comment={comment}
                                        handleCreateComment={
                                            handleCreateComment
                                        }
                                    />
                                )
                        )}
                    {limit < post.comments.length && showComment && (
                        <p
                            className="more-comment"
                            onClick={() => setLimit((prev) => prev + 5)}
                        >
                            Xem thêm bình luận
                        </p>
                    )}
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

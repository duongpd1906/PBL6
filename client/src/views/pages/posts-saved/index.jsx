import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import "./posts-saved.scss";
function PostsSaved() {
    const { user, listPosts, getAllPosts } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className="posts-saved">
            <div className="posts-saved__posts col-6">
                {listPosts.map(
                    (post) =>
                        post.beSaved.includes(user._id) && (
                            <div
                                className="posts-saved__posts__item"
                                onClick={() => navigate(`/posts/${post._id}`)}
                            >
                                <img
                                    className="post-image"
                                    src={
                                        post.images.length > 0
                                            ? post.images[0]
                                            : post.user.avatar
                                    }
                                    alt=""
                                />
                                <div>
                                    <h3>
                                        {post.text.length > 125
                                            ? `${post.text.substring(
                                                  0,
                                                  119
                                              )}...`
                                            : post.text}
                                    </h3>
                                    <span className="user-info">
                                        <img
                                            className="user-avatar"
                                            src={post.user.avatar}
                                            alt=""
                                        />
                                        <p className="d-flex">
                                            Saved from{" "}
                                            <p
                                                style={{
                                                    fontWeight: " 600",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                {" "}
                                                {post.user.username}
                                            </p>
                                            's post
                                        </p>
                                    </span>
                                </div>
                            </div>
                        )
                )}
                {listPosts.filter((post) => post.beSaved.includes(user._id))
                    .length <= 0 && (
                    <h3 className="mx-auto mt-5" style={{ color: "#555" }}>
                        Bạn chưa lưu bài viết nào!
                    </h3>
                )}
            </div>
        </div>
    );
}

export default PostsSaved;

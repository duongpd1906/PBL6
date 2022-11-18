import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { getDateTime } from "../../../helpers/formatDate";
import { useAppContext } from "../../../context/appContext";
import "./replied-comment.scss";

function RepliedComment({ repliedComment }) {
    const { user, userProfile, listUsers, createLike } = useAppContext();
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(repliedComment.likes.length);
    const [ listToolTips, setListToolTips] = useState([]);
    const repliedUser = listUsers.find(
        (userInfo) => userInfo.user._id === repliedComment.commenter._id
    );
    useEffect(() => {
        if (repliedComment.likes.includes(user._id)) {
            setLikeState(true);
        }
        setListToolTips([])
        repliedComment.likes.map(userId => {
            for(let i=0;i<listUsers.length;i++){
                if(listUsers[i].user._id === userId){
                    setListToolTips(listToolTips => [...listToolTips,listUsers[i]] );
                }
            }
        })
    }, []);
    const handleCreateLike = () => {
        const like = {
            commentId: repliedComment._id,
        };
        createLike(like)
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
        <div className="reply-comment-container">
            <img className="img-circle" alt="" style={{ width: "30px", height: "30px" }} src={repliedUser?.user.avatar} />
            <div className="ms-2">
                <div className="reply-comment-container__text">
                    <a className="user-name" href="/">
                        {repliedUser?.fullName !== ""
                            ? repliedUser.fullName
                            : repliedUser.user.username}
                    </a>
                    <p>{repliedComment.text}</p>
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
        </div>
    );
}

export default RepliedComment;

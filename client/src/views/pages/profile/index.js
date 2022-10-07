import React, { useState, useEffect } from "react";
import { listFriendAvatar, listFriends } from "../../../utils";
import Post from "../../../components/post";
import Info from "../../../components/info";
import FriendCard from "../../../components/friend/card";
import EditProfile from "../../../components/modal/edit-profile";
import { useAppContext } from "../../../context/appContext";
import "./profile.scss";

const POST_TAB = 1;
const INFO_TAB = 2;
const FRIEND_TAB = 3;

function Profile() {
    const [tab, setTab] = useState(POST_TAB);
    const [isModalOpen, setisModalOpen] = useState(false);
    const { listsPost, getAllPosts, user_ava } = useAppContext();
    useEffect(() => {
        getAllPosts();
    }, []);
    const handleOpenModal = (state) => {
        setisModalOpen(state);
    };
    return (
        <div className="profile-container col-8">
            <div className="profile-container__top">
                <img src={user_ava} alt="" />
                <div className="mt-auto ms-4">
                    <h2>Hieu</h2>
                    <h6>240 Ban be</h6>
                    <div className="profile-container__top__list-image">
                        <img
                            className="icon-dots"
                            src={require("../../../assets/images/dots.png")}
                            alt=""
                        />
                        {listFriendAvatar.map((friend) => (
                            <img
                                className="avatar"
                                src={friend.avatar}
                                alt=""
                            />
                        ))}
                    </div>
                    <button onClick={() => handleOpenModal(true)}>
                        Chỉnh sửa thông tin{" "}
                    </button>
                    <EditProfile
                        isModalOpen={isModalOpen}
                        handleOpenModal={handleOpenModal}
                    />
                </div>
            </div>
            <div className="profile-container__content">
                <div className="profile-container__content__tab col-3">
                    <button
                        className={tab === POST_TAB && "active"}
                        onClick={() => setTab(POST_TAB)}
                    >
                        Bài viết
                    </button>
                    <button
                        className={tab === INFO_TAB && "active"}
                        onClick={() => setTab(INFO_TAB)}
                    >
                        Thông tin
                    </button>
                    <button
                        className={tab === FRIEND_TAB && "active"}
                        onClick={() => setTab(FRIEND_TAB)}
                    >
                        Bạn bè
                    </button>
                </div>
                <div className="col-9 mb-5">
                    {tab === POST_TAB &&
                        listsPost.map((post) => <Post data={post} />)}
                    {tab === INFO_TAB && <Info />}
                    {tab === FRIEND_TAB &&
                        listFriends.map((friend) => (
                            <FriendCard data={friend} />
                        ))}
                </div>
            </div>
        </div>
    );
}
export default Profile;

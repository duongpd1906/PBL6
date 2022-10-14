import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const { id } = useParams();
    const [tab, setTab] = useState(POST_TAB);
    const navigate = useNavigate();
    const [isModalOpen, setisModalOpen] = useState(false);
    const { user, userProfile, getProfileById, listPosts, getAllPosts } = useAppContext();
    const userId = id ? id : user._id
    useEffect(() => {
        getProfileById(userId);
        getAllPosts();
    }, []);
    const handleOpenModal = (state) => {
        setisModalOpen(state);
    };
    return (
        <div className="profile-container col-8">
            <div className="profile-container__top">
                <img src={userProfile?.avatar} alt="" />
                <div className="mt-auto ms-4">
                    <h2>{userProfile?.fullName !=="" ? userProfile?.fullName: userProfile.user.username}</h2>
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
                    {
                        !id 
                            ? <button onClick={() => handleOpenModal(true)}>Chỉnh sửa</button>
                            : !userProfile?.friends.includes(user._id) 
                                ? !userProfile?.invitation_send.includes(user._id) 
                                    ? !userProfile?.invitation_receive.includes(user._id) 
                                        ? <button>Kết bạn</button>
                                        : <button>Hủy lời mời</button>
                                    : <button>Xác nhận lời mời</button>
                                : <div>
                                    <button className="btn-gray">Hủy kết bạn</button>
                                    <button onClick={() => navigate("/chat")}>Nhắn tin</button>
                                </div>

                    }
                    
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
                        listPosts
                            .filter((post) => post.user._id === userId)
                            .map((post) => <Post data={post} />)}
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

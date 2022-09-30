import React, { useState } from "react";
import { listFriendAvatar } from "../../../utils";
import { listFriends } from "../../../utils";
import Post from "../../../components/post";
import Info from "../../../components/info";
import FriendCard from "../../../components/friend/card";
import EditProfile from "../../../components/modal/edit-profile";
import "./profile.scss";

const POST_TAB = 1;
const INFO_TAB = 2;
const FRIEND_TAB = 3;

function Profile() {
    const [tab, setTab] = useState(POST_TAB);
    const [ isModalOpen, setisModalOpen ] = useState(false)
    const handleOpenModal = state => {
        setisModalOpen(state)
    }
    return (
        <div className="profile-container col-8">
            <div className="profile-container__top">
                <img
                    src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/280374790_1477115089370427_2274356777150785265_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5unFC2K8Uz0AX985xRG&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_yrPH4BTO8V4F6vu03OSS2rmKC5ktOW7sK16WaUTWmUw&oe=63301286"
                    alt=""
                />
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
                    <button onClick={() => handleOpenModal(true)}>Chỉnh sửa thông tin </button>
                    <EditProfile isModalOpen={isModalOpen} handleOpenModal={handleOpenModal}/>
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
                    { tab === POST_TAB && <Post />}
                    { tab === INFO_TAB && <Info />}
                    { tab === FRIEND_TAB && listFriends.map((friend) => <FriendCard data={friend} />)}
                </div>
            </div>
        </div>
    );
}
export default Profile;

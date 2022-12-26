import React, { useState, useEffect } from "react";
import { Input, Form, Modal } from "antd";
import { useAppContext } from "../../../context/appContext";
import "./edit-post.scss";
import axios from "axios";

const { TextArea } = Input;
function EditPost({post, showEditModal, handleEditPostModal}) {
    const { userProfile } = useAppContext();
    const [images, setImages] = useState([]);
    const [showImagess, setShowImagess] = useState([]);
    useEffect(() => {
        if (post) {
            setShowImagess(post.images)
        } 
    }, [post]);
    const handleUploadImage = (e) => {
        var listsShowImage = showImagess.slice();
        listsShowImage.push(URL.createObjectURL(e.target.files[0]));
        var listsImages = images.slice();
        listsImages.push(e.target.files[0]);
        setImages(listsImages);
        setShowImagess(listsShowImage);
    };

    const handleSubmit = async (values) => {
        const updatePost = {
            text: values.text,
        };
        await axios.put(`/api/post/${post._id}`, updatePost, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        window.location.reload(false)
    }
    return ( 
        post &&
        <Modal
            className="edit-post-modal"
            open={showEditModal}
            footer={null}
            onOk={() => handleEditPostModal(false)}
            onCancel={() => handleEditPostModal(false)}
        >
            <h4 style={{textAlign: "center", marginBottom: "20px"}}>Chỉnh sửa bài viết</h4>
            <Form className="edit-post-container" onFinish={handleSubmit}>
                <div className="edit-post-container__top">
                    <img src={userProfile?.user.avatar} alt="" />
                    <Form.Item name="text" style={{ width: "90%" }}>
                        <TextArea
                            placeholder="Bạn đang nghĩ gì ?"
                            name="text"
                            autoSize={{ minRows: 1, maxRows: 15 }}
                            defaultValue={post.text}
                        />
                    </Form.Item>
                </div>
                <div
                    className={
                        showImagess.length !== 0
                            ? "edit-post-container__list-image"
                            : ""
                    }
                >
                    {showImagess.map((image,index) => (
                            <img className="image" src={image} alt="" />

                    ))}
                </div>

                <div className="edit-post-container__bottom">
                    <div className="item col-4">
                        <img
                            src={require("../../../assets/images/icon-emoji.png")}
                            alt=""
                        />
                        Cảm xúc
                    </div>
                    <label className="item col-4" for="image">
                        <img
                            src={require("../../../assets/images/icon-image.png")}
                            alt=""
                        />
                        Ảnh/Video
                    </label>
                    <input
                        id="image"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg"
                        type="file"
                        onChange={handleUploadImage}
                    />
                    <div className="item col-4">
                        <img
                            src={require("../../../assets/images/icon-gif.png")}
                            alt=""
                        />
                        Gif
                    </div>
                </div>
                <button type="submit" className="btn-blue">
                    Đăng bài
                </button>
            </Form>
        </Modal>
    );
}
export default EditPost;

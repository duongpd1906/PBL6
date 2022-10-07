import React, { useState } from "react";
import { Input, Form } from "antd";
import { useAppContext } from "../../context/appContext"
import "./posting.scss";

const { TextArea } = Input;
function Posting() {
    const [images, setImages] = useState([]);
    const { createPost } = useAppContext();

    const handleUploadImage = (e) => {
        var listsImage = images.slice();
        listsImage.push(URL.createObjectURL(e.target.files[0]));
        setImages(listsImage);
    };
    const handleSubmit = (values) => {
        const text = values.text
        createPost({ text, images});
        window.location.reload(false)
    };
    return (
        <Form className="posting-container" onFinish={handleSubmit}>
            <div className="posting-container__top">
                <img
                    src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/280374790_1477115089370427_2274356777150785265_n.jpg?stp=dst-jpg_p240x240&amp;_nc_cat=102&amp;ccb=1-7&amp;_nc_sid=7206a8&amp;_nc_ohc=5unFC2K8Uz0AX985xRG&amp;_nc_ht=scontent.fdad1-2.fna&amp;oh=00_AT_yrPH4BTO8V4F6vu03OSS2rmKC5ktOW7sK16WaUTWmUw&amp;oe=63301286"
                    alt=""
                />
                <Form.Item name="text" className="col-11">
                    <TextArea
                        placeholder="Bạn đang nghĩ gì ?"
                        name="text"
                        autoSize={{ minRows: 1, maxRows: 15 }}
                    />
                </Form.Item>
            </div>
            <div
                className={
                    images.length !== 0
                        ? "posting-container__list-image"
                        : ""
                }
            >
                {images.map((image) => (
                    <img className="image" src={image} alt="" />
                ))}
            </div>

            <div className="posting-container__bottom">
                <div className="item col-4">
                    <img
                        src={require("../../assets/images/icon-emoji.png")}
                        alt=""
                    />
                    Cảm xúc
                </div>
                <label className="item col-4" for="image-input">
                    <img
                        src={require("../../assets/images/icon-image.png")}
                        alt=""
                    />
                    Ảnh/Video
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
                <div className="item col-4">
                    <img
                        src={require("../../assets/images/icon-gif.png")}
                        alt=""
                    />
                    Gif
                </div>
            </div>
            <button type="submit" className="btn-blue">
                Đăng bài
            </button>
        </Form>
    );
}
export default Posting;

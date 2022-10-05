import React from "react";
import "./posting.scss";
import { Input, Form } from "antd";
import { useAppContext } from "../../context/appContext";
const { TextArea } = Input;

function Posting() {
    // const { createPost } = useAppContext();
    // const handleSubmit = (values) => {
    //     createPost(values)
    // };
    return (
        // <Form onFinish={handleSubmit}>
        //     <Form.Item name="text" className="col-11">
        //         <TextArea
        //             placeholder="Bạn đang nghĩ gì ?"
        //             name="text"
        //             autoSize={{ minRows: 1, maxRows: 15 }}
        //         />
        //     </Form.Item>
        //     <button type="submit" className="btn-blue">
        //         Đăng bài
        //     </button>
        // </Form>
        <div className="posting-container">
            <div className="posting-container__top">
                <img src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/280374790_1477115089370427_2274356777150785265_n.jpg?stp=dst-jpg_p240x240&amp;_nc_cat=102&amp;ccb=1-7&amp;_nc_sid=7206a8&amp;_nc_ohc=5unFC2K8Uz0AX985xRG&amp;_nc_ht=scontent.fdad1-2.fna&amp;oh=00_AT_yrPH4BTO8V4F6vu03OSS2rmKC5ktOW7sK16WaUTWmUw&amp;oe=63301286" alt=""/>
                <input placeholder="Bạn đang nghĩ gì ?"/>
            </div>
            <div className="posting-container__bottom">
                <div className="item col-4">
                    <img src={require("../../assets/images/icon-emoji.png")} alt=""/>
                    Cảm xúc
                </div>
                <div className="item col-4">
                    <img src={require("../../assets/images/icon-image.png")} alt=""/>
                    Ảnh/Video
                </div>
                <div className="item col-4">
                    <img src={require("../../assets/images/icon-gif.png")} alt=""/>
                    Gif
                </div>
            </div>
        </div>
    );
}
export default Posting;

import React from "react";
import "./info.scss";

function Info() {
    return (
        <div className="info-container">
            <div className="d-flex my-4">
                <img src={require("../../assets/images/gender.png")} alt=""/>
                <div className="ms-4">
                    <p>Nữ</p>
                    <span className="text">Giới tính</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/birthday.png")} alt=""/>
                <div className="ms-4">
                    <p>24/04/2001</p>
                    <span className="text">Ngày sinh</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/location.png")} alt=""/>
                <div className="ms-4">
                    <p>Huế</p>
                    <span className="text">Nơi sống</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/email.png")} alt="" />
                <div className="ms-4">
                    <p>hothihieu2404@gmail.com</p>
                    <span className="text">Email</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/phone.png")} alt="" />
                <div className="ms-4">
                    <p>0394285138</p>
                    <span className="text">Số điện thoại</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/love.png")} alt="" />
                <div className="ms-4">
                    <p>Ngủ nha</p>
                    <span className="text">Sở thích</span>
                </div>
            </div>
        </div>
    );
}

export default Info;

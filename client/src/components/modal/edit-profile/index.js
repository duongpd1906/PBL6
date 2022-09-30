import React from "react";
import { Modal, Radio, DatePicker, Form, Input } from "antd";
import { CameraFilled } from "@ant-design/icons";
import "./edit-profile.scss";

function EditProfile({ isModalOpen, handleOpenModal }) {
    const onSubmit = (values) => {
        window.location.reload(false);
    };
    const handleUploadImage = (e) => {
        const userAvatar = document.getElementById("user-avatar");
        userAvatar.src = URL.createObjectURL(e.target.files[0]);
    };
    return (
        <Modal
            className="edit-profile"
            open={isModalOpen}
            footer={null}
            onOk={() => handleOpenModal(false)}
            onCancel={() => handleOpenModal(false)}
        >
            <div className="edit-profile__avatar">
                <img
                    id="user-avatar"
                    src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/280374790_1477115089370427_2274356777150785265_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5unFC2K8Uz0AX985xRG&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_yrPH4BTO8V4F6vu03OSS2rmKC5ktOW7sK16WaUTWmUw&oe=63301286"
                    alt=""
                />
                <label for="image-input">
                    <CameraFilled className="edit-profile__avatar__icon-camera" />
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
            </div>
            <Form className="edit-profile__content" onFinish={onSubmit}>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Họ và tên</lable>
                    <div className="col-1"></div>
                    <Form.Item name="name" className="col-8 mb-0">
                        <Input defaultValue="Hieu" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Giới tính</lable>
                    <div className="col-1"></div>
                    <Form.Item name="gender" className="col-8 mb-0">
                        <Radio.Group defaultValue={true}>
                            <Radio value={true}>Nữ</Radio>
                            <Radio value={false}>Nam</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Ngày sinh</lable>
                    <div className="col-1"></div>
                    <Form.Item name="birthday" className="col-8 mb-0">
                        <DatePicker className="col-12" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Địa chỉ</lable>
                    <div className="col-1"></div>
                    <Form.Item name="address" className="col-8 mb-0">
                        <Input defaultValue="Hue" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Số điện thoại</lable>
                    <div className="col-1"></div>
                    <Form.Item name="phone_number" className="col-8 mb-0">
                        <Input defaultValue="0394285138" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Sở thích</lable>
                    <div className="col-1"></div>
                    <Form.Item name="hobbies" className="col-8 mb-0">
                        <Input defaultValue="ngu" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__footer">
                    <button
                        type="button"
                        onClick={() => handleOpenModal(false)}
                    >
                        Thoát
                    </button>
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn-blue"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default EditProfile;

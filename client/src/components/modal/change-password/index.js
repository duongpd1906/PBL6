import React from "react";
import { Modal, Form, Input } from "antd";
import { messages } from "../../../assets/lang/messages";
import axios from 'axios'
import { useAppContext } from "../../../context/appContext";
import "./change-password.scss";

function ChangePassword({ isModalOpen, handleOpenModal }) {
    const onSubmit = async (values) => {
        try {
            const response = await axios.post("/api/auth/change-password", values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            alert(response.data.message)
            window.location.reload(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    };
    return (
        <Modal
            className="change-password"
            open={isModalOpen}
            footer={null}
            onOk={() => handleOpenModal(false)}
            onCancel={() => handleOpenModal(false)}
        >   
            <h3 className="txt-blue mt-3 mb-5">Thay đổi mật khẩu</h3>
            <Form className="px-5 mt-5" onFinish={onSubmit}>
                <div className="d-flex my-1">
                    <label className="col-4 mt-1">Mật khẩu cũ</label>
                    <Form.Item
                        className="col-8"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                            {
                                type: "string",
                                min: 6,
                                max: 24,
                                message: messages["invalid_password_length"],
                            },
                        ]}
                    >
                        <Input.Password className="input" />
                    </Form.Item>
                </div>
                <div className="d-flex my-1">
                    <label className="col-4 mt-1">Mật khẩu mới</label>
                    <Form.Item
                        className="col-8"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                            {
                                type: "string",
                                min: 6,
                                max: 24,
                                message: messages["invalid_password_length"],
                            },
                        ]}
                    >
                        <Input.Password className="input" />
                    </Form.Item>
                </div>
                <div className="d-flex my-1">
                    <label className="col-4 mt-1">Nhập lại mất khẩu</label>
                    <Form.Item
                        className="col-8"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            messages[
                                                "confirm_password_not_match"
                                            ]
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="input" />
                    </Form.Item>
                </div>
                <div className="change-password__footer">
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
export default ChangePassword;

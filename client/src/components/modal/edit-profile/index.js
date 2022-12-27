import React, { useState, useEffect } from "react";
import { Modal, Radio, DatePicker, Form, Input } from "antd";
import { CameraFilled } from "@ant-design/icons";
import moment from "moment";
import { useAppContext } from "../../../context/appContext";
import "./edit-profile.scss";

function EditProfile({ isModalOpen, handleOpenModal }) {
	const {
		updateAvatar,
		userProfile,
		updateUserProfile,
		user,
		getProfileById,
	} = useAppContext();
	const [selectedImage, setSelectedImage] = useState();

	const onSubmit = (values) => {
		values.dayOfBirth = values.dayOfBirth
			? values.dayOfBirth.toDate()
			: userProfile.dayOfBirth;
		updateImage();
		updateUserProfile(values);
		getProfileById(user._id);
		// window.location.reload(false);
	};

	const handleUploadImage = (e) => {
		const userAvatar = document.getElementById("user-avatar");
		userAvatar.src = URL.createObjectURL(e.target.files[0]);
		setSelectedImage(e.target.files[0]);
	};

	const updateImage = () => {
		const formData = new FormData();
		if (selectedImage) {
			formData.append("image", selectedImage);
			updateAvatar(formData);
		}
	};

	return (
		userProfile && (
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
						src={userProfile?.user.avatar}
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
						<Form.Item name="fullName" className="col-8 mb-0">
							<Input defaultValue={userProfile?.fullName} />
						</Form.Item>
					</div>
					<div className="edit-profile__content__item">
						<lable className="col-3">Giới tính</lable>
						<div className="col-1"></div>
						<Form.Item name="gender" className="col-8 mb-0">
							<Radio.Group defaultValue={userProfile?.gender}>
								<Radio value={false}>Nữ</Radio>
								<Radio value={true}>Nam</Radio>
							</Radio.Group>
						</Form.Item>
					</div>
					<div className="edit-profile__content__item">
						<lable className="col-3">Ngày sinh</lable>
						<div className="col-1"></div>
						<Form.Item name="dayOfBirth" className="col-8 mb-0">
							<DatePicker
								className="col-12"
								defaultValue={moment(
									new Date(userProfile?.dayOfBirth),
									"YYYY/MM/DD"
								)}
								format="DD/MM/YYYY"
							/>
						</Form.Item>
					</div>
					<div className="edit-profile__content__item">
						<lable className="col-3">Địa chỉ</lable>
						<div className="col-1"></div>
						<Form.Item name="address" className="col-8 mb-0">
							<Input defaultValue={userProfile?.address} />
						</Form.Item>
					</div>
					<div className="edit-profile__content__item">
						<lable className="col-3">Số điện thoại</lable>
						<div className="col-1"></div>
						<Form.Item name="phoneNumber" className="col-8 mb-0">
							<Input defaultValue={userProfile?.phoneNumber} />
						</Form.Item>
					</div>
					<div className="edit-profile__content__item">
						<lable className="col-3">Sở thích</lable>
						<div className="col-1"></div>
						<Form.Item name="hoppy" className="col-8 mb-0">
							<Input defaultValue={userProfile?.hoppy} />
						</Form.Item>
					</div>
					<div className="edit-profile__content__footer">
						<button
							type="button"
							onClick={() => handleOpenModal(false)}
						>
							Thoát
						</button>
						<button className="btn-blue">Lưu</button>
					</div>
				</Form>
			</Modal>
		)
	);
}

export default EditProfile;

import React, { useState } from "react";
import { Input, Form, Spin } from "antd";
import { useAppContext } from "../../context/appContext";
import "./posting.scss";
import axios from "axios";

const { TextArea } = Input;
function Posting() {
	const { user } = useAppContext();
	const [images, setImages] = useState([]);
	const [showImages, setShowImages] = useState([]);
	const [responseState, setResponSate] = useState(false);

	const handleUploadImage = (e) => {
		var listsShowImage = showImages.slice();
		listsShowImage.push(URL.createObjectURL(e.target.files[0]));
		var listsImages = images.slice();
		listsImages.push(e.target.files[0]);
		setImages(listsImages);
		setShowImages(listsShowImage);
	};
	const handleSubmit = async (values) => {
		if ((values.text && values.text !== "") || images.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < images.length; i++) {
				formData.append("post-img", images[i]);
			}
			try {
				setResponSate(true);
				await axios
					.post("/api/post/predict", {
						text: values.text,
					})
					.then((respData) => {
						return respData.data;
					})
					.then((data) => {
						const newPost = {
							text: values.text,
							images: formData,
							status: data,
						};
						const response = axios.post("/api/post", newPost, {
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						});
						if (images.length > 0 && response.status === 200) {
							axios.patch(
								`/api/post/images/${response.data._id}`,
								newPost.images,
								{
									headers: {
										Authorization: `Bearer ${localStorage.getItem(
											"token"
										)}`,
									},
								}
							);
						}
						window.location.reload(false);
					});
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="d-flex flex-column">
			<Form className="posting-container" onFinish={handleSubmit}>
				<div className="posting-container__top">
					<img src={user.avatar} alt="" />
					<Form.Item name="text" style={{ width: "90%" }}>
						<TextArea
							placeholder="Bạn đang nghĩ gì ?"
							name="text"
							autoSize={{ minRows: 1, maxRows: 15 }}
						/>
					</Form.Item>
				</div>
				<div
					className={
						showImages.length !== 0
							? "posting-container__list-image"
							: ""
					}
				>
					{showImages.map((image) => (
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
			{responseState && (
				<div className="posting-spin">
					<Spin />
					<p>Đang xử lí</p>
				</div>
			)}
		</div>
	);
}
export default Posting;

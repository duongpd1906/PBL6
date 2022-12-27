import multer from "multer";
import path from "path";
import moment from "moment";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, "./public/images/"); // './public/images/' directory name where save the file
	},
	filename: (req, file, callBack) => {
		callBack(
			null,
			file.fieldname +
				"-" +
				moment.now() +
				path.extname(file.originalname)
		);
	},
});

const upload = multer({
	storage: storage,
});

const memoryStorage = multer.memoryStorage();

const uploadCloud = multer({
	storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
	try {
		const { uploader } = cloudinary;

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		const res = await uploader.upload(
			`data:image/${format};base64,${fileString}`
		);

		return res;
	} catch (error) {
		throw new ErrorHandler(500, error);
	}
};

export { upload, uploadCloud, uploadToCloudinary };

import express from "express";
const router = express.Router();
import userAvatarUploader from "../helpers/uploaders/user_avatar.uploader.js";
import authenticateUser from "../middleware/auth.js";
import { uploadCloud } from "../middleware/upload.js";

import {
	getAll,
	getProfileById,
	updateUserProfile,
	updateUserAvatar,
	sendInvitation,
	acceptInvitation,
	getMyInvitation,
	getUserById,
} from "../controllers/userController.js";

router.route("/").get(getAll);
router.route("/byid/").get(getUserById);
router.route("/:id").get(getProfileById);
router.route("/").put(authenticateUser, updateUserProfile);
router.route("/accept-invitation").patch(authenticateUser, acceptInvitation);
router.route("/send-invitation").patch(authenticateUser, sendInvitation);
router.route("/invitation/me").get(authenticateUser, getMyInvitation);
router
	.route("/avatar")
	.patch(uploadCloud.single("image"), authenticateUser, updateUserAvatar);

export default router;

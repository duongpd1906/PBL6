import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import authenticateUser from "../middleware/auth.js";

import {
    update_user_avatar,
    get_my_profile,
    edit_profile,
} from "../controllers/userController.js";

router
    .route("/avatar")
    .patch(upload.single("image"), authenticateUser, update_user_avatar);

router
    .route("/profile/me")
    .get(authenticateUser, get_my_profile)
    .post(authenticateUser, edit_profile);

export default router;

import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import authenticateUser from "../middleware/auth.js";

import { update_user_avatar } from "../controllers/userController.js";

router
    .route("/avatar")
    .patch(upload.single("image"), authenticateUser, update_user_avatar);

export default router;

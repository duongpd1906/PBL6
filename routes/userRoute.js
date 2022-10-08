import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import authenticateUser from "../middleware/auth.js";

import {
    getProfileById,
    updateUserAvatar,
    sendInvitation,
} from "../controllers/userController.js";

router.route("/:id").get(authenticateUser, getProfileById);
router.route("/send-invitation").patch(authenticateUser, sendInvitation);
router
    .route("/avatar")
    .patch(upload.single("image"), authenticateUser, updateUserAvatar);


export default router;

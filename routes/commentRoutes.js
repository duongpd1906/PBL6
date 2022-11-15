import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    getCommentsByPostId,
    createComment,
} from "../controllers/commentController.js";

router.route("/:postId").get(getCommentsByPostId);
router.route("/").post(authenticateUser, createComment);

export default router;

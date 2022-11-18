import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    getCommentsByPostId,
    getCommentsByParentId,
    createComment,
} from "../controllers/commentController.js";

router.route("/post/:postId").get(getCommentsByPostId);
router.route("/parent-comment/:parentId").get(getCommentsByParentId);
router.route("/").post(authenticateUser, createComment);

export default router;

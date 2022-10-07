import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByUserId,
} from "../controllers/postController.js";

router.route("/").post(authenticateUser, createPost).get(getAllPosts);
router.route("/userId/:id").get(getPostByUserId);
router
    .route("/:id")
    .get(getPostById)
    .delete(authenticateUser, deletePost)
    .put(authenticateUser, updatePost);

export default router;

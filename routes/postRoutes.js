import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    createPost,
    updatePostImage,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    predict,
} from "../controllers/postController.js";

import postImageUploader from '../helpers/uploaders/post_image.uploader.js'

router.route("/").post(authenticateUser, createPost).get(getAllPosts);
router
    .route("/:id")
    .get(getPostById)
    .delete(authenticateUser, deletePost)
    .put(authenticateUser, updatePost);
router.route("/predict").post(predict);
router
    .route("/images/:id")
    .patch(
        authenticateUser,
        postImageUploader.array("post-img", 10),
        updatePostImage
    );


export default router;

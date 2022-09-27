import User from "../models/User.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermissions.js";

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user").sort({ date: -1 });
        res.status(StatusCodes.OK).json(posts);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user");

        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }

        res.status(StatusCodes.OK).json(post);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            text: req.body.text,
            user: req.user.userId,
        });

        const post = await newPost.save();

        res.status(StatusCodes.OK).json(post);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }
        checkPermissions(req.user, post.user);

        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(StatusCodes.OK).json({ updatedPost });
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }

        checkPermissions(req.user, post.user);

        await post.remove();

        res.status(StatusCodes.OK).json({ msg: "Post removed" });
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import { spawn } from "child_process";

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId,
            parentId: null,
        })
            .populate(["comments", "commenter"])
            .sort({ createdAt: -1 })
            .limit(req.query.limit);
        res.status(200).json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const getCommentsByParentId = async (req, res) => {
    try {
        const comments = await Comment.find({ parentId: req.params.parentId })
            .populate(["comments", "commenter"])
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const createComment = async (req, res) => {
    try {
        console.log(req.body.status);
        const newComment = new Comment({
            post: req.body.postId,
            commenter: req.user.userId,
            text: req.body.text,
            parentId: req.body.parentId,
            status: req.body.status,
        });
        const comment = await newComment.save();
        if (req.body.parentId) {
            const parentComment = await Comment.findOne({
                _id: req.body.parentId,
            });
            await parentComment.updateOne({
                $push: { comments: comment },
            });
        }
        const post = await Post.findOne({ _id: req.body.postId });
        await post.updateOne({
            $push: { comments: comment._id },
        });
        res.status(200).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        if (!comment) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Comment not found!" });
        }
        const post = await Post.findOne({ _id: comment.post._id });
        var listComments = post.comments;
        if (comment.comments.length) {
            await Comment.deleteMany({ parentId: comment._id });
            listComments = post.comments.filter(
                (x) =>
                    !comment.comments
                        .map((y) => y._id.toString())
                        .includes(x.toString())
            );
        }
        listComments = listComments.filter(
            (x) => x.toString() !== comment._id.toString()
        );
        await post.updateOne({
            comments: listComments,
        });
        if (comment.parentId) {
            const parentComment = await Comment.findOne({
                _id: comment.parentId,
            });
            await parentComment.updateOne({
                $pull: { comments: comment },
            });
        }

        await comment.remove();
        res.status(StatusCodes.OK).json({
            message: "Delete comment successfully!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!",
            error: err,
        });
    }
};
export {
    getCommentsByPostId,
    getCommentsByParentId,
    createComment,
    deleteComment,
};

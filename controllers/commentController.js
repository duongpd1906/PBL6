import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId, parentId: null })
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
        const comments = await Comment.find({ parentId: req.params.parentId})
                                        .populate(["comments", "commenter"])
                                        .sort({ createdAt: -1 })
        res.status(200).json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const createComment = async (req, res) => {
    try {
        const newComment =new Comment({
            post: req.body.postId,
            commenter: req.user.userId,
            text: req.body.text,
            parentId: req.body.parentId,
        })
        const comment = await newComment.save();
        if(req.body.parentId){
            const parentComment = await Comment.findOne({_id: req.body.parentId});
            await parentComment.updateOne({
				$push: { comments: comment },
			});
        }
        const post = await Post.findOne({_id: req.body.postId});
        await post.updateOne({
            $push: { comments: comment._id },
        });
        res.status(200).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};
export {
    getCommentsByPostId,
    getCommentsByParentId,
    createComment,
};

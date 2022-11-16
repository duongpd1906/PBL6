import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Like from "../models/Like.js";
import { StatusCodes } from "http-status-codes";

const createLike = async (req, res) => {
    try {
        if(!req.body.postId && !req.body.commentId){
            res.status(403).json("Something were wrong, can't like");
        }
        const newLike =new Like({
            post: req.body.postId,
            user: req.user.userId,
            comment: req.body.commentId,
        })
        if(req.body.commentId){
            const comment = await Comment.findOne({_id: req.body.commentId});
            if(!comment.likes.includes(req.user.userId)){
                const like = await newLike.save();
                await comment.updateOne({$push: { likes: req.user.userId }});
                res.status(200).json("Like comment success");
            }
            else {
                const like = await Like.findOne({comment: req.body.commentId});
                await comment.updateOne({$pull: { likes: req.user.userId }});
                await like.remove();
                res.status(200).json("Unlike comment success");
            }
        }
        if(req.body.postId){
            const post = await Post.findOne({_id: req.body.postId});
            if(!post.likes.includes(req.user.userId)){
                const like = await newLike.save();
                await post.updateOne({$push: { likes: req.user.userId }});
                res.status(200).json("Like post success");
            }
            else {
                const like = await Like.findOne({post: req.body.postId});
                await post.updateOne({$pull: { likes: req.user.userId }});
                await like.remove();
                res.status(200).json("Unlike post success");
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};
export {
    createLike,
};

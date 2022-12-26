import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: [true, "Please provide post"],
    },
    commenter: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    status: {
        type: String,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    parentId: {
        type: String,
    },
    comments: {
        type: Array,
        default: [],
    },
    likes: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Comment", CommentSchema);

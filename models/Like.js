import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    comment: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Like", LikeSchema);

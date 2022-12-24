import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    text: {
        type: String,
    },
    status: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    images: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    beSaved: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", PostSchema);

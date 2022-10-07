import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const update_user_avatar = async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user.userId });
        currentUser.avatar =
            "http://127.0.0.1:5000/images/" + req.file.filename;
        await User.findOneAndUpdate(
            { _id: req.user.userId },
            { $set: currentUser },
            {
                new: true,
            }
        );
        res.status(StatusCodes.OK).json(currentUser);
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export { update_user_avatar };

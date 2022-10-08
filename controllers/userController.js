import { StatusCodes } from "http-status-codes";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

const updateUserAvatar = async (req, res) => {
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

const sendInvitation = async (req, res) => {
    try {
        const friend = await Profile.findOne({ user: req.body.userId });
        const me = await Profile.findOne({ user: req.user.userId });
        if (!me.invitation_send.includes(req.body.userId)) {
            await me.updateOne({ $push: { invitation_send: req.body.userId } });
            await friend.updateOne({
                $push: { invitation_receive: req.user.userId },
            });
            res.status(200).json("Send invitation success");
        } else {
            await me.updateOne({ $pull: { invitation_send: req.body.userId } });
            await friend.updateOne({
                $pull: { invitation_receive: req.user.userId },
            });
            res.status(200).json("Cancel invitation success");
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};
const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userProfile = await Profile.findOne({ user: req.params.id });
        res.status(StatusCodes.OK).json({user, userProfile});
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export { updateUserAvatar, sendInvitation, getProfileById };

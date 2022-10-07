import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

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
        res.status(StatusCodes.OK).json(currentUser.avatar);
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const get_my_profile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId,
        }).populate("user", ["username", "avatar"]);

        if (!profile) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "There is no profile for this user" });
        }

        res.status(StatusCodes.OK).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const edit_profile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.userId });
        if (!profile) {
            const profile = new Profile({
                user: req.user.userId,
                fullName: req.body.fullName,
                gender: req.body.gender,
                dayOfBirth: req.body.dayOfBirth,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                hobby: req.body.hobby,
            });
            await profile.save();
        }
        await Profile.findOneAndUpdate({ user: req.user.userId }, req.body, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: "edit profile success" });
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export { update_user_avatar, get_my_profile, edit_profile };

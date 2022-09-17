import Account from "../models/Account.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }
    const userAlreadyExists = await Account.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
    }
    const account = await Account.create({ username, email, password });
    const token = account.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            email: account.email,
            username: account.username,
        },
        token,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await Account.findOne({ email }).select("+password");
    if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };

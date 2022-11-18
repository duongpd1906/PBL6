import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    createLike,
} from "../controllers/likeController.js";

router.route("/").post(authenticateUser, createLike);

export default router;

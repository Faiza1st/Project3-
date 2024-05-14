import express from 'express';
import {getUserprofile, followUserUnfollow, getSuggestedUsers, updateUser } from '../controllers/user.js';
import { protectRoute } from "../protectedRoute/protectRoute.js";

const router = express.Router();

router.get("/profile/:username",protectRoute, getUserprofile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUserUnfollow);
router.post("/update", protectRoute, updateUser);

export default router;

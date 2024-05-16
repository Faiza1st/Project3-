import express from 'express';
import { protectRoute } from '../protectedRoute/protectRoute.js';
import {createPost, commentPost, deletePost, likePostUnlike, getAllPosts, followingpost, getLikedPosts, userPosts } from '../controllers/post.js'

const router = express.Router();

router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likePostUnlike) 
router.post("/comment/:id", protectRoute, commentPost)  
router.post("/:id", protectRoute, deletePost) 
router.get("/all", protectRoute, getAllPosts);
router.get("/followingpost", protectRoute, followingpost);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, userPosts);

export default router;
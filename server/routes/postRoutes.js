import express from 'express';
import { protectRoute } from '../protectedRoute/protectRoute';
import {createPost, deletePost, likePostUnlike } from '../controllers/post.js'

const router = express.Router();

router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likePostUnlike) 
// router.post("/comment/:id", commentOnPost)  
router.post("/", protectRoute, deletePost) 

export default router;
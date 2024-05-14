import express from 'express';
import { protectRoute } from '../protectedRoute/protectRoute';
import {createPost, commentPost, deletePost, likePostUnlike } from '../controllers/post.js'

const router = express.Router();

router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likePostUnlike) 
router.post("/comment/:id", protectRoute, commentPost)  
router.post("/:id", protectRoute, deletePost) 

export default router;
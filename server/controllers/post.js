import Post from "../models/post.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
	try {
        //Allow users to create new post with img and text
        //attach the post to the user 
        //create the new post and send it the user 

		// text and img from request body
		const { text } = req.body;
		let { img } = req.body;
		
		const userId = req.user._id.toString();

		// Find user by ID
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		// Check if post has text or image //Send error other wise
		if (!text && !img) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

		// Upload image to cloudinary // cloud data
		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		// Create a new post -> save the post
		const newPost = new Post({
			user: userId,
			text,
			img,
		});
		await newPost.save();
		// Return the newpost
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
		console.log("Error in createPost controller: ", error);
	}
};

export const likePostUnlike = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Not your post to delete" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
        console.log("Error in Delete post controller: ", error);
	}
};

export const commentPost = async (req, res) => {
	try {
		// Extract text -> request body 
        // post ID -> request parameters
		const { text } = req.body;
		const postId = req.params.id;
		// Extract user ID --> authenticated user 
		const userId = req.user._id;

		// Validate the text
		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}
		// Post ID
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Create a new comment object with user ID and text
		const comment = { user: userId, text };

		// Puush to post's comments array -> save
		post.comments.push(comment);
		await post.save();

		res.status(200).json(post);
	} catch (error) {
		console.log("Error in commentOnPost controller")
    }
}
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



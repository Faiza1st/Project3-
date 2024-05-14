
import { v2 as cloudinary } from "cloudinary";
import bcryptjs from "bcryptjs"; 

import User from '../models/user.js'
import Notification from "../models/notification.js";



export const getUserprofile = async (req, res) => {
	const { username } = req.params;

	try {
		const user = await User.findOne({ username }).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getUserProfile: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const followUserUnfollow = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		console.log(req);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			const newNotification = new Notification({
				type: "follow",
				from: req.user._id,
				to: userToModify._id,
			});

			await newNotification.save();
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (error) {
		console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const getSuggestedUsers = async (req, res) => {
	try {
		const userId = req.user._id;

		const myfollowed = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{$match: {_id: { $ne: userId },},},
			{ $sample: { size: 10 } },
		]);

		const excludeUser = users.filter((user) => !myfollowed.following.includes(user._id));
		const suggestUsers = excludeUser.slice(0, 4);

		suggestUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestUsers);
	} catch (error) {
		console.log("Error in getSuggestedUsers: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	//User can update there Name,email,bio,password,profileimage,coverimage
	//if user updates than send new updated info otherwise keep current 
	//verify the password = current password should match the old one
	//cloudinary is used to update and delete photos (can be used to update profile and delete pictures)
	// Destructure relevant data request body
	const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
	// Initialize variables -> profile and cover image 
	let { profileImg, coverImg } = req.body;

	// Get user ID from request object
	const userId = req.user._id;

	try {
		// find the user by  ID
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		// current password and new password are same
		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Provide current password and new password" });
		}

		// current password and new password same -> verify  current password
		if (currentPassword && newPassword) {
			const matching = await bcryptjs.compare(currentPassword, user.password);
			if (!matching) return res.status(400).json({ error: "Current password is wrong" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			
			const salt = await bcryptjs.genSalt(10);
			user.password = await bcryptjs.hash(newPassword, salt);
		}

		// profile image update
		if (profileImg) {
			if (user.profileImg) {
				// existing profile image -> delete it from cloudinary // avoid filling up free storage
				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			// Upload new profile image to cloudinary 
			const userResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = userResponse.secure_url;
		}

		// cover image update
		if (coverImg) {
			if (user.coverImg) {
				// existing cover image, delete it from cloudinary
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			
			const userResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = userResponse.secure_url;
		}

		// Update user information  -> provided data // keep existing data 
		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		
		user = await user.save();
		user.password = null;

		
		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

const express = require("express");
require("dotenv/config");

const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
	try {
		// get all posts of user logined, get email of user
		const posts = await Post.find({ user: req.userId }).populate("user", ["username"]);
		res.json({ success: true, posts: posts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
	}
});

// @route POST api/posts
// @desc Create post
// @access Private
// verify la phai login moi create dc
router.post("/", verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body;

	// validation
	if (!title) return res.status(400).json({ success: false, message: "Title is required!" });

	try {
		const newPost = new Post({
			title: title,
			description: description,
			url: url != null ? (url.startsWith("https://") ? url : "https://" + url) : "",
			status: status || "To Learn",
			user: req.userId,
		});
		await newPost.save();
		res.json({ success: true, message: "Add successfully!", post: newPost });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
	}
});

// @route PUT api/posts
// @desc update posts
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body;

	// validation
	if (!title) return res.status(400).json({ success: false, message: "Title is required!" });

	try {
		let updatedPost = {
			title: title,
			description: description || "",
			url: url != null ? (url.startsWith("https://") ? url : "https://" + url) : "",
			status: status || "To Learn",
		};
		const postUpdateCondition = { _id: req.params.id, user: req.userId };
		updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });

		// user not authorized to update post or post not found
		if (!updatedPost)
			return res
				.status(500)
				.json({ success: false, message: "Post not found or user not authorized" });

		res.json({ success: true, messsage: "Excellent Process!", post: updatedPost });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
	}
});

// @route DELETE api/posts
// @desc delete posts
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId };
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

		// user not authorized or post not found
		if (!deletedPost)
			return res
				.status(500)
				.json({ success: false, message: "Post not found or user not authorized" });

		res.json({ success: true, messsage: "Deleted successfull!", post: deletedPost });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
	}
});

module.exports = router;

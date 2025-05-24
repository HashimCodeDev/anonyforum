const Thread = require("../models/Thread");
const Post = require("../models/Post");

// Create a new thread (reply to post)
const createThread = async (req, res) => {
	try {
		const { postId, content } = req.body;

		if (!postId || !content)
			return res
				.status(400)
				.json({ error: "Post ID and content are required" });

		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		const thread = await Thread.create({ postId, content });
		res.status(201).json(thread);
	} catch (err) {
		res.status(500).json({ error: "Server error while creating thread" });
	}
};

// Get all threads for a post
const getThreadsByPost = async (req, res) => {
	try {
		const { postId } = req.params;
		const threads = await Thread.find({ postId }).sort({ createdAt: 1 });

		res.status(200).json(threads);
	} catch (err) {
		res.status(500).json({ error: "Server error while fetching threads" });
	}
};

module.exports = {
	createThread,
	getThreadsByPost,
};

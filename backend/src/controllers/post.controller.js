const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
	try {
		const { title, content } = req.body;
		console.log("Received post data:", req.body);

		if (!title || !content)
			return res.status(400).json({ error: "Title and content are required" });

		console.log("Creating post with title:", title, "and content:", content);

		const post = await Post.create({ title, content });
		res.status(201).json(post);
	} catch (err) {
		res.status(500).json({ error: "Server error while creating post" });
	}
};

// Get all posts
const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ upvotes: -1, createdAt: -1 }); // Sort by upvotes and then by creation date

		res.status(200).json({
			posts,
			count: posts.length,
			message: "Posts fetched successfully",
		});
	} catch (err) {
		res.status(500).json({ error: "Server error while fetching posts" });
	}
};

// Get a single post by ID
const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: "Server error while fetching post" });
	}
};

const getPostCount = async (req, res) => {
	try {
		const count = await Post.countDocuments();
		res
			.status(200)
			.json({ count, message: "Total post count fetched successfully" });
	} catch (err) {
		res.status(500).json({ error: "Server error while fetching post count" });
	}
};

const votePost = async (req, res) => {
	const { postId, voteType } = req.body;

	if (!postId || !voteType) {
		return res
			.status(400)
			.json({ error: "Post ID and vote type are required" });
	}

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		switch (voteType) {
			case "up":
				if (post.voteType === "neutral") {
					post.upvotes += 1;
					post.voteType = "up";
				} else if (post.voteType === "down") {
					post.upvotes += 1;
					post.downvotes -= 1;
					post.voteType = "up";
				} else if (post.voteType === "up") {
					post.upvotes -= 1;
					post.voteType = "neutral";
				}
				break;
			case "down":
				if (post.voteType === "neutral") {
					post.downvotes += 1;
					post.voteType = "down";
				} else if (post.voteType === "up") {
					post.downvotes += 1;
					post.upvotes -= 1;
					post.voteType = "down";
				} else if (post.voteType === "down") {
					post.downvotes -= 1;
					post.voteType = "neutral";
				}
				break;
			default:
				return res.status(400).json({ error: "Invalid vote type" });
		}

		await post.save();
		res.status(200).json({ message: "Vote updated successfully", post });
	} catch (err) {
		res.status(500).json({ error: "Server error while voting on post" });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	votePost,
	getPostCount,
};

const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
	try {
		const { title, content } = req.body;

		if (!title || !content)
			return res.status(400).json({ error: "Title and content are required" });

		const post = await Post.create({ title, content });
		res.status(201).json(post);
	} catch (err) {
		res.status(500).json({ error: "Server error while creating post" });
	}
};

// Get all posts
const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		res.status(200).json(posts);
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

const upvotePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });

		post.upvotes += 1;
		await post.save();

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: "Server error while upvoting post" });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	upvotePost,
};

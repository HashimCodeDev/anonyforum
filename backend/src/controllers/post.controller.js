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
		const sortBy = req.query.sortBy || "trending"; // Default sort by creation date
		let posts = [];

		switch (sortBy) {
			case "trending":
				posts = await Post.find().sort({
					upvotes: -1,
					downvotes: 1,
				}); // Sort by upvotes and then by creation date
				break;
			case "newest":
				posts = await Post.find().sort({ createdAt: -1 }); // Newest posts: sort by creation date in descending order
				break;
			case "oldest":
				posts = await Post.find().sort({ createdAt: 1 }); // Oldest posts: sort by creation date in ascending order
				break;
			default:
				return res.status(400).json({ error: "Invalid sort option" });
		}
		res.status(200).json({
			posts,
			count: posts.length,
			message: "Posts fetched successfully",
		});
	} catch (err) {
		res.status(500).json({ error: "Server error while fetching posts" });
		console.error("Error fetching posts:", err.message);
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
	const { postId, voteType, anonId } = req.body;

	if (!postId || !voteType) {
		return res
			.status(400)
			.json({ error: "Post ID and vote type are required" });
	}

	if (!anonId) {
		return res
			.status(400)
			.json({ error: "Anonymous ID is required for voting" });
	}

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		// Check if the user has already voted
		const existingVote = post.votes.find((vote) => vote.anonId === anonId);

		if (existingVote) {
			// If same vote again, remove vote
			if (existingVote.voteType === voteType) {
				post.votes = post.votes.filter((v) => v.anonId !== anonId);
				if (voteType === "up") {
					post.upvotes -= 1;
				} else if (voteType === "down") {
					post.downvotes -= 1;
				}
				return res
					.status(200)
					.json({ message: "Vote removed successfully", post });
			} else {
				// Change vote type to the new one and update vote count
				existingVote.voteType = voteType;
				if (voteType === "up") {
					post.upvotes += 1;
					post.downvotes -= 1;
				} else if (voteType === "down") {
					post.downvotes += 1;
					post.upvotes -= 1;
				}
			}
		} else {
			// Add new vote and update vote count
			post.votes.push({ anonId, voteType });
			if (voteType === "up") {
				post.upvotes += 1;
			} else if (voteType === "down") {
				post.downvotes += 1;
			}
		}

		await post.save();
		res.status(200).json({ message: "Vote updated successfully", post });
	} catch (err) {
		res.status(500).json({ error: "Server error while voting on post" });
	}
};

const createReply = async (req, res) => {
	const { postId, reply } = req.body;

	if (!postId || !reply) {
		return res.status(400).json({ error: "Post ID and reply are required" });
	}

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		post.reply = reply;
		await post.save();

		res.status(200).json({ message: "Reply added successfully", post });
	} catch (err) {
		res.status(500).json({ error: "Server error while adding reply" });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	votePost,
	getPostCount,
	createReply,
};

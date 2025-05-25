const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPosts,
	getPostById,
	getPostCount,
	votePost,
	createReply,
} = require("../controllers/post.controller");

router.post("/createPost", createPost); // create new post
router.get("/getAllPosts", getAllPosts); // list all posts
router.get("/:id", getPostById); // view one post
router.get("/getPostCount", getPostCount); // get total post count
router.put("/vote", votePost); // upvote or downvote post
router.put("/createReply", createReply); // create reply to a post

module.exports = router;

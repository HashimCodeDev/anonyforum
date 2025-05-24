const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPosts,
	getPostById,
	upvotePost,
} = require("../controllers/post.controller");

router.post("/createPost", createPost); // create new post
router.get("/getAllPosts", getAllPosts); // list all posts
router.get("/:id", getPostById); // view one post
router.post("/upvotePost/:id", upvotePost); // upvote a post"

module.exports = router;

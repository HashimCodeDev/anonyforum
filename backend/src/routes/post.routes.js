const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPosts,
	getPostById,
	upvotePost,
	downvotePost,
	upvoteUpdate,
	downvoteUpdate,
	getPostCount,
} = require("../controllers/post.controller");

router.post("/createPost", createPost); // create new post
router.get("/getAllPosts", getAllPosts); // list all posts
router.get("/:id", getPostById); // view one post
router.get("/getPostCount", getPostCount); // get total post count
router.put("/upvotePost/:id", upvotePost); // upvote a post"
router.put("/downvotePost/:id", downvotePost); // downvote a post
router.put("/upvoteUpdate/:id", upvoteUpdate); // update upvote count
router.put("/downvoteUpdate/:id", downvoteUpdate); // update downvote count

module.exports = router;

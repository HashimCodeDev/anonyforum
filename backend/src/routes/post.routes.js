const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPosts,
	getPostById,
} = require("../controllers/post.controller");

router.post("/createPost", createPost); // create new post
router.get("/getAllPosts", getAllPosts); // list all posts
router.get("/:id", getPostById); // view one post

module.exports = router;

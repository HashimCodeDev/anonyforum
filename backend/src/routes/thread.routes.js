const express = require("express");
const router = express.Router();
const {
	createThread,
	getThreadsByPost,
} = require("../controllers/thread.controller");

router.post("/createThread", createThread); // reply to post
router.get("/post/:postId", getThreadsByPost); // get replies

module.exports = router;

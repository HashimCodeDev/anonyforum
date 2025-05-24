const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: true,
	},
	parentThreadId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Thread",
		default: null, // null means it's a direct reply to the post
	},
	content: {
		type: String,
		required: true,
		trim: true,
		maxlength: 5000,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Thread", threadSchema);

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		maxlength: 150,
	},
	content: {
		type: String,
		required: true,
		trim: true,
		maxlength: 10000,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Post", postSchema);

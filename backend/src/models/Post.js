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
	upvotes: {
		type: Number,
		default: 0,
	},
	downvotes: {
		type: Number,
		default: 0,
	},
	votes: [
		{
			anonId: String,
			voteType: { type: String, enum: ["up", "down", "neutral"] },
		},
	],

	reply: {
		type: String,
		default: "",
	},
	status: {
		type: String,
		enum: ["active", "archived", "deleted"],
		default: "active",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Post", postSchema);

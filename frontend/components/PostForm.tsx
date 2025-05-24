"use client";
import { useState } from "react";
import axios from "axios";

export default function PostForm() {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

	const handleSubmit = async () => {
		if (!content.trim()) {
			setMessage("Content cannot be empty.");
			return;
		}

		try {
			setLoading(true);
			const response = await axios.post(`${backendUrl}/api/posts/createPost`, {
				title: "Anonymous",
				content: content.trim(),
			});

			if (response.data?.message) {
				setMessage(response.data.message);
				setContent("");
			}
		} catch (err) {
			console.error("Error posting:", err);
			setMessage("Failed to create post.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="mb-8 bg-white border border-[#9B9B9B] rounded-md px-6 py-4 shadow-sm">
			<div className="w-full h-[40px] bg-[#E6E6E6] rounded-md mb-3"></div>

			<textarea
				className="w-full border border-[#7A7A7A] rounded-md p-3 text-sm text-black resize-none h-28 placeholder:text-[#9E9E9E]"
				placeholder="SHARE YOUR STATEMENT / CONCERNS / QUESTIONS"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			></textarea>

			<div className="mt-4 flex items-center justify-between">
				<button
					className="text-xs bg-[#2563EB] text-white px-4 py-1 rounded-md font-medium disabled:opacity-50"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? "Posting..." : "POST ANONYMOUSLY"}
				</button>
				<button className="text-lg bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
					+
				</button>
			</div>

			{message && <p className="text-xs mt-2 text-[#2563EB]">{message}</p>}
		</section>
	);
}

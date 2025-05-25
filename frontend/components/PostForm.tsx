"use client";
import { useState } from "react";
import axios from "axios";
import generateRandomName from "@/utils/NameGenerator";

export default function PostForm() {
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "https://anonyforum.onrender.com";

	const handleSubmit = async () => {
		if (!content.trim()) {
			setMessage("Content cannot be empty.");
			return;
		}

		try {
			setLoading(true);
			const response = await axios.post(`${backendUrl}/api/posts/createPost`, {
				title: name.trim() || generateRandomName() || "Anonymous",
				content: content.trim(),
			});

			setContent("");
			setMessage("Post created successfully!");

			if (response.data?.message) {
				setMessage(response.data.message);
				setContent("");
			}
			setTimeout(() => {
				setMessage("");
			}, 3000);
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
			<div className="text-xs text-[#7A7A7A] mb-2 flex flex-col gap-2">
				<input
					type="text"
					className="w-full border border-[#7A7A7A] rounded-md p-3 text-sm text-black placeholder:text-[#9E9E9E]"
					value={name}
					placeholder="Random name or word that pops up (Optional)"
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					className="w-full border border-[#7A7A7A] rounded-md p-3 text-sm text-black resize-none h-28 placeholder:text-[#9E9E9E]"
					placeholder="SHARE YOUR STATEMENT / CONCERNS / QUESTIONS"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></textarea>
			</div>

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

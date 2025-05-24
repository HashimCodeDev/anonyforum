"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
	_id: string;
	title: string;
	content: string;
	upvotes: number;
	createdAt: string;
};

export default function PostList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = () => {
		axios
			.get("http://localhost:5000/api/posts/getAllPosts")
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				console.error("Failed to fetch posts:", err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		// Fetch immediately once
		fetchPosts();

		// Set interval to fetch every 20 seconds
		const interval = setInterval(fetchPosts, 20000);

		// Cleanup on unmount
		return () => clearInterval(interval);
	}, []);

	const upvotePost = async (postId: string) => {
		const votedPosts = JSON.parse(localStorage.getItem("votedPosts") || "[]");

		if (votedPosts.includes(postId)) {
			return;
		}
		try {
			const response = await axios.post(
				`http://localhost:5000/api/posts/upvotePost/${postId}`
			);
			votedPosts.push(postId);
			localStorage.setItem("votedPosts", JSON.stringify(votedPosts));
			fetchPosts(); // Refresh posts after upvote
			return response.data;
		} catch (error) {
			console.error("Error upvoting post:", error);
			throw error;
		}
	};

	return (
		<section className="pt-2">
			<h2 className="text-xs font-semibold mb-4 uppercase tracking-wide text-[#1A1A1A] bg-[#D7EAFE] inline-block px-3 py-1 rounded-md">
				OPEN BOARD
			</h2>

			{loading && <p className="text-sm text-gray-600">Loading posts...</p>}

			{posts.map((post) => (
				<div
					key={post._id}
					className="mb-8 bg-white border border-[#9B9B9B] rounded-md p-4"
				>
					<p className="text-xs text-[#7A7A7A] mb-1">
						{new Date(post.createdAt).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
					<div className="border border-[#C5C5C5] rounded-md p-3 mb-2">
						<p className="text-base text-black font-bold uppercase">
							{post.title}
						</p>
					</div>
					<span className="inline-block text-xs bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full font-medium">
						{post._id.slice(-2)}
					</span>
					<p className="mt-2 text-sm text-[#2A2A2A] leading-snug">
						{post.content}
					</p>
					<div className="mt-2 flex items-center space-x-3 justify-start">
						<button
							className="text-xs bg-[#2563EB] text-white px-3 py-1 rounded-md font-medium"
							onClick={() => upvotePost(post._id)}
						>
							<img
								src="/upvote-icon.svg"
								alt="Upvote"
								className="inline-block mr-1"
								width={16}
								height={16}
							/>
							Upvote
						</button>
						<p className="mt-2 text-xs text-[#7A7A7A] self-center">
							Upvotes {post.upvotes}
						</p>
					</div>
				</div>
			))}
		</section>
	);
}

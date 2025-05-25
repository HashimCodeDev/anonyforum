"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronUp, ChevronDown } from "lucide-react";

type Post = {
	_id: string;
	title: string;
	content: string;
	upvotes: number;
	downvotes: number;
	userVote: "up" | "down" | "neutral" | null;
	reply: string;
	createdAt: string;
};

export default function PostList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [sortBy, setSortBy] = useState("trending");
	const [reply, setReply] = useState<{ [key: string]: string }>({});
	const [message, setMessage] = useState<string | null>(null);
	const [admin, setAdmin] = useState<boolean>(false);

	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "https://anonyforum.onrender.com";

	const fetchPosts = () => {
		try {
			axios
				.get(`${backendUrl}/api/posts/getAllPosts?sortBy=${sortBy}`)
				.then((res) => {
					if (!res.data) {
						return console.log("No posts:", res.data.posts);
					}
					setPosts(res.data.posts);
					localStorage.setItem("length", res.data.count);
				})
				.catch((err) => {
					console.error("Failed to fetch posts:", err);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			console.error("Error fetching posts:", error.message);
		}
	};

	useEffect(() => {
		fetchPosts();
		const interval = setInterval(fetchPosts, 20000);
		return () => clearInterval(interval);
	}, [sortBy]);

	const handleVote = async (postId: string, voteType: "up" | "down") => {
		try {
			// Load local vote data
			const localVotes = JSON.parse(localStorage.getItem("userVotes") || "{}");
			const userVote = localVotes[postId] || null;

			const updatedPosts = posts.map((post) => {
				if (post._id === postId) {
					let newUpvotes = post.upvotes;
					let newDownvotes = post.downvotes;
					let newUserVote = voteType;

					if (userVote === voteType) {
						// Unvote
						newUserVote = null;
						if (voteType === "up") newUpvotes--;
						else newDownvotes--;
					} else if (userVote) {
						// Switch vote
						if (userVote === "up") {
							newUpvotes--;
							newDownvotes++;
						} else {
							newDownvotes--;
							newUpvotes++;
						}
					} else if (!userVote) {
						// First-time vote
						if (voteType === "up") newUpvotes++;
						else newDownvotes++;
					}

					// Save locally
					const newVotes = { ...localVotes, [postId]: newUserVote };
					if (!newUserVote) delete newVotes[postId]; // Remove if unvoted
					localStorage.setItem("userVotes", JSON.stringify(newVotes));

					return {
						...post,
						upvotes: newUpvotes,
						downvotes: newDownvotes,
						userVote: newUserVote,
					};
				}
				return post;
			});

			setPosts(updatedPosts);

			// Backend call
			const response = await axios.put(`${backendUrl}/api/posts/vote`, {
				postId,
				voteType,
			});

			// Final sync
			fetchPosts();
		} catch (err) {
			console.error("Error voting:", err);
			fetchPosts();
		}
	};

	const handleReply = async (postId: string) => {
		const content = reply[postId];
		if (!content?.trim()) return;
	};

	const handleSortChange = (newSortBy: string) => {
		setSortBy(newSortBy);
		const sortedPosts = [...posts].sort((a, b) => {
			if (newSortBy === "trending") {
				return b.upvotes - a.upvotes; // Sort by upvotes for trending
			} else if (newSortBy === "newest") {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				); // Sort by newest
			}
			return 0;
		});
		setPosts(sortedPosts);
		localStorage.setItem("sortBy", newSortBy);
		localStorage.setItem("posts", JSON.stringify(sortedPosts));
		localStorage.setItem("length", String(sortedPosts.length));
	};

	return (
		<section className="pt-2">
			<h2 className="text-xs font-semibold mb-4 uppercase tracking-wide text-[#1A1A1A] bg-[#D7EAFE] inline-block px-3 py-1 rounded-md">
				OPEN BOARD
			</h2>

			{loading && <p className="text-sm text-gray-600">Loading posts...</p>}
			{loading && <p className="text-sm text-gray-600">Loading posts...</p>}

			{/* Sort Controls */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => handleSortChange("trending")}
						disabled={loading}
						className={`px-4 py-2 rounded-lg text-sm font-medium ${
							sortBy === "trending"
								? "bg-blue-100 text-blue-700"
								: "text-gray-600 hover:bg-gray-100"
						} disabled:opacity-50`}
					>
						🔥 Trending
					</button>
					<button
						onClick={() => handleSortChange("newest")}
						disabled={loading}
						className={`px-4 py-2 rounded-lg text-sm font-medium ${
							sortBy === "newest"
								? "bg-blue-100 text-blue-700"
								: "text-gray-600 hover:bg-gray-100"
						} disabled:opacity-50`}
					>
						🕐 Newest
					</button>
				</div>
				{loading && (
					<div className="flex items-center text-sm text-gray-500">
						Refreshing...
					</div>
				)}
			</div>

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
					{/* Voting and Actions */}
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-1">
								<button
									onClick={() => handleVote(post._id, "up")}
									className={`p-2 rounded-lg transition-colors ${
										post.userVote === "up"
											? "bg-green-100 text-green-600"
											: "hover:bg-gray-100 text-gray-500"
									}`}
								>
									<ChevronUp className="w-5 h-5" />
								</button>
								<span className="font-medium text-gray-700 min-w-[2rem] text-center">
									{post.upvotes - post.downvotes}
								</span>
								<button
									onClick={() => handleVote(post._id, "down")}
									className={`p-2 rounded-lg transition-colors ${
										post.userVote === "down"
											? "bg-red-100 text-red-600"
											: "hover:bg-gray-100 text-gray-500"
									}`}
								>
									<ChevronDown className="w-5 h-5" />
								</button>
							</div>
						</div>
						<p className="text-xs text-[#7A7A7A] self-center"></p>
					</div>

					{/* Display replies (if any) */}
					{post.reply && post.reply.length > 0 && (
						<div className="mt-4 space-y-2">
							<div
								key={reply._id}
								className="bg-[#D7EAFE] text-[#2563EB] text-sm rounded-md px-3 py-2"
							>
								<p className="font-bold text-xs mb-1">ADMIN</p>
								<p className="text-xs">{reply.content}</p>
							</div>
						</div>
					)}

					{/* Reply box - for admin use only */}
					{admin && (
						<div className="mt-4">
							<textarea
								className="w-full border border-[#CCCCCC] rounded-md p-2 text-xs"
								placeholder="Write a reply as admin..."
								value={reply[post._id] || ""}
								onChange={(e) =>
									setReply((prev) => ({ ...prev, [post._id]: e.target.value }))
								}
							></textarea>
							<button
								className="mt-2 bg-green-600 text-white text-xs px-4 py-1 rounded-md"
								onClick={() => handleReply(post._id)}
							>
								Post Reply
							</button>
							{message && (
								<p className="text-xs text-green-600 mt-1">{message}</p>
							)}
						</div>
					)}
				</div>
			))}
		</section>
	);
}

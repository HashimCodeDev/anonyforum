"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Reply = {
  _id: string;
  content: string;
  createdAt: string;
};

type Post = {
  _id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies?: Reply[];
};

export default function PostList() {
<<<<<<< HEAD
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<string>("");
=======
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [reply, setReply] = useState<{ [key: string]: string }>({});
	const [message, setMessage] = useState<string>("");
>>>>>>> 94bf5e6920c81c7fab9b205430fb4d9e0f595d60

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
    fetchPosts();
    const interval = setInterval(fetchPosts, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (postId: string, type: "upvote" | "downvote") => {
    const storageKey = type === "upvote" ? "votedPosts" : "downvotedPosts";
    const votedPosts = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (votedPosts.includes(postId)) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/${type}Post/${postId}`);
      votedPosts.push(postId);
      localStorage.setItem(storageKey, JSON.stringify(votedPosts));
      fetchPosts();
    } catch (error) {
      console.error(`Error ${type}ing post:`, error);
    }
  };

<<<<<<< HEAD
  const handleReply = async (postId: string) => {
    const content = reply[postId];
    if (!content?.trim()) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/addReply/${postId}`, {
        content,
      });
      setReply((prev) => ({ ...prev, [postId]: "" }));
      setMessage("Reply posted successfully.");
      fetchPosts();
    } catch (error) {
      console.error("Failed to post reply:", error);
      setMessage("Failed to post reply.");
    }
  };

  return (
    <section className="pt-2">
      <h2 className="text-xs font-semibold mb-4 uppercase tracking-wide text-[#1A1A1A] bg-[#D7EAFE] inline-block px-3 py-1 rounded-md">
        OPEN BOARD
      </h2>
=======
		const alreadyVoted = votedPosts.includes(postId);
		const alreadyReverseVoted = reversePosts.includes(postId);

		try {
			if (alreadyVoted) {
				// ❌ Remove vote
				await axios.put(
					`http://localhost:5000/api/posts/${type}Update/${postId}`
				);
				localStorage.setItem(
					storageKey,
					JSON.stringify(votedPosts.filter((id: string) => id !== postId))
				);
				console.log(`${type} removed`);
			} else {
				// 🔁 Remove opposite vote if exists
				if (alreadyReverseVoted) {
					await axios.put(
						`http://localhost:5000/api/posts/${
							type === "upvote" ? "downvote" : "upvote"
						}Update/${postId}`
					);
					localStorage.setItem(
						reverseKey,
						JSON.stringify(reversePosts.filter((id: string) => id !== postId))
					);
				}
>>>>>>> 94bf5e6920c81c7fab9b205430fb4d9e0f595d60

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
            <p className="text-base text-black font-bold uppercase">{post.title}</p>
          </div>
          <span className="inline-block text-xs bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full font-medium">
            {post._id.slice(-2)}
          </span>
          <p className="mt-2 text-sm text-[#2A2A2A] leading-snug">{post.content}</p>

          {/* Upvote/Downvote */}
          <div className="mt-2 flex items-center space-x-3 justify-start">
            <button
              className="text-xs bg-[#2563EB] text-white px-3 py-1 rounded-md font-medium"
              onClick={() => handleVote(post._id, "upvote")}
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
            <p className="text-xs text-[#7A7A7A] self-center">
              Upvotes {post.upvotes}
            </p>

<<<<<<< HEAD
            <button
              className="text-xs bg-red-500 text-white px-3 py-1 rounded-md font-medium"
              onClick={() => handleVote(post._id, "downvote")}
            >
              <img
                src="/downvote-icon.svg"
                alt="Downvote"
                className="inline-block mr-1"
                width={16}
                height={16}
              />
              Downvote
            </button>
            <p className="text-xs text-[#7A7A7A] self-center">
              Downvotes {post.downvotes}
            </p>
          </div>

          {/* Display replies (if any) */}
          {post.replies && post.replies.length > 0 && (
            <div className="mt-4 space-y-2">
              {post.replies.map((reply) => (
                <div
                  key={reply._id}
                  className="bg-[#D7EAFE] text-[#2563EB] text-sm rounded-md px-3 py-2"
                >
                  <p className="font-bold text-xs mb-1">ADMIN</p>
                  <p className="text-xs">{reply.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply box - for admin use only */}
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
            {message && <p className="text-xs text-green-600 mt-1">{message}</p>}
          </div>
        </div>
      ))}
    </section>
  );
=======
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
							onClick={() =>
								handleVote(post.upvotes, post.downvotes, post._id, "upvote")
							}
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
						<p className="text-xs text-[#7A7A7A] self-center">
							Upvotes {post.upvotes}
						</p>

						<button
							className="text-xs bg-red-500 text-white px-3 py-1 rounded-md font-medium"
							onClick={() =>
								handleVote(post.upvotes, post.downvotes, post._id, "downvote")
							}
						>
							<img
								src="/downvote-icon.svg"
								alt="Downvote"
								className="inline-block mr-1"
								width={16}
								height={16}
							/>
							Downvote
						</button>
						<p className="text-xs text-[#7A7A7A] self-center"></p>
					</div>
				</div>
			))}
		</section>
	);
>>>>>>> 94bf5e6920c81c7fab9b205430fb4d9e0f595d60
}

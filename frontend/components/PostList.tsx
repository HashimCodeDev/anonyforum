"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getAllPosts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
            <p className="text-base text-black font-bold uppercase">{post.title}</p>
          </div>
          <span className="inline-block text-xs bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full font-medium">
            {post._id.slice(-2)}
          </span>
          <p className="mt-2 text-sm text-[#2A2A2A] leading-snug">{post.content}</p>
        </div>
      ))}
    </section>
  );
}

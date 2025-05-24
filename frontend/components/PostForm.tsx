"use client";

export default function PostForm() {
  return (
    <section className="mb-8 bg-white border border-[#9B9B9B] rounded-md px-6 py-4 shadow-sm">
      {/* Placeholder for chat image */}
      <div className="w-full h-[40px] bg-[#E6E6E6] rounded-md mb-3"></div>

      <textarea
        className="w-full border border-[#7A7A7A] rounded-md p-3 text-sm text-black resize-none h-28 placeholder:text-[#9E9E9E]"
        placeholder="SHARE YOUR STATEMENT / CONCERNS / QUESTIONS"
      ></textarea>

      <div className="mt-4 flex items-center justify-between">
        <button className="text-xs bg-[#2563EB] text-white px-4 py-1 rounded-md font-medium">
          POST ANONYMOUSLY
        </button>
        <button className="text-lg bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
          +
        </button>
      </div>
    </section>
  );
}
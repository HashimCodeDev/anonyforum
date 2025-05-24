import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F2F6FB] text-black font-sans px-8 pt-6 max-w-4xl mx-auto">
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#1A1A1A]">Community Voices</h1>
          <p className="text-sm text-[#6A6A6A] mt-1">open dialouge for mental health</p>
        </div>
        <div className="text-[12px] font-semibold bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full h-fit">
          post counts: 001
        </div>
      </header>

      <PostForm />
      <PostList />
    </main>
  );
}

import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-[#F2F6FB] text-black font-sans px-8 pt-6 max-w-4xl mx-auto">
			<header className="mb-4 flex items-start justify-between">
				<div>
					<div className="flex items-center space-x-2 mb-1">
						<svg
							width="64px"
							height="64px"
							viewBox="-4.8 -4.8 33.60 33.60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#004cff"
							transform="rotate(0)"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="0.24000000000000005"
							></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
									stroke="#0076d1"
									strokeWidth="0.8640000000000001"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>{" "}
							</g>
						</svg>
						<h1 className="text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
							Community Voices
						</h1>
					</div>
					<p className="text-sm text-[#6A6A6A] mt-1">
						Anonymous forum for open dialogue
					</p>
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

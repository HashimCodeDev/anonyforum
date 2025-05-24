export default function PostList() {
	return (
		<section className="pt-2">
			<h2 className="text-xs font-semibold mb-4 uppercase tracking-wide text-[#1A1A1A] bg-[#D7EAFE] inline-block px-3 py-1 rounded-md">
				OPEN BOARD
			</h2>

			{/* Post 1 */}
			<div className="mb-8 bg-white border border-[#9B9B9B] rounded-md p-4">
				<p className="text-xs text-[#7A7A7A] mb-1">2 hrs ago</p>
				<div className="border border-[#C5C5C5] rounded-md p-3">
					<p className="text-base text-black">
						How can one deal with burnouts effectively?
					</p>
				</div>
				<span className="inline-block mt-2 text-xs bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full font-medium">
					21
				</span>
			</div>

			{/* Post 2 */}
			<div className="mb-8 bg-white border border-[#9B9B9B] rounded-md p-4">
				<p className="text-xs text-[#7A7A7A] mb-1">4 hrs ago</p>
				<div className="border border-[#C5C5C5] rounded-md p-3 mb-3">
					<p className="text-base text-black font-bold uppercase">
						HOW TO MASTER PUBLIC SPEAKING?
					</p>
				</div>
				<span className="inline-block mb-2 text-xs bg-[#D7EAFE] text-[#2563EB] px-3 py-[2px] rounded-full font-medium">
					25
				</span>
				<p className="text-sm font-bold text-[#2563EB] bg-[#D7EAFE] inline-block px-3 py-[2px] rounded-md mb-1">
					ATHULYA
				</p>
				<p className="text-sm text-[#2A2A2A] leading-snug">
					Great question! Here are some proven techniques: <br />
					1) Practice deep breathing exercises, 2) Prepare thoroughly and
					practice your speech multiple times,
					<br />
					3) Start with friendly faces in the audience, 4) Use positive
					visualization techniques.
				</p>
			</div>
		</section>
	);
}

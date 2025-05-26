export default function timeAgo(date: string | Date) {
	const now = new Date();
	const past = new Date(date);
	const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	const intervals = [
		{ label: "y", seconds: 31536000 },
		{ label: "mo", seconds: 2592000 },
		{ label: "w", seconds: 604800 },
		{ label: "d", seconds: 86400 },
		{ label: "h", seconds: 3600 },
		{ label: "m", seconds: 60 },
		{ label: "s", seconds: 1 },
	];

	for (let i = 0; i < intervals.length; i++) {
		const interval = intervals[i];
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count}${interval.label}`;
		}
	}

	return "just now";
}

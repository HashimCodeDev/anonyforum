# 🕵️‍♂️ AnonyForum

AnonyForum is a fully anonymous, real-time discussion platform built with **Next.js** and **Node.js**. Users can post, upvote, or downvote without authentication — keeping things simple and chaotic 😈. Ideal for college communities, tech talk, hot takes, and meme wars.

## 🚀 Features

- 🔒 Fully anonymous – no login required
- 💬 Create posts with markdown-supported content
- 👍👎 Toggle upvotes/downvotes (one per user using `localStorage`)
- 🕓 Auto-refresh every 20 seconds for real-time vibe
- 📦 Admin panel for content moderation (via protected route)
- 🪄 Modern UI with responsive design
- 🔔 Toast notifications for feedback instead of ugly `alert()`

## 🛠 Tech Stack

**Frontend**:

- [Next.js 14+](https://nextjs.org/)
- React Hooks + Context API
- Axios for HTTP requests
- Tailwind CSS for styling

**Backend**:

- Node.js + Express
- MongoDB (via Mongoose)
- REST API with CRUD endpoints

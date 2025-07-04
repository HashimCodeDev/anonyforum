const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/post.routes");
dotenv.config();

// CORS configuration
const allowedOrigins =
	process.env.FRONTEND_URL || "https://anonyforum.vercel.app/";

// Middleware
// app.use(
// 	cors({
// 		origin: allowedOrigins,
// 		credentials: true,
// 	})
// );
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

// DB Connection
require("./config/db")();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

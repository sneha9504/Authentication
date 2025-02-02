// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// const allowedOrigins = ["http://localhost:5173","https://authentication-sw.web.app"];

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// //API End points
// app.get("/", (req, res) => res.send("API Working"));
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// app.listen(port, () => {
//   console.log(`server running opn port : ${port}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config(); // Ensure dotenv is configured at the start

const app = express();
const port = process.env.PORT || 5000;

// Database Connection with Error Handling
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit process if DB fails to connect
});

// Allowed Origins for CORS
const allowedOrigins = ["http://localhost:5173", "https://authentication-sw.web.app"];

app.use(express.json());
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Endpoints
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the Server
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});

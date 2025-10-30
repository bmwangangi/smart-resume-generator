import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
await connectDB();

// Parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev
    "https://smart-resume-generator-653y.vercel.app" // deployed frontend
  ],
  credentials: true,
}));

// Routes
app.get('/', (req, res) => res.send("Server is live..."));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

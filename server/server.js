import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
await connectDB();

// Parse JSON
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://smart-resume-generator-653y-n52h5ph6x.vercel.app' // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Preflight requests (automatic with cors, but can be explicit)
app.options('*', cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Test route
app.get('/', (req, res) => res.send("Server is live..."));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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

// Database
await connectDB();

// Parse JSON
app.use(express.json());

// ✅ CORS middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://smart-resume-generator-653y-n52h5ph6x.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS error: Origin ${origin} not allowed.`), false);
  },
  credentials: true,
}));

// Routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => res.send("Server is live..."));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

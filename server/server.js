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

await connectDB();
app.use(express.json());

// Allow only your deployed frontend
const allowedOrigins = [
  process.env.FRONTEND_URL,  // e.g., https://smart-resume-generator-653y.vercel.app
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS error: Origin ${origin} not allowed.`), false);
  },
  credentials: true
}));

// Routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => res.send("Server is live..."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

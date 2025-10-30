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

// Database connection
await connectDB();

// Parse JSON
app.use(express.json());

// ✅ Correct CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://smart-resume-generator-653y-n52h5ph6x.vercel.app',
  'https://smart-resume-generator-6-git-d00b8c-bartasa-mwangangis-projects.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS error: Origin ${origin} not allowed.`), false);
  },
  credentials: true,
}));

// ✅ Handle preflight requests globally
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

// Test route
app.get('/', (req, res) => res.send("Server is live..."));

// Routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

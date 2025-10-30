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

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://smart-resume-generator-653y-n52h5ph6x.vercel.app', // previous deployed frontend
  'https://smart-resume-generator-6-git-d00b8c-bartasa-mwangangis-projects.vercel.app', // new deployed frontend
  // Add more frontend URLs here if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman, curl)
    if(!origin) return callback(null, true);
    if(!allowedOrigins.includes(origin)) {
      const msg = `CORS error: Origin ${origin} not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies/auth headers
}));

// Test route
app.get('/', (req, res) => res.send("Server is live..."));

// Routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

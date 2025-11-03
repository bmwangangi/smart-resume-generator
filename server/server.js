import path from 'path';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const __dirname = path.resolve();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      "https://smart-resume-generator-5eeb.vercel.app", // Your Vercel frontend
      "http://localhost:5173", // For local dev
    ],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// ✅ Serve frontend build files
app.use(express.static(path.join(__dirname, "../client/dist")));

// ✅ Handle non-API routes (for React Router)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  }
  next();
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import path from 'path';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const __dirname = path.resolve();

// ✅ CORS FIX — allow your Vercel frontend & local dev
app.use(cors({
  origin: [
    "https://smart-resume-generator-5eeb.vercel.app", // ✅ your Vercel frontend URL
    "http://localhost:5173"
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ API routes FIRST (important)
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// ✅ Serve frontend build folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ Only catch GET requests that are NOT API calls
app.get('*', (req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
  next();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

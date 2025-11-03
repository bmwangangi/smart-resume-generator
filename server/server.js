import path from 'path';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const __dirname = path.resolve();

// ✅ Fix CORS configuration for credentials + Vercel frontend
app.use(cors({
  origin: [
    "https://smart-resume-generator-x3gf.vercel.app", // your Vercel frontend
    "http://localhost:5173" // for development
  ],
  credentials: true
}));

app.use(express.json());

// ✅ API routes first
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ Handle all non-API routes with index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
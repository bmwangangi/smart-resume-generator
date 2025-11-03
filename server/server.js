import path from 'path';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// ✅ API routes first
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ Proper fallback route for Express v5
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
  next();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

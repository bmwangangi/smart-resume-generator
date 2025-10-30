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

// API routes (must be BEFORE frontend catch-all)
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ Catch-all route for React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

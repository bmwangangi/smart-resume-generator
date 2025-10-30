import express from 'express';
import multer from 'multer';
import protect from '../middlewares/authMiddleware.js';
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
  enhanceSummary, // ✅ import the new controller
} from '../controllers/resumeController.js';

const resumeRouter = express.Router();

// configure multer for temporary uploads (disk)
const upload = multer({ dest: 'uploads/' });

// Keep all original endpoints and paths your frontend expects
resumeRouter.post('/create', protect, createResume);

// IMPORTANT: protect first, then multer, then controller
resumeRouter.put('/update', protect, upload.single('image'), updateResume);

// ✅ AI Enhance route
resumeRouter.put('/enhance/:resumeId', protect, enhanceSummary);

// Keep the delete route as you had it
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);

// This matches your frontend's call to GET /api/resumes/get/:resumeId
resumeRouter.get('/get/:resumeId', protect, getResumeById);

// Public resume endpoint unchanged
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
await connectDB()

app.use(express.json())

// ✅ Updated CORS config
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://smart-resume-generator-653y.vercel.app' // deployed frontend
]

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Test route
app.get('/', (req, res)=>res.send("Server is live..."))

// Routes
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter )
app.use('/api/ai', aiRouter)

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`)
});

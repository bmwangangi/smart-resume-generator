# 🧠 Smart Resume Builder

A full-stack AI-powered resume builder that allows users to create, update, and manage resumes with modern UI templates and intelligent content enhancement.  
Built with **React**, **Node.js**, **Express**, **MongoDB**, and **OpenAI**.

---

## 🚀 Key Features

✅ User authentication with JWT  
✅ Create, edit & delete resumes  
✅ Upload profile photo (ImageKit integration)  
✅ Download/Share Public resume link  
✅ AI-generated enhancements (Professional Summary)  
✅ Fully responsive modern UI  
✅ Secure API with protected routes  
✅ Auto-save experience

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Redux Toolkit + Tailwind |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI Model | OpenAI / OpenRouter |
| File Upload | ImageKit |
| Deployment | Vercel |

---

## 📁 Project Structure

root/
├── client/ # React Frontend
├── server/ # Express Backend API
├── models/ # MongoDB Models
├── controllers/ # API Business Logic
├── routes/ # API Routes
├── .env # Environment Variables
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in `server/`:

```env
PORT=5000
JWT_SECRET=your_secret_here

MONGODB_URI=your_mongodb_connection_string

IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url

OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o
OPENAI_BASE_URL=https://openrouter.ai/api/v1
⚠️ Never commit .env to GitHub.

📦 Installation & Running Locally
✅ Backend Setup
cd server
npm install
npm start
✅ Frontend Setup
bash
Copy code
cd client
npm install
npm run dev
Backend default URL → http://localhost:5000
Frontend default URL → http://localhost:5173

🚀 Deployment
📌 Frontend deployed on Vercel
📌 Backend also deployed on Vercel (or Render/Railway recommended)

Ensure you set all .env values inside:

➡️ Vercel → Project → Settings → Environment Variables
➡️ Then press Redeploy

🔐 Authentication
All resume operations require a valid JWT token in headers:

Authorization: Bearer <token>
🎯 API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/resumes/create	Create resume
PUT	/api/resumes/update	Update full resume
PUT	/api/resumes/enhance/:resumeId	AI-enhance summary
GET	/api/resumes/get/:resumeId	Get resume by ID
GET	/api/resumes/public/:resumeId	Public resume view
DELETE	/api/resumes/delete/:resumeId	Delete resume

🧑‍💻 Author
Smart Resume Builder
Developed by: Bartasa Mwangangi

⭐ Support the Project
If you like the project, give it a ⭐ on GitHub and share it!


import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// =======================
// Enhance Professional Summary
// =======================
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent, resumeId } = req.body;
    const userId = req.userId;

    if (!userContent || !resumeId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1–3 sentences, highlighting key skills, experience, and career objectives. Make it compelling, concise, and ATS-friendly. Return only the enhanced summary text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content.trim();

    // Update the resume in the database
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: { professional_summary: enhancedContent } },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Professional summary enhanced and saved successfully",
      enhancedContent,
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Error enhancing summary:", error);
    return res.status(400).json({ message: error.message });
  }
};

// =======================
// Enhance Job Description
// =======================
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent, resumeId, jobIndex } = req.body;
    const userId = req.userId;

    if (!userContent || resumeId === undefined || jobIndex === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Enhance this job description with measurable results and action verbs. Keep it concise (1–3 sentences) and ATS-optimized. Return only the enhanced text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content.trim();

    // Update the specific experience entry
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    resume.experience[jobIndex].description = enhancedContent;
    await resume.save();

    return res.status(200).json({
      message: "Job description enhanced and saved successfully",
      enhancedContent,
      resume,
    });
  } catch (error) {
    console.error("Error enhancing job description:", error);
    return res.status(400).json({ message: error.message });
  }
};

// =======================
// Upload and Analyze Resume
// =======================
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = "You are an expert AI trained to extract structured resume data.";
    const userPrompt = `Extract structured data from this resume text and return it as JSON:

${resumeText}

Required JSON structure:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    { "company": "", "position": "", "start_date": "", "end_date": "", "description": "", "is_current": false }
  ],
  "projects": [
    { "name": "", "position": "", "description": "" }
  ],
  "education": [
    { "institution": "", "degree": "", "field": "", "graduation_date": "", "gpa": "" }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = JSON.parse(response.choices[0].message.content);

    const newResume = await Resume.create({
      userId,
      title,
      ...extractedData,
    });

    return res.status(201).json({
      message: "Resume uploaded and analyzed successfully",
      resumeId: newResume._id,
      resume: newResume,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(400).json({ message: error.message });
  }
};

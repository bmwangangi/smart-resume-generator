import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Create Resume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: newResume,
    });
  } catch (error) {
    console.error("❌ Create Resume Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get Resume by ID
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get Public Resume By ID
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    return res.status(200).json({ success: true, data: resume });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Update Resume
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;

    let { resumeId, resumeData } = req.body;

    if (!resumeId || !resumeData) {
      return res.status(400).json({
        success: false,
        message: "resumeId or resumeData is missing",
      });
    }

    let resumeDataCopy;
    try {
      resumeDataCopy =
        typeof resumeData === "string"
          ? JSON.parse(resumeData)
          : structuredClone(resumeData);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError.message);
      return res.status(400).json({
        success: false,
        message: "Invalid resumeData format",
      });
    }

    if (!resumeDataCopy.personal_info) {
      resumeDataCopy.personal_info = {};
    }

    if (image) {
      let uploadResponse;

      if (image.path) {
        const imageBuffer = fs.createReadStream(image.path);
        uploadResponse = await imageKit.upload({
          file: imageBuffer,
          fileName: `resume_${resumeId}.png`,
          folder: "user-resumes",
        });
      } else {
        uploadResponse = await imageKit.upload({
          file: image,
          fileName: `resume_${resumeId}.png`,
          folder: "user-resumes",
        });
      }

      resumeDataCopy.personal_info.image = uploadResponse.url;
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Saved successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.error("❌ Error updating resume:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ AI Enhance Professional Summary
export const enhanceSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const { professional_summary } = req.body;

    if (!resumeId || !professional_summary) {
      return res.status(400).json({
        success: false,
        message: "Missing resumeId or professional_summary",
      });
    }

    // 🔹 Use OpenAI GPT to enhance the summary
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer. Enhance the professional summary professionally. Return only plain text suitable for a resume. Do NOT add headings, bullet points, emojis, or symbols like - or _."
        },
        {
          role: "user",
          content: professional_summary
        }
      ],
    });

    const enhancedSummary = aiResponse.choices[0].message.content.trim();

    // Save the enhanced summary
    const updatedResume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      { professional_summary: enhancedSummary },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Summary enhanced successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.error("❌ Enhance Summary Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to enhance summary",
      error: error.message,
    });
  }
};

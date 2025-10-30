import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2, Sparkles } from 'lucide-react';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProfessionalSummaryForm = ({ data, onChange, resumeData, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!resumeData?._id) {
      toast.error("Please save your resume first so AI can enhance it.");
      return;
    }

    if (!data || data.trim() === "") {
      toast.error("Please add a summary for AI to enhance.");
      return;
    }

    try {
      setIsGenerating(true);

      const response = await api.put(
        `/api/resumes/enhance/${resumeData._id}`,
        {
          professional_summary: data,
        },
        { headers: { Authorization: token } }
      );

      const updated = response?.data?.data?.professional_summary;

      if (updated) {
        setResumeData((prev) => ({
          ...prev,
          professional_summary: updated,
        }));
        toast.success("✨ AI Enhancement Complete!");
      }

    } catch (error) {
      console.error("AI enhancement error:", error);
      toast.error(error?.response?.data?.message || "Failed to enhance summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            Professional Summary
          </h3>
          <p className='text-sm text-gray-500'>
            Write a short introduction about yourself
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition disabled:opacity-50'
        >
          {isGenerating ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Sparkles className='h-4 w-4' />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className='mt-6'>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none resize-none'
          placeholder='Write 3–4 sentences that highlight your top skills and goals...'
        />
        <p className='text-xs text-gray-500 text-center mt-1'>
          Tip: Keep it short and powerful — highlight achievements & skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from 'lucide-react';

import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: null,
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  // ✅ Load Resume Data
  const loadResume = async () => {
    if (!resumeId) return;
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });

      if (data?.data) {
        setResumeData(data.data);
        document.title = data.data.title || 'Resume Builder';
      }
    } catch (error) {
      toast.error('Failed to load resume');
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  // ✅ Save
  const saveResume = async () => {
    try {
      const clone = structuredClone(resumeData);

      const formData = new FormData();
      formData.append('resumeId', clone._id);
      formData.append('resumeData', JSON.stringify(clone));

      if (clone.personal_info?.image instanceof File) {
        formData.append('image', clone.personal_info.image);
        delete clone.personal_info.image;
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token },
      });

      if (data?.data) {
        setResumeData(data.data);
        toast.success('Saved');
      }
    } catch (err) {
      toast.error('Save failed');
    }
  };

  // ✅ Toggle Public/Private
  const toggleVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append('resumeId', resumeData._id);
      formData.append(
        'resumeData',
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token },
      });

      if (data?.data) {
        setResumeData((prev) => ({ ...prev, public: !prev.public }));
        toast.success('Visibility updated');
      }
    } catch {
      toast.error('Failed to update visibility');
    }
  };

  // ✅ Share Link
  const handleShare = () => {
    if (!resumeData._id) return toast.error('Save first');

    const url = `${window.location.origin}/view/${resumeData._id}`;

    navigator.share
      ? navigator.share({ text: 'My Resume', url })
      : navigator.clipboard.writeText(url)
          .then(() => toast.success('Link copied'));
  };

  const downloadResume = () => window.print();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/app" className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>

        <div className="flex gap-2">
          {resumeData.public && (
            <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-blue-100 text-blue-700 rounded-lg">
              <Share2Icon className="size-4" /> Share
            </button>
          )}

          <button onClick={toggleVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-green-100 text-green-700 rounded-lg">
            {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
            {resumeData.public ? 'Public' : 'Private'}
          </button>

          <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-purple-100 text-purple-700 rounded-lg">
            <DownloadIcon className="size-4" /> Download
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* ✅ Left Panel */}
          <div className="lg:col-span-5 bg-white border rounded-lg p-6 pt-4">
            <p className="text-lg font-semibold">{activeSection.name}</p>

            <div className="flex justify-between items-center mb-6 border-b py-1">
              <div className="flex gap-3">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />

                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData((prev) => ({ ...prev, accent_color: color }))
                  }
                />
              </div>

              <div className="flex items-center">
                {activeSectionIndex > 0 && (
                  <button
                    className="p-3 text-sm hover:bg-gray-100 rounded-lg"
                    onClick={() =>
                      setActiveSectionIndex((prev) => prev - 1)
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                )}

                <button
                  className="p-3 text-sm hover:bg-gray-100 rounded-lg disabled:opacity-30"
                  disabled={activeSectionIndex === sections.length - 1}
                  onClick={() =>
                    setActiveSectionIndex((prev) => prev + 1)
                  }
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* ✅ Dynamic Sections */}
            <div className="space-y-6">
              {activeSection.id === 'personal' && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, personal_info: data }))
                  }
                />
              )}
              {activeSection.id === 'summary' && (
               <ProfessionalSummaryForm
                data={resumeData.professional_summary}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: data,
                  }))
                }
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

              )}
              {activeSection.id === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, experience: data }))
                  }
                />
              )}
              {activeSection.id === 'education' && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, education: data }))
                  }
                />
              )}
              {activeSection.id === 'projects' && (
                <ProjectsForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, project: data }))
                  }
                />
              )}
              {activeSection.id === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, skills: data }))
                  }
                />
              )}
            </div>

            {/* ✅ Save Button */}
            <button
              onClick={saveResume}
              className="mt-6 px-6 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
            >
              Save Changes
            </button>
          </div>

          {/* ✅ Live Preview */}
          <div className="lg:col-span-7">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

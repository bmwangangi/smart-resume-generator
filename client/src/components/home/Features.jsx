import { Zap } from 'lucide-react';
import React from 'react';
import Title from './Title';

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

      {/* Section Badge */}
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
        <Zap width={14} />
        <span>Key Features</span>
      </div>

      {/* Title */}
      <Title
        title='Build Your Resume with Smart AI Tools'
        description='Our intelligent platform helps you craft a professional, job-winning resume effortlessly. From layout design to AI keyword suggestions — everything you need, in one place.'
      />

      {/* Feature Cards Section */}
      <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Resume Builder Features"
        />

        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className={`p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-green-300 bg-green-100' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6 stroke-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">AI Resume Optimization</h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Get AI-powered keyword suggestions and content tips that help your resume stand out to recruiters and applicant tracking systems (ATS).
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6 stroke-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 3v18" />
                <path d="M19 3v18" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">Professional Templates</h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Choose from modern, elegant, and minimal resume designs that highlight your strengths — no design skills needed.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6 stroke-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">Instant PDF & Share Link</h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Export your resume as a downloadable PDF or share a professional public link with recruiters in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Features;

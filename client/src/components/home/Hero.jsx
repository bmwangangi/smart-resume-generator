import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook"
  ];

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className="min-h-screen pb-20 flex flex-col">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-5 sm:px-8 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="/">
            <img src="/logo.svg" alt="logo" className="h-10 sm:h-11 w-auto" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">Home</a>
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
            >
              Get started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden active:scale-90 transition"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close Icon */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-white active:scale-90 transition"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 6l20 20M6 26L26 6" />
            </svg>
          </button>

          <Link to="/" onClick={closeMenu} className="text-white text-xl">
            Home
          </Link>
          <a href="#features" onClick={closeMenu} className="text-white text-xl">
            Features
          </a>
          <a href="#testimonials" onClick={closeMenu} className="text-white text-xl">
            Testimonials
          </a>
          <Link
            to="/app?state=register"
            onClick={closeMenu}
            className="px-7 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all text-base"
          >
            Get started
          </Link>
          <Link
            to="/app?state=login"
            onClick={closeMenu}
            className="px-7 py-2 border border-white text-white hover:bg-white hover:text-black rounded-full transition-all text-base"
          >
            Login
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40 text-black flex-grow">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-green-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-16 sm:mt-20">
            <div className="flex -space-x-3 pr-3">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition" />
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition" />
            </div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star text-transparent fill-green-600"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold max-w-3xl text-center mt-5 leading-snug md:leading-[65px] px-2">
            Land your dream job with expertly crafted
            <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              {' '}AI-powered resumes{' '}
            </span>
            designed to make an impact.
          </h1>

          <p className="max-w-md text-center text-sm sm:text-base my-6 text-slate-600">
            Effortlessly create, edit, and download professional resumes powered by advanced AI technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Link
              to="/app"
              onClick={closeMenu}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-7 sm:px-9 h-10 sm:h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors text-sm sm:text-base"
            >
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 transition rounded-full px-6 sm:px-7 h-10 sm:h-12 text-slate-700 text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span>Try demo</span>
            </button>
          </div>

          {/* Trusted Logos Marquee */}
          <p className="py-6 text-slate-600 mt-10 sm:mt-14 text-center text-sm sm:text-base">
            Trusted by leading brands, including
          </p>

          <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
              <div className="flex">
                {[...companyLogos, ...companyLogos].map((company, index) => (
                  <img
                    key={index}
                    src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                    alt={company}
                    className="h-8 w-auto object-contain mx-6 opacity-80 hover:opacity-100 transition"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>

      <style>
        {`
          .marquee-inner {
            animation: marqueeScroll linear infinite;
          }
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </>
  );
};

export default Hero;

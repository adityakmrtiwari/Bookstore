import React from 'react';

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-t from-black/80 to-black/30 backdrop-blur-md border-t border-white/10 shadow-elegant py-2 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright & Legal Info */}
        <div className="text-sm text-white/70 text-center md:text-left">
          © {new Date().getFullYear()} BookStore. All rights reserved. | 
          <a href="#" className="text-white ml-1 hover:underline"> Privacy Policy </a> | 
          <a href="#" className="text-white ml-1 hover:underline"> Terms of Use </a>
        </div>

        {/* Right: Social + Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/adityakmrtiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline footer-btn"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adityakmrtiwari/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline footer-btn"
          >
            LinkedIn
          </a>
          <button
            onClick={handleScrollTop}
            className="btn btn-outline footer-btn p-2 rounded-full w-9 h-9 flex items-center justify-center"
            title="Back to top"
          >
            <span className="text-white text-lg">&#8593;</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

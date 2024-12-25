import React, { useState, useEffect } from 'react';
import EditorLayout from './editor/EditorLayout';
import Image from 'next/image';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';
import { Tooltip } from '@mui/material';
import { Menu, X } from 'lucide-react';

const BuilderLayout = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 print:hidden">
        <NavBarLayout />
      </div>

      <button
        className="fixed z-50 bottom-10 right-4 md:hidden print:hidden bg-blue-600 p-3 rounded-full text-white shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsEditorOpen(!isEditorOpen)}
      >
        {isEditorOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <main className="flex flex-1 overflow-hidden relative">
        <aside
          className={`
    fixed md:static inset-0 h-auto overflow-auto z-40 bg-white
    w-[90vw] sm:w-[70vw] md:w-[30vw] lg:w-[25vw] min-w-[15rem]
    transform transition-transform duration-300 ease-in-out
    ${isEditorOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
    print:hidden border-r h-[calc(100vh-64px)]
    overflow-y-auto
    shadow-lg rounded-r-lg md:rounded-none
    px-4 py-6 md:px-6
  `}
        >
          <EditorLayout />
        </aside>

        {isEditorOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsEditorOpen(false)}
          />
        )}

        <div className="flex-1 bg-custom-grey100 print:bg-white overflow-auto">
          <header className="w-full md:w-[210mm] mt-3 md:mt-5 mb-3 mx-auto print:hidden px-3 md:px-0">
            <ResumeHeader />
          </header>

          <div className="overflow-auto no-scrollbar print:overflow-visible">
            <div className="mx-auto mb-6 md:mb-8 print:mb-0">
              <div className="w-full md:w-[210mm] min-h-[297mm] mx-auto bg-white print:shadow-none shadow-lg print:p-0 p-3 md:p-6">
                <ResumeLayout />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="print:hidden">
        <Tooltip title="Share feedback">
          <a
            href="https://forms.gle/YmpXEZLk6LYdnqet7"
            target="_blank"
            rel="noreferrer"
            className="fixed w-12 h-12 md:w-14 md:h-14 rounded-full bottom-4 left-4 flex justify-center items-center bg-resume-50 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src="/icons/rate-review.svg"
              alt="Feedback button"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7"
            />
          </a>
        </Tooltip>
      </footer>
    </div>
  );
};

export default BuilderLayout;

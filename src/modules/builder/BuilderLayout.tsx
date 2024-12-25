// src/modules/builder/BuilderLayout.tsx
import EditorLayout from './editor/EditorLayout';
import Image from 'next/image';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';
import Tooltip from '@mui/material/Tooltip';

const BuilderLayout = () => {
  return (
    // <div className="flex flex-col min-h-screen">
    //   {/* Navbar */}
    //   <NavBarLayout />

    //   {/* Main Content */}
    //   <main className="flex flex-1 overflow-hidden">
    //     {/* Resume Section */}
    //     <div className="flex flex-col flex-1 justify-center bg-custom-grey100 print:bg-white">
    //       {/* Resume Header (Hidden in Print) */}
    //       <header className="w-[210mm] mt-5 mb-3 mx-auto print:hidden">
    //         <ResumeHeader />
    //       </header>

    //       {/* Resume Content */}
    //       <div className="overflow-auto no-scrollbar print:overflow-visible print:block">
    //         <div className="print-container mx-auto w-[210mm]">
    //           <ResumeLayout />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Editor Sidebar (Hidden in Print) */}
    //     <aside className="w-[25vw] min-w-[20rem] print:hidden">
    //       <EditorLayout />
    //     </aside>
    //   </main>

    //   {/* Footer Section */}
    //   <footer className="print:hidden">
    //     <Tooltip title="Share feedback">
    //       <a
    //         href="https://forms.gle/YmpXEZLk6LYdnqet7"
    //         target="_blank"
    //         rel="noreferrer"
    //         className="fixed w-14 h-14 rounded-full bottom-4 left-4 flex justify-center items-center bg-resume-50 shadow-level-4dp"
    //       >
    //         <Image src="/icons/rate-review.svg" alt="Feedback button" width="24" height="24" />
    //       </a>
    //     </Tooltip>
    //   </footer>
    // </div>
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBarLayout />

      {/* Main Content */}
      <main className="flex flex-1 flex-row-reverse overflow-hidden">
        {/* Resume Section */}
        <div className="flex flex-col flex-1 justify-center bg-custom-grey100 print:bg-white">
          {/* Resume Header (Hidden in Print) */}
          <header className="w-[210mm] mt-5 mb-3 mx-auto print:hidden">
            <ResumeHeader />
          </header>

          {/* Resume Content */}
          <div className="overflow-auto no-scrollbar print:overflow-visible print:block">
            <div
              className="print-container mx-auto w-[210mm] border border-gray-300 rounded-lg bg-white shadow-lg p-6"
              style={{ margin: '20px auto' }} // Additional margin to create spacing
            >
              <ResumeLayout />
            </div>
          </div>
        </div>

        {/* Editor Sidebar (Hidden in Print) */}
        <aside className="w-[25vw] min-w-[15rem] print:hidden">
          <EditorLayout />
        </aside>
      </main>

      {/* Footer Section */}
      <footer className="print:hidden">
        <Tooltip title="Share feedback">
          <a
            href="https://forms.gle/YmpXEZLk6LYdnqet7"
            target="_blank"
            rel="noreferrer"
            className="fixed w-14 h-14 rounded-full bottom-4 left-4 flex justify-center items-center bg-resume-50 shadow-level-4dp"
          >
            <Image src="/icons/rate-review.svg" alt="Feedback button" width="24" height="24" />
          </a>
        </Tooltip>
      </footer>
    </div>
  );
};

export default BuilderLayout;

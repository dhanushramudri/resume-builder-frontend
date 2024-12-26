'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
// import { NavMenuItem } from './components/MenuItem';
// import { PrintResume } from './components/PrintResume';
// import { TemplateSelect } from './components/TemplateSelect';
// import { ThemeSelect } from './components/ThemeSelect';
// import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import { useAuth } from '@clerk/nextjs'; // Import Clerk's useAuth hook
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { NavMenuItem } from '@/modules/builder/nav-bar/components/MenuItem';
import { NavBarActions, NavBarMenu, StyledButton } from '@/modules/builder/nav-bar/atoms';
import { TemplateSelect } from '@/modules/builder/nav-bar/components/TemplateSelect';
import { ThemeSelect } from '@/modules/builder/nav-bar/components/ThemeSelect';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { signOut } = useAuth(); // Clerk's signOut function

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <nav className="fixed no-print top-0 left-0 right-0 h-16 bg-gradient-to-r from-teal-600 to-teal-500 flex items-center justify-between px-2 sm:px-4 md:px-6 shadow-lg z-50 print:hidden backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-600">
      <div className="flex items-center gap-2 md:gap-4 rounded-full">
        <Link
          href="/builder"
          className="flex-shrink-0 rounded-full transition-transform duration-300  hover:scale-110"
        >
          <Image
            src="/icons/resume1-icon.png"
            alt="logo"
            height={36}
            width={36}
            className="w-8 h-8 md:w-9  md:h-9 rounded-full animate-pulse"
          />
        </Link>

        <NavBarMenu className="hidden sm:flex animate-fadeIn print:hidden">
          <NavMenuItem
            caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
            popoverChildren={<TemplateSelect />}
            className="hover:bg-teal-700/50 print:hidden rounded-lg transition-colors duration-200"
          />
          <NavMenuItem
            caption="Colours"
            popoverChildren={<ThemeSelect />}
            className="hover:bg-teal-700/50 print:hidden rounded-lg transition-colors duration-200"
          />
        </NavBarMenu>
      </div>

      <div className="hidden print:hidden no-print md:flex items-center gap-4 animate-slideInRight">
        <NavBarActions>
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              router.push('/update');
            }}
            className="text-teal-950 hover:bg-teal-700/50 bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Update Details
          </StyledButton>
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              router.push('/builder');
            }}
            className="text-teal-950 hover:bg-teal-700/50 bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Resume Builder
          </StyledButton>
          {/* <PrintResume
            onClick={() => {
              closeMenu();
            }}
            className="hover:scale-105 transition-transform duration-200"
          /> */}
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              signOut(); // Logs out the user
            }}
            className="text-red-600 hover:bg-red-600/90 hover:text-white bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Logout
          </StyledButton>
        </NavBarActions>
      </div>

      <button
        className="flex md:hidden text-white p-2 hover:bg-teal-700/50 rounded-full transition-all duration-200 hover:scale-110 animate-bounce"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        aria-label="Open menu"
      >
        <Image
          src="/icons/more-horizontal.svg"
          alt="menu"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="mt-14 print:hidden no-print"
        PaperProps={{
          className: 'bg-white/90 backdrop-blur-md rounded-lg shadow-xl',
          elevation: 0,
        }}
      >
        <MenuItem
          onClick={() => {
            closeMenu();
            router.push('/update');
          }}
          className="hover:bg-teal-50 transition-colors duration-200"
        >
          Update Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            router.push('/builder');
          }}
          className="hover:bg-teal-50 transition-colors duration-200"
        >
          Resume Builder
        </MenuItem>
        {/* <PrintResume isMenuButton onClick={closeMenu} /> */}
        <MenuItem
          onClick={() => {
            closeMenu();
            signOut(); // Logs out the user
          }}
          className="bg-red-600 text-white transition-colors duration-200 rounded-lg mt-2 hover:bg-red-700"
        >
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
};

const Resumereview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>('');
  const [sections, setSections] = useState<Array<{ title: string; content: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCopy = () => {
    const textContent = sections
      .map((section) => `${section.title}\n${section.content}`)
      .join('\n\n');

    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        alert('Recommendations copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const convertPdfToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const generateHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!file || desc === '') {
      alert('Please provide both a resume and a job description.');
      setLoading(false);
      return;
    }

    try {
      // Convert PDF to base64
      const base64PDF = await convertPdfToBase64(file);

      // Send directly to analysis endpoint
      const response = await fetch('https://review-backend-ruddy.vercel.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64: base64PDF,
          desc: desc,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      if (data && data.sections) {
        setSections(data.sections);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error analyzing your resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBarLayout />
      <main className="flex-1 py-12">
        {' '}
        {/* Added padding-top and padding-bottom */}
        <div className="w-full flex items-center">
          <div className="w-full md:flex md:items-center md:justify-evenly p-5 lg:p-8">
            <div className="w-full md:w-[90%] gap-[20px] flex flex-col md:flex-row">
              <div
                className={`flex flex-col lg:flex-row gap-6 w-full lg:w-[90%] mx-auto ${sections.length > 0 ? 'active' : ''}`}
              >
                <div className="w-full h-fit lg:w-[100%] bg-teal-50 rounded-lg shadow-md p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                        ATS Resume Optimizer 👇
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Get expert recommendations to pass ATS screening
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Upload Resume (PDF)
                      </label>
                      <input
                        type="file"
                        className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                        onChange={selectFileHandler}
                        accept=".pdf"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Paste Job Description
                      </label>
                      <textarea
                        className="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={desc}
                        onChange={changeTextHandler}
                        placeholder="Paste the complete job description here..."
                      />
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-semibold text-white ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
                      }`}
                      onClick={generateHandler}
                      disabled={loading}
                    >
                      {loading ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Rest of your component remains the same */}
              {sections.length === 0 ? (
                <div className="bg-teal-50 md:w-[50%] rounded-lg shadow-md p-4 md:p-6 mb-8">
                  <div className="text-lg font-semibold text-gray-700 mb-2">HOW IT WORKS:</div>
                  <div className="text-gray-600 space-y-2">
                    <p>🎯 Get an ATS match score for your resume</p>
                    <p>🔑 Identify missing important keywords</p>
                    <p>💡 Receive specific modification suggestions</p>
                    <p>📝 Learn which skills to add</p>
                    <p>⚠ Find formatting issues that affect ATS</p>
                    <p>✨ Enhance your achievements</p>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-teal-50 lg:w-[45%] bg-white rounded-lg shadow-md p-4 md:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      ATS Optimization Results
                    </h3>
                    <button
                      className="px-4 py-2 bg-green-500 text-[13px] hover:bg-green-600 text-white rounded-lg"
                      onClick={handleCopy}
                    >
                      Copy All
                    </button>
                  </div>

                  <div className="space-y-6 h-auto md:max-h-[70vh] md:overflow-y-auto border-b border-gray-200 md:border-b-0">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                          {section.title}
                        </h4>
                        <div className="text-gray-600">
                          {section.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resumereview;

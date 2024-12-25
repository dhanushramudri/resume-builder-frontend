import React, { useState } from 'react';
import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from '@/helpers/common/components/ErrorBoundary';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { headers } from '@/helpers/constants/editor-data';
import { resetResumeStore } from '@/stores/useResumeStore';

const EditorLayout = () => {
  const [link, setLink] = useState('');
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    setLink(link);
  };

  const displayElement = link ? (
    <EditSection section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div className="editor-layout mt-6 bg-gray-100 min-h-screen text-gray-800 px-4 sm:px-6 py-6 overflow-auto shadow-lg rounded-lg">
        <div className="max-w-4xl mx-auto">
          <div className="editor-section bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 sm:mb-6">Resume Editor</h1>
            {displayElement}
          </div>

          <div className="editor-actions mt-8 flex justify-center sm:justify-end">
            <OutlinedButton
              onClick={resetResumeStore}
              className="w-full sm:w-auto px-6 py-3 text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white transition rounded-lg font-medium"
            >
              Reset All Edits
            </OutlinedButton>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditorLayout;

'use client';
import React, { useState } from 'react';

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

  const generateHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!file || desc === '') {
      alert('Please provide both a resume and a job description.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await fetch('http://localhost:8001/upload', {
        method: 'POST',
        body: formData,
      });

      const tailoredResponse = await fetch(`http://localhost:8001/${file.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc }),
      });

      if (!tailoredResponse.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await tailoredResponse.json();
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
                    className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    onChange={selectFileHandler}
                    accept=".pdf"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Paste Job Description
                  </label>
                  <textarea
                    className="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={desc}
                    onChange={changeTextHandler}
                    placeholder="Paste the complete job description here..."
                  />
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold text-white ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={generateHandler}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>
            </div>
          </div>
          {sections.length === 0 ? (
            <div className="bg-teal-50 md:w-[50%] rounded-lg shadow-md  p-4 md:p-6 mb-8">
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
                <h3 className="text-xl font-semibold text-gray-800">ATS Optimization Results</h3>
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
  );
};

export default Resumereview;

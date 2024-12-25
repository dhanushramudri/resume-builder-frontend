import React, { useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Education } from '../../types/resume';
import FormNavigation from './FormNavigation';

const EducationForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { education } = resumeData;
  const formErrors = errors.education || {};

  useEffect(() => {
    if (education.length === 0) {
      const defaultEducation: Education[] = [
        {
          id: '1',
          institution: '',
          url: '',
          studyType: 'High School',
          area: '',
          startDate: '',
          endDate: '',
          score: '',
          courses: [],
          isStudyingHere: false,
          level: 'secondary',
        },
        {
          id: '2',
          institution: '',
          url: '',
          studyType: "Bachelor's",
          area: '',
          startDate: '',
          endDate: '',
          score: '',
          courses: [],
          isStudyingHere: false,
          level: 'graduation',
        },
      ];
      updateResumeData('education', defaultEducation);
    }
  }, []);

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    updateResumeData('education', updatedEducation);
  };

  const addCourse = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation[index].courses.push('');
    updateResumeData('education', updatedEducation);
  };

  const updateCourse = (eduIndex: number, courseIndex: number, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[eduIndex].courses[courseIndex] = value;
    updateResumeData('education', updatedEducation);
  };

  const renderFieldErrorWithIndex = (index: number, fieldName: string) => {
    return formErrors[index + '_' + fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[index + '_' + fieldName]}</p>
    ) : null;
  };

  // const renderFieldError = (fieldName: string) => {
  //   return formErrors[fieldName] ? (
  //     <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
  //   ) : null;
  // };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-4 border rounded space-y-4">
          <h3 className="font-medium text-lg mb-4">
            {edu.level === 'secondary' ? 'Secondary Education' : 'Graduation'}
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">Institution*</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={
                edu.level === 'secondary' ? 'e.g., City High School' : 'e.g., State University'
              }
              required
            />
            {renderFieldErrorWithIndex(index, 'institution')}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Institution Website</label>
            <input
              type="text"
              value={edu.url || ''}
              onChange={(e) => updateEducation(index, 'url', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., https://www.institution.edu"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Degree*</label>
              <input
                type="text"
                value={edu.studyType}
                onChange={(e) => updateEducation(index, 'studyType', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={edu.level === 'secondary' ? 'e.g., High School' : "e.g., Bachelor's"}
                required
              />
              {renderFieldErrorWithIndex(index, 'studyType')}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Field of Study*</label>
              <input
                type="text"
                value={edu.area}
                onChange={(e) => updateEducation(index, 'area', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={edu.level === 'secondary' ? 'e.g., Science' : 'e.g., Computer Science'}
                required
              />
              {renderFieldErrorWithIndex(index, 'area')}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date*</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="YYYY"
                required
              />
              {renderFieldErrorWithIndex(index, 'startDate')}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date*</label>
              <input
                type="text"
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="YYYY"
                disabled={edu.isStudyingHere}
                required={!edu.isStudyingHere}
              />
              {renderFieldErrorWithIndex(index, 'endDate')}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Score*</label>
            <input
              type="text"
              value={edu.score}
              onChange={(e) => updateEducation(index, 'score', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={edu.level === 'secondary' ? 'e.g., 95%' : 'e.g., 3.8 GPA'}
              required
            />
            {renderFieldErrorWithIndex(index, 'score')}
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={edu.isStudyingHere}
                onChange={(e) => updateEducation(index, 'isStudyingHere', e.target.checked)}
              />
              <span className="text-sm">Currently studying here</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Relevant Courses</label>
            <div className="space-y-2">
              {edu.courses.map((course, courseIndex) => (
                <input
                  key={courseIndex}
                  type="text"
                  value={course}
                  onChange={(e) => updateCourse(index, courseIndex, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Course name"
                />
              ))}
              <button
                onClick={() => addCourse(index)}
                className="text-blue-500 hover:text-blue-600 mt-2"
              >
                + Add Course
              </button>
            </div>
          </div>
        </div>
      ))}
      <FormNavigation />
    </div>
  );
};

export default EducationForm;

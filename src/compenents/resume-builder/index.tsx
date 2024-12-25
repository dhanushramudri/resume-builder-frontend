import React from 'react';
import { RefreshCw } from 'lucide-react';
import { StepType, useResume } from '../../context/ResumeContext';
import BasicInfoForm from './BasicInfoForm';
import SkillsForm from './SkillsForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';
import ActivitiesForm from './ActivitiesForm';
import VolunteerForm from './VolunteerForm';
import AwardsCertificationsForm from './AwardsForm';

const steps = [
  { id: 'basics', label: 'Basic Info' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'activities', label: 'Activities' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'awards-and-certifications', label: 'Awards and Certifications' },
];

const ResumeBuilder = () => {
  const { currentStep, setCurrentStep, resetForm } = useResume();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">Resume Builder</h1>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 sm:mt-0"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 justify-center sm:justify-start">
        {steps.map((step, index) => (
          <button
            onClick={() => setCurrentStep(step.id as StepType)}
            key={step.id}
            className={`relative px-4 py-2 text-sm sm:text-base rounded-full shadow-md font-medium transition-all duration-300 ${
              currentStep === step.id
                ? 'bg-blue-600 text-white ring-2 ring-blue-500'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
            }`}
          >
            {steps.findIndex((s) => s.id === step.id) <
              steps.findIndex((s) => s.id === currentStep) && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 text-white text-xs flex items-center justify-center rounded-full">
                ✔
              </span>
            )}
            {index + 1}. {step.label}
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        {currentStep === 'basics' && <BasicInfoForm />}
        {currentStep === 'skills' && <SkillsForm />}
        {currentStep === 'work' && <WorkExperienceForm />}
        {currentStep === 'education' && <EducationForm />}
        {currentStep === 'activities' && <ActivitiesForm />}
        {currentStep === 'volunteer' && <VolunteerForm />}
        {currentStep === 'awards-and-certifications' && <AwardsCertificationsForm />}
      </div>
    </div>
  );
};

export default ResumeBuilder;

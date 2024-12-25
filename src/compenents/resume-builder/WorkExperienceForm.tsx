import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Work } from '../../types/resume';
import FormNavigation from './FormNavigation';

const WorkExperienceForm = React.forwardRef((props, ref) => {
  const { resumeData, updateResumeData, errors, setErrors } = useResume();
  const { work } = resumeData;
  const formErrors = errors.work || {};

  const validateWork = () => {
    const newErrors: { [key: string]: string } = {};

    if (work.length === 0) {
      newErrors.general = 'At least one work experience or project is required';
      return { work: newErrors };
    }

    work.forEach((job, index) => {
      if (!job.name.trim()) newErrors[`${index}_name`] = 'Company name is required';
      if (!job.position.trim()) newErrors[`${index}_position`] = 'Position is required';
      if (!job.startDate.trim()) newErrors[`${index}_startDate`] = 'Start date is required';
      if (!job.isWorkingHere && !job.endDate.trim()) {
        newErrors[`${index}_endDate`] = 'End date is required';
      }
      if (!job.summary.trim()) newErrors[`${index}_summary`] = 'Summary is required';
      if (!job.highlights || job.highlights.length === 0 || !job.highlights[0].trim()) {
        newErrors[`${index}_highlights`] = 'At least one highlight is required';
      }
    });

    return Object.keys(newErrors).length > 0 ? { work: newErrors } : null;
  };

  React.useImperativeHandle(ref, () => ({
    validateWork,
  }));

  const addWorkExperience = (entryType: 'work' | 'project' = 'work') => {
    const newWork: Work = {
      id: Date.now().toString(),
      name: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      isWorkingHere: false,
      summary: '',
      highlights: [],
      years: '',
      type: entryType,
    };
    updateResumeData('work', [...work, newWork]);
  };

  const updateWorkExperience = (index: number, field: keyof Work, value: any) => {
    const updatedWork = [...work];
    updatedWork[index] = { ...updatedWork[index], [field]: value };
    updateResumeData('work', updatedWork);

    if (errors.work && errors.work[`${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors.work[`${index}_${field}`];
      setErrors(newErrors);
    }
  };

  const renderFieldErrorWithIndex = (index: number, fieldName: string) => {
    const errorKey = `${index}_${fieldName}`;
    return formErrors[errorKey] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[errorKey]}</p>
    ) : null;
  };

  const renderFieldError = (fieldName: string) => {
    const errorKey = `${fieldName}`;
    return formErrors[errorKey] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[errorKey]}</p>
    ) : null;
  };

  return (
    <>
      <div className="space-y-6">
        {renderFieldError('entry')}
        {formErrors.general && <p className="text-red-500 text-sm">{formErrors.general}</p>}
        {work.map((job, index) => (
          <div key={job.id} className="p-4 border rounded space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={job.name}
                onChange={(e) => updateWorkExperience(index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {renderFieldErrorWithIndex(index, 'name')}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Position<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={job.position}
                onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {renderFieldErrorWithIndex(index, 'position')}
            </div>

            {/* Company URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Company URL</label>
              <input
                type="text"
                value={job.url}
                onChange={(e) => updateWorkExperience(index, 'url', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com"
              />
            </div>

            {/* Start and End Date */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={job.startDate}
                  onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MM/YYYY"
                />
                {renderFieldErrorWithIndex(index, 'startDate')}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  End Date{!job.isWorkingHere && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={job.endDate || ''}
                  onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MM/YYYY"
                  disabled={job.isWorkingHere}
                />
                {renderFieldErrorWithIndex(index, 'endDate')}
              </div>
            </div>

            {/* Currently Working Checkbox */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={job.isWorkingHere}
                  onChange={(e) => updateWorkExperience(index, 'isWorkingHere', e.target.checked)}
                />
                <span className="text-sm">Currently working here</span>
              </label>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Summary<span className="text-red-500">*</span>
              </label>
              <textarea
                value={job.summary}
                onChange={(e) => updateWorkExperience(index, 'summary', e.target.value)}
                className="w-full p-2 border rounded h-32"
              />
              {renderFieldErrorWithIndex(index, 'summary')}
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Highlights<span className="text-red-500">*</span>
              </label>
              <textarea
                value={job.highlights?.join('\n')}
                onChange={(e) =>
                  updateWorkExperience(index, 'highlights', e.target.value.split('\n'))
                }
                className="w-full p-2 border rounded h-24"
                placeholder="Enter one highlight per line"
              />
              {renderFieldErrorWithIndex(index, 'highlights')}
            </div>

            {/* Total Years */}
            <div>
              <label className="block text-sm font-medium mb-1">Total Years</label>
              <input
                type="text"
                value={job.years}
                onChange={(e) => updateWorkExperience(index, 'years', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., 2 years"
              />
              {renderFieldErrorWithIndex(index, 'years')}
            </div>
          </div>
        ))}
        <button
          onClick={() => addWorkExperience(work.length === 0 ? 'project' : 'work')}
          className="text-blue-500 hover:text-blue-600"
        >
          + Add {work.length === 0 ? 'Project' : 'Experience'}
        </button>
      </div>
      <FormNavigation />
    </>
  );
});

export default WorkExperienceForm;

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Volunteer } from '../../types/resume';
import FormNavigation from './FormNavigation';

const VolunteerForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { volunteer } = resumeData;
  const formErrors = errors.volunteer || {};

  const addVolunteer = () => {
    const newVolunteer: Volunteer = {
      id: Date.now().toString(),
      organization: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      summary: '',
      isVolunteeringNow: false,
      highlights: [],
    };
    updateResumeData('volunteer', [...volunteer, newVolunteer]);
  };

  const updateVolunteer = (index: number, field: keyof Volunteer, value: any) => {
    const updatedVolunteer = [...volunteer];
    updatedVolunteer[index] = { ...updatedVolunteer[index], [field]: value };
    updateResumeData('volunteer', updatedVolunteer);
  };

  const removeVolunteer = (index: number) => {
    const updatedVolunteer = volunteer.filter((_, i) => i !== index);
    updateResumeData('volunteer', updatedVolunteer);
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
    <div className="space-y-6">
      {renderFieldError('entry')}
      {volunteer.map((vol, index) => (
        <div key={vol.id} className="p-4 border rounded space-y-4 relative">
          <button
            onClick={() => removeVolunteer(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            title="Remove volunteer experience"
          >
            ×
          </button>

          <div>
            <label className="block text-sm font-medium mb-1">Organization</label>
            <input
              type="text"
              value={vol.organization}
              onChange={(e) => updateVolunteer(index, 'organization', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Organization name"
            />
            {renderFieldErrorWithIndex(index, 'organization')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              value={vol.position}
              onChange={(e) => updateVolunteer(index, 'position', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your role"
            />
            {renderFieldErrorWithIndex(index, 'position')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              value={vol.url}
              onChange={(e) => updateVolunteer(index, 'url', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Link to organization or project (optional)"
            />
            {renderFieldErrorWithIndex(index, 'url')}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="text"
                value={vol.startDate}
                onChange={(e) => updateVolunteer(index, 'startDate', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="YYYY-MM-DD"
              />
              {renderFieldErrorWithIndex(index, 'startDate')}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="text"
                value={vol.endDate}
                onChange={(e) => updateVolunteer(index, 'endDate', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="YYYY-MM-DD"
                disabled={vol.isVolunteeringNow}
              />
              {renderFieldErrorWithIndex(index, 'endDate')}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={vol.isVolunteeringNow}
                onChange={(e) => updateVolunteer(index, 'isVolunteeringNow', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Currently volunteering here</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={vol.summary}
              onChange={(e) => updateVolunteer(index, 'summary', e.target.value)}
              className="w-full p-2 border rounded h-32"
              placeholder="Describe your volunteer work and responsibilities..."
            />
            {renderFieldErrorWithIndex(index, 'summary')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Highlights</label>
            <div className="space-y-2">
              {vol.highlights?.map((highlight, hIndex) => (
                <div key={hIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...(vol.highlights || [])];
                      newHighlights[hIndex] = e.target.value;
                      updateVolunteer(index, 'highlights', newHighlights);
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Add a key achievement or contribution"
                  />
                  <button
                    onClick={() => {
                      const newHighlights = vol.highlights?.filter((_, i) => i !== hIndex);
                      updateVolunteer(index, 'highlights', newHighlights);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newHighlights = [...(vol.highlights || []), ''];
                  updateVolunteer(index, 'highlights', newHighlights);
                }}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                + Add Highlight
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addVolunteer}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
      >
        + Add Volunteer Experience
      </button>
      <FormNavigation />
    </div>
  );
};

export default VolunteerForm;

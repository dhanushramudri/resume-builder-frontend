import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Award, Certificate } from '../../types/resume';
import FormNavigation from './FormNavigation';

const AwardsCertificationsForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { awards, certifications } = resumeData;
  const formErrors = errors.certifications || {};

  const addItem = (type: 'awards' | 'certifications') => {
    if (type === 'awards') {
      const newAward: Award = {
        id: Date.now().toString(),
        title: '',
        date: '',
        awarder: '',
        summary: '',
      };
      updateResumeData('awards', [...awards, newAward]);
    } else {
      const newCertification: Certificate = {
        id: Date.now().toString(),
        title: '',
        date: '',
        authority: '',
        summary: '',
      };
      updateResumeData('certifications', [...certifications, newCertification]);
    }
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updatedAwards = [...awards];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    updateResumeData('awards', updatedAwards);
  };

  const updateCertification = (index: number, field: keyof Certificate, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    updateResumeData('certifications', updatedCertifications);
  };

  const removeItem = (type: 'awards' | 'certifications', index: number) => {
    if (type === 'awards') {
      const updatedAwards = awards.filter((_, i) => i !== index);
      updateResumeData('awards', updatedAwards);
    } else {
      const updatedCertifications = certifications.filter((_, i) => i !== index);
      updateResumeData('certifications', updatedCertifications);
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
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Awards</h2>
        <div className="space-y-6">
          {awards.map((award, index) => (
            <div key={award.id} className="p-4 border rounded space-y-4 relative">
              <button
                onClick={() => removeItem('awards', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove award"
              >
                ×
              </button>

              <div>
                <label className="block text-sm font-medium mb-1">Award Title</label>
                <input
                  type="text"
                  value={award.title}
                  onChange={(e) => updateAward(index, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Name of the award"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Awarder</label>
                <input
                  type="text"
                  value={award.awarder}
                  onChange={(e) => updateAward(index, 'awarder', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Organization that gave the award"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="text"
                  value={award.date}
                  onChange={(e) => updateAward(index, 'date', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="YYYY-MM-DD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <textarea
                  value={award.summary}
                  onChange={(e) => updateAward(index, 'summary', e.target.value)}
                  className="w-full p-2 border rounded h-32"
                  placeholder="Describe the award and its significance..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use bullet points starting with * for multiple points
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={() => addItem('awards')}
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            + Add Award
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        {renderFieldError('entry')}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="p-4 border rounded space-y-4 relative">
              <button
                onClick={() => removeItem('certifications', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove certification"
              >
                ×
              </button>

              <div>
                <label className="block text-sm font-medium mb-1">Certification Title</label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateCertification(index, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Name of the certification"
                />
                {renderFieldErrorWithIndex(index, 'title')}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Issuing Authority</label>
                <input
                  type="text"
                  value={cert.authority}
                  onChange={(e) => updateCertification(index, 'authority', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Organization that issued the certification"
                />
                {renderFieldErrorWithIndex(index, 'authority')}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="YYYY-MM-DD"
                />
                {renderFieldErrorWithIndex(index, 'date')}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <textarea
                  value={cert.summary}
                  onChange={(e) => updateCertification(index, 'summary', e.target.value)}
                  className="w-full p-2 border rounded h-32"
                  placeholder="Describe the certification and its relevance..."
                />
                {renderFieldErrorWithIndex(index, 'summary')}
                <p className="text-sm text-gray-500 mt-1">
                  Use bullet points starting with * for multiple points
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={() => addItem('certifications')}
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            + Add Certification
          </button>
        </div>
      </section>

      <FormNavigation />
    </div>
  );
};

export default AwardsCertificationsForm;

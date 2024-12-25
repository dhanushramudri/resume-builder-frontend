// src/components/resume-builder/SkillsForm.tsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Skills } from '../../types/resume';
import FormNavigation from './FormNavigation';

const SkillsForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { skills } = resumeData;
  const formErrors = errors.skills || {};

  // Handle both skill name and level changes
  const handleSkillChange = (
    category: keyof Skills,
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSkills = { ...skills };
    if (field === 'name') {
      updatedSkills[category][index].name = value;
    } else if (field === 'level') {
      updatedSkills[category][index].level = parseInt(value, 10);
    }
    updateResumeData('skills', updatedSkills);
  };

  // Add a new skill with a default level
  const addSkill = (category: keyof Skills) => {
    const updatedSkills = { ...skills };
    updatedSkills[category] = [...skills[category], { name: '', level: 1 }];
    updateResumeData('skills', updatedSkills);
  };

  // Render field errors
  const renderFieldError = (fieldName: string) => {
    return formErrors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className="space-y-6">
      {(Object.keys(skills) as Array<keyof Skills>).map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-medium capitalize">{category}</h3>
          {renderFieldError(category)}
          {skills[category].map((skill, index) => (
            <div key={index} className="flex gap-2">
              {/* Skill Name Input */}
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange(category, index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Add ${category} skill`}
              />
              {/* Skill Level Input */}
              <input
                type="number"
                value={skill.level}
                onChange={(e) => handleSkillChange(category, index, 'level', e.target.value)}
                className="w-20 p-2 border rounded"
                placeholder="Level (1-10)"
                min="1"
                max="10"
              />
            </div>
          ))}
          <button onClick={() => addSkill(category)} className="text-blue-500 hover:text-blue-600">
            + Add {category.slice(0, -1)}
          </button>
        </div>
      ))}
      <FormNavigation />
    </div>
  );
};

export default SkillsForm;

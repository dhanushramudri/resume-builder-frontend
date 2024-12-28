// SkillsLayout.tsx
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';
import EditSectionContainer from '@/helpers/common/components/EditSectionContainer';
import Skill from './components/Skill';
import { ISkillItem } from '@/stores/skill.interface';

const SkillsLayout = () => {
  const { updateResumeData, resumeData } = useResume();
  const skillState = [
    useLanguages(),
    useFrameworks(),
    useTechnologies(),
    useLibraries(),
    useDatabases(),
    usePractices(),
    useTools(),
  ];

  const [expanded, setExpanded] = useState<string | false>('Languages');

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSkillUpdate = (skillType: string, updatedSkills: ISkillItem[]) => {
    // Update Resume Context
    updateResumeData('skills', {
      ...resumeData.skills,
      [skillType.toLowerCase()]: updatedSkills,
    });

    // Update localStorage
    const existingData = localStorage.getItem('userDetailsData');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = {
        ...parsedData,
        resumeData: {
          ...parsedData.resumeData,
          skills: {
            ...parsedData.resumeData.skills,
            [skillType.toLowerCase()]: updatedSkills,
          },
        },
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
    }
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {skillState.map((state) => (
        <EditSectionContainer
          key={state.title}
          title={state.title}
          expanded={expanded === state.title}
          isEnabled={state.isEnabled}
          setIsEnabled={state.setIsEnabled}
          clickHandler={() => handleChange(state.title, expanded !== state.title)}
        >
          <Skill
            items={state.values}
            addItem={(item) => {
              state.add(item);
              handleSkillUpdate(state.title, [...state.values, item]);
            }}
            removeItem={(index) => {
              state.remove(index);
              handleSkillUpdate(
                state.title,
                state.values.filter((_, i) => i !== index)
              );
            }}
            editItem={({ name, level, index }) => {
              state.edit({ name, level, index });
              const updatedValues = [...state.values];
              updatedValues[index] = { name, level };
              handleSkillUpdate(state.title, updatedValues);
            }}
            setItems={(items) => {
              state.reset(items);
              handleSkillUpdate(state.title, items);
            }}
            hasLevel={state.hasLevel}
          />
        </EditSectionContainer>
      ))}
    </div>
  );
};

export default SkillsLayout;

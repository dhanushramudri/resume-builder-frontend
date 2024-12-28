// EducationLayout.tsx
import { useEffect, useState } from 'react';
import { useEducations } from '@/stores/education';
import AddEducation from './components/AddEducation';
import Education from './components/Education';
import MoveEditSection from '@/helpers/common/components/MoveEditSectionContainer';
import { IEducation } from '@/stores/education.interface';
import { useResume } from '@/context/ResumeContext';

const EducationLayout = () => {
  const allAcademics = useEducations((state) => state.educations);
  const updateEducation = useEducations((state) => state.updateEducation);
  const removeEducation = useEducations((state) => state.remove);
  const onMoveUp = useEducations((state) => state.onmoveup);
  const onMoveDown = useEducations((state) => state.onmovedown);
  const { updateResumeData } = useResume();

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (allAcademics.length > 0 && !expanded) {
      setExpanded(allAcademics[0]?.id);
    }
  }, [allAcademics, expanded]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEducationUpdate = (updatedEducation: IEducation[]) => {
    // Update Resume Context
    updateResumeData('education', updatedEducation);

    // Update localStorage
    const existingData = localStorage.getItem('userDetailsData');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = {
        ...parsedData,
        resumeData: {
          ...parsedData.resumeData,
          education: updatedEducation,
        },
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
    }
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allAcademics.map((education: IEducation, index: number) => (
        <MoveEditSection
          key={education.id}
          title={education.institution || 'Education'}
          expanded={expanded === education.id}
          length={allAcademics.length}
          index={index}
          clickHandler={() => handleChange(education.id, expanded !== education.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={() => {
            removeEducation(index);
            const updatedEducations = allAcademics.filter((_, i) => i !== index);
            handleEducationUpdate(updatedEducations);
          }}
        >
          <Education
            educationInfo={education}
            currentIndex={index}
            onUpdate={(updatedEducationInfo) => {
              updateEducation(index, updatedEducationInfo);
              const newAcademics = allAcademics.map((edu, i) =>
                i === index ? updatedEducationInfo : edu
              );
              handleEducationUpdate(newAcademics);
            }}
          />
        </MoveEditSection>
      ))}
      <AddEducation
        handleChange={handleChange}
        isEmpty={allAcademics.length === 0}
        onAdd={(newEducation) => {
          const updatedAcademics = [...allAcademics, newEducation];
          handleEducationUpdate(updatedAcademics);
        }}
      />
    </div>
  );
};

export default EducationLayout;

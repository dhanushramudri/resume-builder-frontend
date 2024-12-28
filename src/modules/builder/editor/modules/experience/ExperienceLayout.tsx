import { useEffect, useState } from 'react';
import { useExperiences } from '@/stores/experience';
import { useResume } from '@/context/ResumeContext';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';
import MoveEditSection from '@/helpers/common/components/MoveEditSectionContainer';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const ExperienceLayout = () => {
  const { updateResumeData } = useResume();
  const allWorks = useExperiences((state) => state.experiences);
  const [expanded, setExpanded] = useState<string | false>(false);
  const removeExperience = useExperiences.getState().remove;
  const onMoveUp = useExperiences.getState().onmoveup;
  const onMoveDown = useExperiences.getState().onmovedown;

  useEffect(() => {
    if (allWorks.length > 0) {
      setExpanded(allWorks[0].id);
    }
  }, [allWorks]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleExperienceUpdate = () => {
    const existingData = localStorage.getItem('userDetailsData');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = {
        ...parsedData,
        resumeData: {
          ...parsedData.resumeData,
          work: allWorks,
        },
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
      updateResumeData('work', allWorks);
    }
  };

  useEffect(() => {
    handleExperienceUpdate();
  }, [allWorks]);

  return (
    <MoveEditSection
      title="Experience"
      expanded={expanded === allWorks[0]?.id}
      clickHandler={() => handleChange(allWorks[0]?.id, expanded !== allWorks[0]?.id)}
      length={allWorks.length}
      index={0}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onDelete={removeExperience}
    >
      <div>
        {allWorks.map((work, index) => (
          <Accordion
            key={work.id}
            expanded={expanded === work.id}
            onChange={(_, isExpanded) => handleChange(work.id, isExpanded)}
          >
            <AccordionSummary>{work.name || 'New Experience'}</AccordionSummary>
            <AccordionDetails>
              <Experience experienceInfo={work} currentIndex={index} />
            </AccordionDetails>
          </Accordion>
        ))}
        <AddExperience handleChange={handleChange} isEmpty={allWorks.length === 0} />
      </div>
    </MoveEditSection>
  );
};

export default ExperienceLayout;

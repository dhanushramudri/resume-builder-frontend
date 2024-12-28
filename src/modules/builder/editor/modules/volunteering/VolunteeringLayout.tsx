import { useEffect, useState } from 'react';
import { useVolunteeringStore } from '@/stores/volunteering';
import AddVolunteeringExp from './components/AddVolunteering';
import Volunteering from './components/Volunteer';
import MoveEditSection from '@/helpers/common/components/MoveEditSectionContainer';
import { IVolunteeringItem } from '@/stores/volunteering.interface';
import { useResume } from '@/context/ResumeContext';

const VolunteeringLayout = () => {
  const volunteeredExps = useVolunteeringStore((state) => state.volunteeredExps);
  const updateVolunteeringExp = useVolunteeringStore((state) => state.updateVolunteeringExp);
  const removeVolunteering = useVolunteeringStore((state) => state.remove);
  const onMoveUp = useVolunteeringStore((state) => state.onmoveup);
  const onMoveDown = useVolunteeringStore((state) => state.onmovedown);
  const { updateResumeData } = useResume();

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (volunteeredExps.length > 0) {
      setExpanded(volunteeredExps[0].id);
    }
  }, [volunteeredExps]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleVolunteeringUpdate = (updatedVolunteering: IVolunteeringItem[]) => {
    // Update resume context
    updateResumeData('volunteer', updatedVolunteering);

    // Update local storage
    const existingData = localStorage.getItem('userDetailsData');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = {
        ...parsedData,
        resumeData: {
          ...parsedData.resumeData,
          volunteer: updatedVolunteering,
        },
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
    }
  };

  const handleSingleVolunteeringUpdate = (
    index: number,
    updatedVolunteering: IVolunteeringItem
  ) => {
    // Update in Zustand store
    updateVolunteeringExp(index, updatedVolunteering);

    // Update in resume context and local storage
    const newVolunteering = [...volunteeredExps];
    newVolunteering[index] = updatedVolunteering;
    handleVolunteeringUpdate(newVolunteering);
  };

  if (volunteeredExps.length === 0) {
    return (
      <AddVolunteeringExp
        onSubmit={(newVolunteering) => {
          handleVolunteeringUpdate([newVolunteering]);
        }}
      />
    );
  }

  return (
    <>
      {volunteeredExps.map((volunteeringInfo, index) => (
        <MoveEditSection
          key={volunteeringInfo.id}
          expanded={expanded === volunteeringInfo.id}
          onChange={() => handleChange(volunteeringInfo.id, expanded !== volunteeringInfo.id)}
          onMoveUp={() => onMoveUp(index)}
          onMoveDown={() => onMoveDown(index)}
          onDelete={() => removeVolunteering(index)}
        >
          <Volunteering
            volunteeringInfo={volunteeringInfo}
            onUpdate={(updatedVolunteering) => {
              handleSingleVolunteeringUpdate(index, updatedVolunteering);
            }}
          />
        </MoveEditSection>
      ))}
      <AddVolunteeringExp
        onSubmit={(newVolunteering) => {
          handleVolunteeringUpdate([...volunteeredExps, newVolunteering]);
        }}
      />
    </>
  );
};

export default VolunteeringLayout;

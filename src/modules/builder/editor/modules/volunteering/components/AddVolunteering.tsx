// AddVolunteeringExp.tsx
import { useMemo } from 'react';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { useVolunteeringStore } from '@/stores/volunteering';
import { IVolunteeringItem } from '@/stores/volunteering.interface';

const NEW_VOLUNTEER_EXP: IVolunteeringItem = {
  organization: '',
  position: '',
  startDate: null,
  isVolunteeringNow: false,
  endDate: null,
  summary: '',
  id: '',
  url: '',
  highlights: [],
};

interface AddVolunteeringExpProps {
  onSubmit: (newVolunteering: IVolunteeringItem) => void;
  isEmpty?: boolean;
}

const AddVolunteeringExp = ({ onSubmit, isEmpty = false }: AddVolunteeringExpProps) => {
  const onCreateVolunteeringExperience = () => {
    const uniqueExpandedId = `volunteer-${Math.random()}`;
    const newVolunteering = {
      ...NEW_VOLUNTEER_EXP,
      id: uniqueExpandedId,
    };
    onSubmit(newVolunteering);
  };

  const buttonCaption = useMemo(() => {
    return isEmpty ? '+ Add a volunteering experience' : '+ Add more';
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateVolunteeringExperience} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddVolunteeringExp;

import { useMemo } from 'react';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { useEducations } from '@/stores/education';
import { IEducation } from '@/stores/education.interface';

interface AddEducationProps {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
  onAdd: (newEducation: IEducation) => void;
}

const NEW_EDUCATION: IEducation = {
  institution: '',
  studyType: '',
  area: '',
  startDate: '',
  endDate: '',
  score: '',
  courses: [],
  id: '',
  isStudyingHere: false,
};

const AddEducation: React.FC<AddEducationProps> = ({ handleChange, isEmpty, onAdd }) => {
  const addEducation = useEducations((state) => state.add);

  const onCreateEducation = () => {
    const uniqueExpandedId = `${Math.random()}`;
    const newEducation = {
      ...NEW_EDUCATION,
      id: uniqueExpandedId,
    };
    addEducation(newEducation);
    onAdd(newEducation);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    return isEmpty ? '+ Add an education' : '+ Add more';
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateEducation} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddEducation;

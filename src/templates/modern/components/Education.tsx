// Education.tsx
import { IEducation } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from '@/helpers/utils';
import { useRef, useEffect } from 'react';
import { useEducations } from '../../../stores/education';
import { scrollToElement } from '../../../helpers/utils/index';

interface EducationSectionProps {
  education: IEducation[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const educationRef = useRef<null | HTMLDivElement>(null);
  const educationStore = useEducations();

  useEffect(() => {
    const unsubscribe = useEducations.subscribe(() => {
      scrollToElement(educationRef);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="mb-3" ref={educationRef}>
      <SectionHeading title="Education" />
      {education.map((item: IEducation, index: number) => (
        <div key={index} className="py-2">
          <div>
            <SectionTitle label={`${item.studyType} - ${item.area}`} textSize="md" />
            <div className="">
              <SectionSubtitle label={item.institution} />
              <div className="flex gap-3">
                <p className="text-xs">
                  {`${dateParser(item.startDate)} - ${
                    item.isStudyingHere ? 'present' : dateParser(item.endDate)
                  }`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

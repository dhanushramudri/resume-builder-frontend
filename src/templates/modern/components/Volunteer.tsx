import { IVolunteer } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser, scrollToElement } from '@/helpers/utils';
import { SectionList } from '../atoms/SectionList';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { useRef, useEffect } from 'react';
import { useVolunteeringStore } from '../../../stores/volunteering';

interface VolunteerSectionProps {
  volunteer: IVolunteer[];
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ volunteer }) => {
  const volunteerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = useVolunteeringStore.subscribe(() => {
      if (volunteerRef.current) {
        scrollToElement(volunteerRef);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="mb-3" ref={volunteerRef}>
      <SectionHeading title="Volunteering" />
      {volunteer.map((item: IVolunteer, index: number) => (
        <div key={`volunteer-${item.id || index}`} className="py-2">
          <div>
            <SectionTitle label={item.organization} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.position} />
              <div className="flex gap-3">
                <p className="text-xs">
                  {dateParser(item.startDate)} -{' '}
                  {item.isVolunteeringNow ? 'Present' : dateParser(item.endDate)}
                </p>
              </div>
            </div>
            <SectionList>
              <HTMLRenderer htmlString={item.summary} />
            </SectionList>
          </div>
        </div>
      ))}
    </div>
  );
};

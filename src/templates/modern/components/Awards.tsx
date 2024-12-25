import { useRef } from 'react';
import dayjs from 'dayjs';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { IAward } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from '@/helpers/utils';
import { useAwards } from '../../../stores/awards';
import { scrollToElement } from '../../../helpers/utils/index';

// Update the interface to handle both string and Dayjs dates
interface IAwardProps {
  awardsReceived: Array<Omit<IAward, 'date'> & { date: string | dayjs.Dayjs }>;
}

export const AwardSection: React.FC<IAwardProps> = ({ awardsReceived }) => {
  const awardsRef = useRef<null | HTMLDivElement>(null);

  useAwards.subscribe(() => {
    scrollToElement(awardsRef);
  });

  const formatDate = (date: string | dayjs.Dayjs) => {
    // If it's already a Dayjs object, use it directly
    if (dayjs.isDayjs(date)) {
      return dateParser(date);
    }
    // If it's a string, convert it to Dayjs
    return dateParser(dayjs(date));
  };

  return (
    <div className="mb-2" ref={awardsRef}>
      <SectionHeading title="Awards" />

      {awardsReceived.map((award, index) => (
        <div key={index} className="pb-2">
          <SectionTitle label={award.title} />
          <div className="flex justify-between awards-center">
            <SectionSubtitle label={award.awarder} />
            <div>
              <p className="text-xs">{formatDate(award.date)}</p>
            </div>
          </div>
          <SectionList>
            <HTMLRenderer htmlString={award.summary} />
          </SectionList>
        </div>
      ))}
    </div>
  );
};

import { dateParser } from '@/helpers/utils';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { IWorkIntrf } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { useRef } from 'react';
import { scrollToElement } from '../../../helpers/utils/index';
import { useExperiences } from '@/stores/experience';

export const WorkSection = ({ work }: { work: IWorkIntrf[] }) => {
  const workRef = useRef<null | HTMLDivElement>(null);

  useExperiences.subscribe(() => {
    scrollToElement(workRef);
  });

  return (
    <div className="mb-3" ref={workRef}>
      <SectionHeading title="Experience" />

      {work.map((item: IWorkIntrf, index: number) => {
        return (
          <div key={index} className="py-2">
            <SectionTitle label={item.name} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.position} />
              <div>
                <p className="text-xs">
                  {dateParser(item.startDate)} -{' '}
                  {item.isWorkingHere ? 'present' : dateParser(item.endDate)}
                </p>
              </div>
            </div>

            <SectionList>
              <HTMLRenderer htmlString={item.summary} />
            </SectionList>
          </div>
        );
      })}
    </div>
  );
};

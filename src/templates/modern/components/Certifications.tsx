import { useRef } from 'react';
import dayjs from 'dayjs';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from '@/helpers/utils';
import { scrollToElement } from '../../../helpers/utils/index';
import { useCertifications } from '@/stores/certifications';

// Interface for certification data
interface ICertification {
  id: string;
  title: string;
  date: string | dayjs.Dayjs;
  authority: string;
  summary: string;
}

interface ICertificationProps {
  certifications: ICertification[];
}

export const CertificationSection: React.FC<ICertificationProps> = ({ certifications }) => {
  const certificationsRef = useRef<null | HTMLDivElement>(null);

  useCertifications.subscribe(() => {
    scrollToElement(certificationsRef);
  });

  const formatDate = (date: string | dayjs.Dayjs) => {
    if (dayjs.isDayjs(date)) {
      return dateParser(date);
    }
    return dateParser(dayjs(date));
  };

  return (
    <div className="mb-2" ref={certificationsRef}>
      <SectionHeading title="Certifications" />

      {certifications.map((certification) => (
        <div key={certification.id} className="pb-2">
          <SectionTitle label={certification.title} />
          <div className="flex justify-between items-center">
            <SectionSubtitle label={certification.authority} />
            <div>
              <p className="text-xs">{formatDate(certification.date)}</p>
            </div>
          </div>
          <SectionList>
            <HTMLRenderer htmlString={certification.summary} />
          </SectionList>
        </div>
      ))}
    </div>
  );
};

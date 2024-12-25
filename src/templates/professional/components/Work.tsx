import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { dateParser } from '@/helpers/utils';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { SectionHeading } from '@/templates/modern/atoms/SectionHeading';

interface IWorkItem {
  id: string;
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  isWorkingHere: boolean;
  summary: string;
  highlights: string[];
  years: string;
  type: string;
}

interface WorkProps {
  work?: IWorkItem[];
}

const Work: React.FC<WorkProps> = ({ work = [] }) => {
  if (!work || work.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <SectionHeading title="Experience" />

      {work.map((item, index) => (
        <Timeline key={item.id || index} className="p-0 flex-initial text-[1em]">
          <TimelineItem className="before:hidden text-[1em]">
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {index !== work.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent className="pr-0">
              <div className="flex justify-between items-end">
                <div className="text-medium">{item.name}</div>
                <div className="italic text-xs">
                  {dateParser(item.startDate)} -{' '}
                  {item.isWorkingHere ? 'present' : dateParser(item.endDate)}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="font-medium text-xs">{item.position}</div>
                <div className="italic text-xs">{item.years}</div>
              </div>
              <HTMLRenderer htmlString={item.summary} />
              {item.highlights && item.highlights.length > 0 && (
                <ul className="list-disc ml-4 mt-2">
                  {item.highlights.map((highlight, idx) => (
                    <li key={`${item.id}-highlight-${idx}`} className="text-sm">
                      <HTMLRenderer htmlString={highlight} />
                    </li>
                  ))}
                </ul>
              )}
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </div>
  );
};

export default Work;

import { DateRange } from '../atoms/DateRange';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';

interface ExperienceItem {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const ExperienceSection = ({ experience }: { experience: ExperienceItem[] }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Experience</h2>
    {experience.map((item, index) => (
      <div key={index} className="mb-3">
        <p className="text-md font-medium">{item.company}</p>
        <p className="text-sm text-gray-600">{item.title}</p>
        <p className="text-xs text-gray-500">{`${item.startDate} - ${item.endDate}`}</p>
        <p className="text-sm">{item.description}</p>
      </div>
    ))}
  </div>
);

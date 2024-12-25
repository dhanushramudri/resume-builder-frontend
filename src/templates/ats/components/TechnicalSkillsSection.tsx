import { SectionHeading } from '../atoms/SectionHeading';
import { SkillBadge } from '../atoms/SkillBadge';

export const TechnicalSkillsSection = ({
  title,
  skills,
}: {
  title: string;
  skills: (string | { name: string; level: string })[];
}) => (
  <div>
    <SectionHeading title={title} />
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} />
      ))}
    </div>
  </div>
);

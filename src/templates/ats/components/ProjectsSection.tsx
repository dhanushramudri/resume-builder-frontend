import { SectionHeading } from '../atoms/SectionHeading';
import { SectionItem } from '../atoms/SectionItem';

interface ProjectItem {
  name: string;
  techStack: string;
  description: string;
}

export const ProjectsSection = ({ projects }: { projects: ProjectItem[] }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Projects</h2>
    {projects.map((project, index) => (
      <div key={index} className="mb-3">
        <p className="text-md font-medium">{project.name}</p>
        <p className="text-sm text-gray-600">{project.techStack}</p>
        <p className="text-sm">{project.description}</p>
      </div>
    ))}
  </div>
);

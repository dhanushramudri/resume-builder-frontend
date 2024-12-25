export const SkillBadge = ({ skill }: { skill: string | { name: string; level: string } }) => {
  if (typeof skill === 'object') {
    return (
      <span className="px-2 py-1 bg-gray-200 rounded text-xs">
        {skill.name} ({skill.level})
      </span>
    );
  }

  return <span className="px-2 py-1 bg-gray-200 rounded text-xs">{skill}</span>;
};

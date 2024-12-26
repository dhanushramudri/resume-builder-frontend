import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import React from 'react';

interface AchievementsProps {
  achievements: string[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  // Parse the HTML string and convert it into an array of items
  const parseAchievements = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(achievements.join(''), 'text/html');
    // Extract all <li> elements
    const listItems = Array.from(doc.querySelectorAll('li')).map((li) => li.textContent);
    return listItems;
  };

  const parsedAchievements = parseAchievements();

  return (
    <div>
      {parsedAchievements.map((achievement, index) => (
        <div key={index}>{achievement && <HTMLRenderer htmlString={achievement} />}</div>
      ))}
    </div>
  );
};

export default Achievements;

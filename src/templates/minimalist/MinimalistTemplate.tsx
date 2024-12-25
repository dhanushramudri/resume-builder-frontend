import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { Objective } from '../modern/components/Objective';
import styled from '@emotion/styled';
import { useResume } from '@/context/ResumeContext';

const ProgressBar = styled.div`
  width: ${(props: { level: number }) => props.level}%;
  height: 3px;
  background-color: ${(props) => props.theme.highlighterColor};
`;

// Section wrapper to prevent page breaks
const Section = styled.div`
  page-break-inside: avoid;
  break-inside: avoid;
  width: 100%;
`;

interface Skill {
  name: string;
  level: number;
}

function RatedSkills({ items }: { items: Skill[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      {items?.map(({ name, level }) => (
        <div key={name} className="flex flex-col gap-0.5">
          <p className="text-xs font-medium">{name}</p>
          <div className="w-full bg-gray-100 rounded-sm">
            <ProgressBar level={level} className="rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface Profile {
  network: string;
  url: string;
}

function SocialProfiles({ profiles }: { profiles: Profile[] }) {
  const socialIcons: { [key: string]: string } = {
    github: '🔗',
    linkedin: '🔗',
    twitter: '🔗',
  };

  return (
    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
      {profiles.map(
        (profile) =>
          profile.url && (
            <a
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              {socialIcons[profile.network.toLowerCase()] || '🔗'} {profile.network}
            </a>
          )
      )}
    </div>
  );
}

export default function MinimalistTemplate() {
  const { resumeData } = useResume();

  if (!resumeData || !resumeData?.basics) {
    return <div>Loading...</div>;
  }

  const { basics, skills, work, education, activities, awards } = resumeData;

  return (
    <div className="p-6 max-w-[800px] mx-auto h-auto print:p-4">
      {/* Header Section */}
      <Section className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-semibold mb-1">{basics.name}</h1>
        <div className="text-gray-600 mb-2">
          {basics.label && <p className="text-lg">{basics.label}</p>}
          <p className="text-sm">
            {basics.location?.city && `${basics.location.city} • `}
            {basics.phone && `${basics.phone} • `}
            {basics.email}
          </p>
          {basics.totalExp && <p className="text-sm mt-0.5">Experience: {basics.totalExp}</p>}
        </div>
        {basics.profiles && <SocialProfiles profiles={basics.profiles} />}
      </Section>

      {/* Summary Section */}
      <SectionValidator value={basics.summary}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{basics.summary}</p>
        </Section>
      </SectionValidator>

      {/* Skills Section */}
      <Section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Technical Skills</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-4">
            <SectionValidator value={skills.languages}>
              <div>
                <h3 className="text-sm font-medium mb-1">Programming Languages</h3>
                <RatedSkills
                  items={skills.languages.filter(
                    (lang: Skill) => !['English', 'Telugu'].includes(lang.name)
                  )}
                />
              </div>
            </SectionValidator>

            <SectionValidator value={skills.frameworks}>
              <div>
                <h3 className="text-sm font-medium mb-1">Frameworks</h3>
                <RatedSkills items={skills.frameworks} />
              </div>
            </SectionValidator>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SectionValidator value={skills.databases}>
              <div>
                <h3 className="text-sm font-medium mb-1">Databases</h3>
                <RatedSkills items={skills.databases.filter((db: Skill) => db.name)} />
              </div>
            </SectionValidator>

            <SectionValidator value={skills.tools}>
              <div>
                <h3 className="text-sm font-medium mb-1">Tools</h3>
                <RatedSkills items={skills.tools.filter((tool: Skill) => tool.name)} />
              </div>
            </SectionValidator>
          </div>
        </div>
      </Section>

      {/* Work Experience Section */}
      <SectionValidator value={work}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          {work.map((job: any, index: number) => (
            <Section key={job.id || index} className="mb-3">
              <div className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium">{job.name}</h3>
                    <p className="text-sm text-gray-600">{job.position}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {job.startDate} - {job.isWorkingHere ? 'Present' : job.endDate}
                  </p>
                </div>
                <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: job.summary }} />
              </div>
            </Section>
          ))}
        </Section>
      </SectionValidator>

      {/* Education Section */}
      <SectionValidator value={education}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <EducationSection education={education} />
        </Section>
      </SectionValidator>

      {/* Achievements Section */}
      <SectionValidator value={activities?.achievements}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Achievements & Certifications</h2>
          <div
            className="text-sm space-y-1"
            dangerouslySetInnerHTML={{ __html: activities.achievements }}
          />
        </Section>
      </SectionValidator>

      {/* Projects Section */}
      {/* <SectionValidator value={activities?.involvements}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Key Projects & Contributions</h2>
          <div
            className="text-sm space-y-1"
            dangerouslySetInnerHTML={{ __html: activities.involvements }}
          />
        </Section>
      </SectionValidator> */}

      {/* Awards Section */}
      <SectionValidator value={awards}>
        <Section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Awards</h2>
          {awards.map(
            (award: {
              id: string;
              title: string;
              awarder: string;
              date: string;
              summary: string;
            }) => (
              <div key={award.id} className="mb-2">
                <p className="text-sm font-medium">{award.title}</p>
                <p className="text-xs text-gray-600">
                  {award.awarder} • {award.date}
                </p>
                <div
                  className="text-sm mt-0.5"
                  dangerouslySetInnerHTML={{ __html: award.summary }}
                />
              </div>
            )
          )}
        </Section>
      </SectionValidator>
    </div>
  );
}

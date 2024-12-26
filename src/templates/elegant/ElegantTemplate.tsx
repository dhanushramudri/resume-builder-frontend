import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { Objective } from '../modern/components/Objective';
import styled from '@emotion/styled';
import { AwardSection } from '../modern/components/Awards';
import { CertificationSection } from '../modern/components/Certifications';
import { useResume } from '@/context/ResumeContext';

const ProgressBar = styled.div`
  width: ${(props: { level: number }) => props.level}%;
  height: 4px;
  background-color: ${(props) => props.theme.highlighterColor};
  @media print {
    background-color: #2563eb;
  }
`;

const PageSection = styled.div`
  page-break-inside: avoid;
  break-inside: avoid;
`;

interface Skill {
  name: string;
  level: number;
}

interface Work {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

function RatedSkills({ items }: { items: Skill[] }) {
  return (
    <div className="space-y-3">
      {items?.map(({ name, level }) => (
        <div key={name} className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">{name}</p>
            <span className="text-xs text-gray-600">{level}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full">
            <ProgressBar level={level} className="rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileLinks({ profiles }: { profiles: { network: string; url: string }[] }) {
  const socialIcons: { [key: string]: string } = {
    github: '📚',
    linkedin: '💼',
    twitter: '🐦',
    hackerrank: '💻',
    leetcode: '🎯',
    codechef: '👨‍🍳',
    hackerearth: '💻',
  };

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      {profiles.map(
        (profile) =>
          profile.url && (
            <a
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
            >
              <span className="flex-shrink-0">
                {socialIcons[profile.network.toLowerCase() as string] || '🔗'}
              </span>
              <span className="capitalize truncate">{profile.network}</span>
            </a>
          )
      )}
    </div>
  );
}

export default function ElegantTemplate() {
  const { resumeData } = useResume();

  if (!resumeData || !resumeData?.basics) {
    return <div>Loading...</div>;
  }

  const { basics, skills, work, education, activities, awards } = resumeData;

  return (
    <div className="grid grid-cols-3 gap-6 p-6 max-w-[1000px] mx-auto bg-white">
      {/* Left column: Personal Info & Skills */}
      <div className="col-span-1 space-y-6">
        <PageSection>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            {/* Profile Section */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-1">{basics.name}</h1>
              <p className="text-gray-600 font-medium mb-2">{basics.label}</p>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p>{basics.location?.city}</p>
                <p>{basics.phone}</p>
                <p>{basics.email}</p>
              </div>
              {basics.totalExp && (
                <p className="text-sm mt-3 font-medium">Experience: {basics.totalExp}</p>
              )}
            </div>

            {/* Social Profiles */}
            <div className="mb-8">
              <ProfileLinks profiles={basics.profiles} />
            </div>

            {/* Technical Skills */}
            <div className="space-y-6">
              <SectionValidator value={skills.languages}>
                <div>
                  <h3 className="text-md font-semibold mb-3">Programming</h3>
                  <RatedSkills
                    items={skills.languages.filter(
                      (lang: { name: string }) => !['English', 'Telugu'].includes(lang.name)
                    )}
                  />
                </div>
              </SectionValidator>

              <SectionValidator value={skills.frameworks}>
                <div>
                  <h3 className="text-md font-semibold mb-3">Frameworks</h3>
                  <RatedSkills items={skills.frameworks} />
                </div>
              </SectionValidator>

              <SectionValidator value={skills.databases}>
                <div>
                  <h3 className="text-md font-semibold mb-3">Databases</h3>
                  <RatedSkills items={skills.databases.filter((db: { name: string }) => db.name)} />
                </div>
              </SectionValidator>
            </div>
          </div>
        </PageSection>

        {/* Languages Section */}
        <PageSection>
          <SectionValidator value={skills.languages}>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Languages</h2>
              <RatedSkills
                items={skills.languages.filter((lang: { name: string }) =>
                  ['English', 'Telugu'].includes(lang.name)
                )}
              />
            </div>
          </SectionValidator>
        </PageSection>

        {/* Education Section */}
        <PageSection>
          <SectionValidator value={education}>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                {education.map(
                  (edu: {
                    institution: string;
                    studyType: string;
                    area: string;
                    startDate: string;
                    endDate: string;
                  }) => (
                    <div key={edu.institution} className="text-sm">
                      <p className="font-medium">
                        {edu.studyType} - {edu.area}
                      </p>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500 text-xs">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </SectionValidator>
        </PageSection>
      </div>

      {/* Right column: Professional Details */}
      <div className="col-span-2 space-y-6">
        {/* Summary & Objective */}
        <PageSection>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <SectionValidator value={basics.summary}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Professional Summary</h2>
                <p className="text-sm leading-relaxed text-gray-700">{basics.summary}</p>
              </div>
            </SectionValidator>

            <SectionValidator value={basics.objective}>
              <div>
                <h2 className="text-lg font-semibold mb-3">Career Objective</h2>
                <p className="text-sm leading-relaxed text-gray-700">{basics.objective}</p>
              </div>
            </SectionValidator>
          </div>
        </PageSection>

        {/* Work Experience */}
        <PageSection>
          <SectionValidator value={work}>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Professional Experience</h2>
              <div className="space-y-6">
                {work.map((job: Work) => (
                  <div key={job.name} className="text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.name}</h3>
                        <p className="text-gray-600">{job.position}</p>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {job.startDate} - {job.endDate || 'present'}
                      </p>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
                      {job.highlights.map((highlight: string, index: number) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </SectionValidator>
        </PageSection>

        {/* Key Projects */}
        {/* <PageSection>
          <SectionValidator value={activities?.involvements}>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-3">Key Projects & Achievements</h2>
              <div className="text-sm space-y-2 text-gray-700">
                {activities.involvements
                  .split('<br/>')
                  .map((involvement: string, index: number) => (
                    <p key={index}>{involvement.trim()}</p>
                  ))}
              </div>
            </div>
          </SectionValidator>
        </PageSection> */}

        {/* Certifications & Awards */}
        <PageSection>
          <div className="grid grid-cols-2 gap-6">
            <SectionValidator value={resumeData?.awards}>
              <AwardSection awardsReceived={resumeData?.awards} />
            </SectionValidator>
            <SectionValidator value={resumeData?.certifications}>
              <CertificationSection certifications={resumeData?.certifications} />
            </SectionValidator>
          </div>
        </PageSection>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
          .border {
            border-color: #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
}

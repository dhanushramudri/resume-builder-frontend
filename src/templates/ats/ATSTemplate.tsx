import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import { EducationSection } from '../modern/components/Education';
import Involvement from '../professional/components/Involvement';
import { useResume } from '@/context/ResumeContext';

export default function TwoColumnTemplate() {
  const { resumeData } = useResume();
  const basics = resumeData?.basics || {};
  const skills = resumeData?.skills || {};
  const involvements = resumeData?.activities?.involvements || [];

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white p-6 print:p-4">
      {/* Header Section */}
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{basics.name}</h1>
        {basics.label && <h2 className="text-xl text-gray-700 mb-2">{basics.label}</h2>}
        <div className="flex flex-wrap gap-4 text-gray-600">
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location?.city && <span>{basics.location.city}</span>}
          {basics.url && <span>{basics.url}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-row print:flex-row">
        {/* Left Column - 70% width */}
        <div className="w-[70%] pr-6 print:w-[70%] print:pr-6">
          {/* Professional Summary */}
          <Section title="Professional Summary">
            <p className="text-gray-700">{basics.summary}</p>
          </Section>

          {/* Work Experience */}
          <SectionValidator value={resumeData?.work}>
            <WorkSection work={resumeData?.work} />
          </SectionValidator>

          {/* Key Projects */}
          <Section title="Key Projects">
            <Involvement data={involvements} />
          </Section>
        </div>

        {/* Right Column - 30% width */}
        <div className="w-[30%] print:w-[30%] border-l pl-6">
          {/* Education - Moved to top of right column */}
          <Section title="Education">
            <EducationSection education={resumeData?.education || []} />
          </Section>

          {/* Technical Skills */}
          <Section title="Technical Skills">
            {skills.languages?.length > 0 && (
              <SkillGroup
                title="Programming Languages"
                skills={skills.languages.filter(
                  (s: { name: string }) => !['English', 'Telugu'].includes(s.name)
                )}
              />
            )}

            {skills.frameworks?.length > 0 && (
              <SkillGroup title="Frameworks" skills={skills.frameworks} />
            )}

            {skills.technologies?.length > 0 && (
              <SkillGroup title="Technologies" skills={skills.technologies} />
            )}

            {skills.databases?.length > 0 && (
              <SkillGroup title="Databases" skills={skills.databases} />
            )}

            {skills.tools?.length > 0 && <SkillGroup title="Tools" skills={skills.tools} />}
          </Section>

          {/* Languages */}
          <Section title="Languages">
            <div className="space-y-1">
              {skills.languages
                ?.filter((lang: { name: string }) => ['English', 'Telugu'].includes(lang.name))
                .map((lang: { name: string }) => (
                  <div key={lang.name} className="text-gray-700">
                    {lang.name}
                  </div>
                ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Force two-column layout in print */
          .print\\:flex-row {
            display: flex !important;
            flex-direction: row !important;
          }

          .print\\:w-\\[70\\%\\] {
            width: 70% !important;
          }

          .print\\:w-\\[30\\%\\] {
            width: 30% !important;
          }

          .print\\:pr-6 {
            padding-right: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

// Section component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 break-inside-avoid">
      <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// SkillGroup component
interface SkillGroupProps {
  title: string;
  skills: { name: string }[];
}

function SkillGroup({ title, skills }: SkillGroupProps) {
  if (!skills?.length) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: { name: string }) => (
          <span key={skill.name} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

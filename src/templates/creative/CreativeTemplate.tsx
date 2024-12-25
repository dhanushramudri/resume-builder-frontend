import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { AwardSection } from '../modern/components/Awards';
import { CertificationSection } from '../modern/components/Certifications';
import { Objective } from '../modern/components/Objective';
import Achievements from '../professional/components/Achievements';
import { useResume } from '@/context/ResumeContext';

const CreativeTemplate = () => {
  const { resumeData } = useResume();


  const achievements = resumeData?.activities?.achievements || [];
  console.log('resume data is creative one ', resumeData);

  // Fallback values for basics
  const name = resumeData?.basics?.name || 'Your Name';
  const headline = resumeData?.basics?.headline || 'Your Headline';
  const summary = resumeData?.basics?.summary || 'Professional summary goes here.';

  return (
    <div className="max-w-[850px] mx-auto bg-white p-8">
      {/* Header Section */}
      <header className="mb-6 print:mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="text-lg text-gray-700">{headline}</div>
        <div className="mt-2">
          <BasicIntro basics={resumeData?.basics} />
        </div>
      </header>

      {/* Professional Summary */}
      <SectionValidator value={summary}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Professional Summary
          </h2>
          <div className="text-gray-700 leading-relaxed">{summary}</div>
        </section>
      </SectionValidator>

      {/* Work Experience */}
      <SectionValidator value={resumeData?.work}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Professional Experience
          </h2>
          <WorkSection work={resumeData?.work} />
        </section>
      </SectionValidator>

      {/* Education */}
      <SectionValidator value={resumeData?.education}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Education
          </h2>
          <EducationSection education={resumeData?.education} />
        </section>
      </SectionValidator>

      {/* Skills Sections */}
      <section className="mb-6 print:mb-4 page-break-inside-avoid">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
          Technical Skills
        </h2>

        <SectionValidator value={resumeData?.skills?.languages}>
          <SkillsSection title="Languages" list={resumeData?.skills?.languages} />
        </SectionValidator>

        <SectionValidator value={resumeData?.skills?.technologies}>
          <SkillsSection title="Technologies" list={resumeData?.skills?.technologies} />
        </SectionValidator>

        <SectionValidator value={resumeData?.skills?.frameworks}>
          <SkillsSection
            title="Frameworks & Libraries"
            list={(resumeData?.skills?.frameworks ?? []).concat(
              resumeData?.skills?.libraries ?? []
            )}
          />
        </SectionValidator>
      </section>

      {/* Certifications */}
      <SectionValidator value={resumeData?.certifications}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Certifications
          </h2>
          <CertificationSection certifications={resumeData?.certifications} />
        </section>
      </SectionValidator>

      {/* Awards */}
      <SectionValidator value={resumeData?.awards}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Awards & Recognition
          </h2>
          <AwardSection awardsReceived={resumeData?.awards} />
        </section>
      </SectionValidator>

      {/* Achievements */}
      <SectionValidator value={achievements.length > 0}>
        <section className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
            Key Achievements
          </h2>
          <Achievements achievements={achievements} />
        </section>
      </SectionValidator>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          @page {
            margin: 0.5in;
            size: letter;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default CreativeTemplate;

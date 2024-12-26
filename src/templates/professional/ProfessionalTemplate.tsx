import React, { useContext } from 'react';
import styled from '@emotion/styled';

import AboutMe from './components/AboutMe';
import Achievements from './components/Achievements';
import BasicIntro from './components/BasicIntro';
import { Education } from './components/Education';
import Involvement from './components/Involvement';
import { Objective } from './components/Objective';
import RatedSkills from './components/RatedSkills';
import { Section } from './components/Section';
import UnratedSkills from './components/UnratedSkills';
import Work from './components/Work';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { AwardSection } from '../modern/components/Awards';
import { CertificationSection } from '../modern/components/Certifications';
import { useResume } from '@/context/ResumeContext';

const ResumeContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 40px 25px;
  column-gap: 10px;

  @media print {
    border: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  font-size: 12px;
`;

export default function ProfessionalTemplate() {
  const { resumeData } = useResume();
  const basics = resumeData?.basics || {};
  const skills = resumeData?.skills || {
    languages: [],
    frameworks: [],
    technologies: [],
    libraries: [],
    databases: [],
    practices: [],
    tools: [],
  };
  const involvements = resumeData?.activities?.involvements || [];
  const achievements = resumeData?.activities?.achievements || [];
  const fullName = `${basics?.firstName || ''} ${basics?.lastName || ''}`;

  return (
    <ResumeContainer>
      <LeftSection>
        <Section
          title={basics?.name || 'Your Name'}
          profiles={basics?.profiles || []}
          portfolioUrl={basics?.url || ''}
          titleClassname="text-xl font-medium"
        >
          <BasicIntro basics={basics} />
        </Section>
        <SectionValidator value={resumeData?.work}>
          <Section title="Work Experience | Projects">
            <Work work={resumeData?.work || []} />
          </Section>
        </SectionValidator>

        <SectionValidator value={involvements}>
          <Section title="Key Projects / Involvements">
            <Involvement data={involvements} />
          </Section>
        </SectionValidator>

        <SectionValidator value={resumeData?.awards}>
          <Section title="Awards">
            <AwardSection awardsReceived={resumeData?.awards} />
          </Section>
        </SectionValidator>
        <SectionValidator value={resumeData?.certifications}>
          <Section title="Certifications">
            <CertificationSection certifications={resumeData?.certifications} />
          </Section>
        </SectionValidator>
      </LeftSection>

      <RightSection>
        <SectionValidator value={basics?.summary}>
          <Section title="Summary">
            <AboutMe summary={basics?.summary || ''} profileImage={basics?.image || ''} />
          </Section>
        </SectionValidator>

        <SectionValidator value={basics?.objective}>
          <Section title="Career Objective">
            <Objective objective={basics?.objective || ''} />
          </Section>
        </SectionValidator>

        <SectionValidator value={[...(skills?.languages || []), ...(skills?.frameworks || [])]}>
          <Section title="Technical Expertise">
            <RatedSkills items={[...(skills?.languages || []), ...(skills?.frameworks || [])]} />
          </Section>
        </SectionValidator>

        <SectionValidator
          value={[
            ...(skills?.technologies || []),
            ...(skills?.libraries || []),
            ...(skills?.databases || []),
          ]}
        >
          <Section title="Skills / Exposure">
            <UnratedSkills
              items={[
                ...(skills?.technologies || []),
                ...(skills?.libraries || []),
                ...(skills?.databases || []),
              ]}
            />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills?.practices || []}>
          <Section title="Methodology / Approach">
            <UnratedSkills items={skills?.practices || []} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills?.tools || []}>
          <Section title="Tools">
            <UnratedSkills items={skills?.tools || []} />
          </Section>
        </SectionValidator>

        <SectionValidator value={resumeData?.education}>
          <Section title="Education">
            <Education education={resumeData?.education || []} />
          </Section>
        </SectionValidator>
      </RightSection>
    </ResumeContainer>
  );
}

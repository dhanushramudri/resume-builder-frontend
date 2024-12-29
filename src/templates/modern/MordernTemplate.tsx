import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { VolunteerSection } from './components/Volunteer';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';
import { AwardSection } from './components/Awards';
import { useContext } from 'react';
import { useResume } from '@/context/ResumeContext';

// Make sure the correct path is being used for StateContext
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import { CertificationSection } from './components/Certifications';

export default function MordernTemplate() {
  const { resumeData } = useResume();
  console.log('resume data in  modern', resumeData);
  // console.log('basics data is ', resumeData?.basics);
  // const fullName = `${resumeData?.basics?.firstName ?? ''} ${resumeData?.basics?.lastName ?? ''}`;
  // console.log('full name is ', resumeData?.basics?.name);
  console.log('summary data is modern', resumeData?.basics?.objective);

  return (
    <div className="p-2">
      <BasicIntro
        fullName={resumeData?.basics?.name}
        label={resumeData?.basics?.label}
        url={resumeData?.basics?.url}
        email={resumeData?.basics?.email}
        city={resumeData?.basics?.location?.city}
        phone={resumeData?.basics?.phone}
        image={resumeData?.basics?.image}
        profiles={resumeData?.basics?.profiles}
      />
      <div className="flex">
        <div className="basis-[60%] p-3">
          <SectionValidator value={resumeData?.basics?.summary}>
            <SummarySection summary={resumeData?.basics?.summary} />
          </SectionValidator>

          <SectionValidator value={resumeData?.work}>
            <WorkSection work={resumeData?.work} />
          </SectionValidator>

          <SectionValidator value={resumeData?.awards}>
            <AwardSection awardsReceived={resumeData?.awards} />
          </SectionValidator>
          <SectionValidator value={resumeData?.certifications}>
            <CertificationSection certifications={resumeData?.certifications} />
          </SectionValidator>
        </div>

        <div className="basis-[40%] p-3">
          <SectionValidator value={resumeData?.basics?.objective}>
            <Objective objective={resumeData?.basics?.objective} />
          </SectionValidator>

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

          <SectionValidator value={resumeData?.skills?.tools}>
            <SkillsSection title="Tools" list={resumeData?.skills?.tools} />
          </SectionValidator>

          <SectionValidator value={resumeData?.education}>
            <EducationSection education={resumeData?.education} />
          </SectionValidator>

          <SectionValidator value={resumeData?.volunteer}>
            <VolunteerSection volunteer={resumeData?.volunteer} />
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}

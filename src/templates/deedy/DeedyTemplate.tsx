import React from 'react';

import { VolunteerSection } from '../modern/components/Volunteer';
import { SummarySection } from '../modern/components/Summary';
import { AwardSection } from '../modern/components/Awards';

import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { Objective } from '../modern/components/Objective';
import { useResume } from '@/context/ResumeContext';
import { CertificationSection } from '../modern/components/Certifications';
import Involvement from '../professional/components/Involvement';
// import { Section } from '../professional/components/Section';
import Color from 'color';
import styled from '@emotion/styled';
import { BsGlobe } from 'react-icons/bs';
import { socialIcons } from '@/helpers/icons';

// Styled Components
const StyledSection = styled.div`
  border: 1px solid ${(props) => Color(props.theme.highlighterColor).alpha(0.75).toString()};
  border-radius: 5px;
  padding: 15px 10px 10px 10px;
  position: relative;
  margin-bottom: 2rem;

  .header {
    position: absolute;
    top: 0;
    transform: translate(0, -50%);
    background: white;
    padding: 0 5px;
    font-weight: 500;
    color: ${(props) => props.theme.titleColor};
  }

  .social-icons {
    position: absolute;
    top: 0;
    right: 10px;
    transform: translate(0, -50%);
    color: ${(props) => props.theme.titleColor};
  }
`;

const formatDate = (dateString: string) => {
  if (!dateString) return '';

  try {
    // Handle MM/YYYY format
    if (dateString.includes('/')) {
      const [month, year] = dateString.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    // Handle YYYY-MM-DD format
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return dateString; // Return original string if parsing fails
  }
};

interface Profile {
  network: string;
  url: string;
}

interface SocialIconsProps {
  profiles?: Profile[];
  portfolioUrl?: string;
}

const SocialIcons = ({ profiles, portfolioUrl }: SocialIconsProps) => {
  if (!profiles?.length && !portfolioUrl) return null;

  return (
    <div className="social-icons flex">
      {profiles?.map((profile) => {
        const Icon = socialIcons.get(profile.network);

        return (
          Icon &&
          profile.url && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
              key={profile.network}
            >
              <Icon className="h-5 w-5 bg-white" />
            </a>
          )
        );
      })}

      {portfolioUrl && (
        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="ml-2">
          <BsGlobe className="h-5 w-5" />
        </a>
      )}
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  titleClassname?: string;
  profiles?: Profile[];
  portfolioUrl?: string;
}

interface ContactInfoProps {
  basics?: {
    email?: string;
    phone?: string;
    location?: {
      city?: string;
      region?: string;
    };
    profiles?: Profile[];
    url?: string;
  };
}

const Section = ({
  title,
  children,
  titleClassname = '',
  profiles,
  portfolioUrl,
}: SectionProps) => {
  return (
    <StyledSection>
      <div className="header flex justify-center items-center gap-1 max-w-[60%]" title={title}>
        <span className={`${titleClassname} whitespace-nowrap overflow-hidden overflow-ellipsis`}>
          {title}
        </span>
      </div>

      {profiles && <SocialIcons profiles={profiles} portfolioUrl={portfolioUrl} />}

      <div className="content">{children}</div>
    </StyledSection>
  );
};

const ContactInfo = ({ basics }: ContactInfoProps) => {
  if (!basics) return null;
  const { email, phone, location, profiles, url } = basics;

  return (
    <Section title="Contact Information" profiles={profiles} portfolioUrl={url}>
      <div className="text-sm text-gray-600 space-y-1">
        {email && <div>{email}</div>}
        {phone && <div>{phone}</div>}
        {location?.city && location?.region && <div>{`${location.city}, ${location.region}`}</div>}
      </div>
    </Section>
  );
};

export default function DeedyTemplate() {
  const { resumeData } = useResume();
  console.log('resume data is  deedycv one ', resumeData);
  if (!resumeData) {
    return <div className="p-8 text-center">Loading resume data...</div>;
  }

  const { basics, skills, work, education, volunteer, certifications } = resumeData;

  return (
    <div className="max-w-[850px] mx-auto p-6 bg-white min-h-[1100px]">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">{basics?.name}</h1>
        {(basics?.relExp || basics?.totalExp) && (
          <div className="text-sm text-gray-600 text-center mb-4">
            {basics.relExp && <div>Relevant Experience: {basics.relExp} years</div>}
            {basics.totalExp && <div>Total Experience: {basics.totalExp} years</div>}
          </div>
        )}
        <ContactInfo basics={basics} />
      </header>

      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="w-[60%]">
          {basics?.summary && (
            <Section title="Professional Summary">
              <p className="text-gray-700">{basics.summary}</p>
            </Section>
          )}

          {work?.length > 0 && (
            <Section title="Professional Experience">
              {work.map((job, index) => (
                <div key={job.id || index} className="mb-4">
                  <h3 className="font-semibold">{job.name}</h3>
                  <div className="text-gray-600">{job.position}</div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(job.startDate)} -{' '}
                    {job.isWorkingHere ? 'Present' : formatDate(job.endDate)}
                  </div>
                  <p className="mt-1 text-gray-700">{job.summary}</p>
                  {job.highlights?.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-700">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {certifications?.length > 0 && (
            <Section title="Certifications">
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="mb-3">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <div className="text-gray-600">{cert.authority}</div>
                  <div className="text-gray-500 text-xs">{formatDate(cert.date)}</div>
                  <p className="mt-1 text-gray-700">{cert.summary}</p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-[40%]">
          {basics?.objective && (
            <Section title="Career Objective">
              <p className="text-gray-700">{basics.objective}</p>
            </Section>
          )}

          {skills?.languages?.length > 0 && (
            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                    {lang.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {skills?.technologies?.length > 0 && (
            <Section title="Technologies">
              <div className="flex flex-wrap gap-2">
                {skills.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                    {tech.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {skills?.frameworks?.length > 0 && (
            <Section title="Frameworks & Libraries">
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((framework, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                    {framework.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {education?.length > 0 && (
            <Section title="Education">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="mb-3">
                  <h3 className="font-semibold">
                    {edu.studyType} - {edu.area}
                  </h3>
                  <div className="text-gray-600">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.isStudyingHere ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {volunteer?.length > 0 && (
            <Section title="Volunteer Experience">
              {volunteer.map((vol, index) => (
                <div key={vol.id || index} className="mb-3">
                  <h3 className="font-semibold">{vol.organization}</h3>
                  <div className="text-gray-600">{vol.position}</div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(vol.startDate)} -{' '}
                    {vol.isVolunteeringNow ? 'Present' : formatDate(vol.endDate)}
                  </div>
                  <p className="mt-1 text-gray-700">{vol.summary}</p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import { useResume } from '@/context/ResumeContext';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { socialIcons } from '@/helpers/icons';

const ResumeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
`;

const LeftColumn = styled.div`
  width: 40%;
  background: #163753;
  color: white;
  padding: 2rem;
`;

const RightColumn = styled.div`
  width: 60%;
  padding: 2rem;
  background: white;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  color: #a0aec0;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

interface SectionTitleProps {
  light?: boolean;
}

const SectionTitle = styled.h3<SectionTitleProps>`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${(props) => (props.light ? 'white' : '#163753')};
`;

const ExperienceItem = styled.div`
  margin-bottom: 1.5rem;
`;

const JobTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Company = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const DateLocation = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const DailySchedule = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export default function MayerTemplate() {
  const { resumeData } = useResume();
  const { basics, work, education, skills } = resumeData || {};

  return (
    <ResumeContainer>
      <LeftColumn>
        <ProfileSection>
          <Name>{basics?.name}</Name>
          <Title>{basics?.label || 'Business Woman & Proud Geek'}</Title>

          <ContactInfo>
            <div>{basics?.email}</div>
            <div>{basics?.phone}</div>
            <div>
              {basics?.location?.city}, {basics?.location?.region}
            </div>
          </ContactInfo>

          <SocialLinks>
            {basics?.profiles?.map((profile, index) => {
              const Icon = socialIcons.get(profile.network);
              return (
                Icon && (
                  <a
                    key={index}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              );
            })}
          </SocialLinks>
        </ProfileSection>

        <Section>
          <SectionTitle light>A DAY OF MY LIFE</SectionTitle>
          <DailySchedule>
            <ScheduleItem>
              <AiOutlineClockCircle />
              <span>Strategic Planning</span>
            </ScheduleItem>
            <ScheduleItem>
              <AiOutlineClockCircle />
              <span>Team Meetings</span>
            </ScheduleItem>
            <ScheduleItem>
              <AiOutlineClockCircle />
              <span>Product Development</span>
            </ScheduleItem>
            <ScheduleItem>
              <AiOutlineClockCircle />
              <span>Innovation Time</span>
            </ScheduleItem>
          </DailySchedule>
        </Section>

        <Section>
          <SectionTitle light>LIFE PHILOSOPHY</SectionTitle>
          <div className="italic">
            {basics?.summary ||
              'If you do not have any shadows, you are not standing in the light.'}
          </div>
        </Section>

        <Section>
          <SectionTitle light>LANGUAGES</SectionTitle>
          {skills?.languages?.map((language, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <span>{language.name}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < (language.level || 0) ? 'bg-white' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Section>
      </LeftColumn>

      <RightColumn>
        <Section>
          <SectionTitle>EXPERIENCE</SectionTitle>
          {work?.map((job, index) => (
            <ExperienceItem key={index}>
              <JobTitle>{job.position}</JobTitle>
              <Company>{job.name}</Company>
              <DateLocation>
                {job.startDate} – {job.isWorkingHere ? 'Present' : job.endDate}
              </DateLocation>
              <ul className="list-disc list-inside">
                {job.highlights?.map((highlight, i) => (
                  <li key={i} className="text-gray-700 mb-1">
                    {highlight}
                  </li>
                ))}
              </ul>
            </ExperienceItem>
          ))}
        </Section>

        <Section>
          <SectionTitle>EDUCATION</SectionTitle>
          {education?.map((edu, index) => (
            <ExperienceItem key={index}>
              <JobTitle>
                {edu.studyType} in {edu.area}
              </JobTitle>
              <Company>{edu.institution}</Company>
              <DateLocation>
                {edu.startDate} – {edu.isStudyingHere ? 'Present' : edu.endDate}
              </DateLocation>
            </ExperienceItem>
          ))}
        </Section>

        <Section>
          <SectionTitle>MOST PROUD OF</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: 'Leadership',
                desc: 'Successfully led major organizational transformations',
              },
              { title: 'Innovation', desc: 'Pioneered new product developments and strategies' },
              { title: 'Growth', desc: 'Achieved significant market expansion and revenue growth' },
              { title: 'Team Building', desc: 'Built and mentored high-performing teams' },
            ].map((achievement, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </RightColumn>
    </ResumeContainer>
  );
}

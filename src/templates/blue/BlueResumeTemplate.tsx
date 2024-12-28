import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { Section } from '../professional/components/Section';
import AboutMe from '../professional/components/AboutMe';
import { ProfileImage } from '@/helpers/common/components/ProfileImage';

export default function BlueResumeTemplate() {
  const { resumeData } = useResume();
  const { basics, skills, work, education, certifications } = resumeData || {};
  console.log('basics data is :', basics);
  console.log('authority data is :', certifications);
  //   console.log('All Skills:', allSkills);
  return (
    <div className="max-w-[850px] mx-auto p-6 bg-white print:p-0">
      {/* Left Column */}
      <div className="flex gap-8">
        <div className="w-2/5 bg-[#163753] text-white p-6 min-h-screen">
          <div className="mb-8">
            <ProfileImage src={basics?.image} height={'30px'} />
          </div>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">CONTACT</h3>
            <div className="space-y-2">
              {basics?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {basics.phone}
                </div>
              )}
              {basics?.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {basics.email}
                </div>
              )}
              {basics?.location?.city && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {`${basics.location.city}, ${basics.location.region}`}
                </div>
              )}
              {basics?.url && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  {basics.url}
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b   border-white/20 pb-2">EDUCATION</h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                  {edu.startDate} - {edu.endDate}
                  <h4 className="font-semibold mb-1 text-white">{edu.studyType}</h4>
                  <div className="text-sm text-white"></div>
                  <div className="text-sm text-white">{edu.institution}</div>
                  {edu.score && <div className="text-sm text-white">Score: {edu.score}</div>}
                </div>
              ))}
            </div>
          </section>
          {skills?.technologies?.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">TECHNOLOGIES</h3>
              <div className="space-y-2">
                {skills.technologies.map((tech) => (
                  <div key={tech.name} className="text-sm">
                    {tech.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills?.languages?.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">LANGUAGES</h3>
              <div className="space-y-2">
                {skills.languages.map((lang) => (
                  <div key={lang.name} className="text-sm">
                    {lang.name}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-6">
          <div className="relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:from-[20px] after:via-black after:via-[20px] after:to-transparent after:to-100%">
            {basics?.name && (
              <div className="text-5xl font-mono  ml-5 w-full  uppercase">{basics.name}</div>
            )}{' '}
            {basics?.label && <div className="text-2xl ml-5 w-full">{basics.label}</div>}{' '}
          </div>
          {basics?.summary && (
            <section className=" mt-16 mb-8">
              <h3 className="text-lg font-bold mb-4  border-b-4 text-black border-black pb-2">
                PROFILE
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">{basics.summary}</p>
            </section>
          )}
          {/* <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-black border-b-2 border-black pb-2">
              EDUCATION
            </h3>
            {education?.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="text-sm font-semibold">{edu.studyType}</div>
                <div className="text-sm text-gray-700">{edu.institution}</div>
                <div className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </div>
                {edu.score && <div className="text-sm text-gray-600">GPA: {edu.score}</div>}
              </div>
            ))}
          </section> */}
          <section className="mb-8 relative">
            <h3 className="text-lg font-bold mb-4 text-black border-b-2 border-black pb-2">
              WORK EXPERIENCE
            </h3>

            {/* Vertical timeline line */}
            <div className="absolute left-0 top-14 bottom-0 w-0.5 bg-[#163753]" />

            {work.map((job) => (
              <div key={job.id} className="mb-6 last:mb-0 relative pl-6">
                {/* Timeline dot */}
                <div className="absolute left-[-4px] top-0 w-3 h-3 rounded-full bg-[#163753]" />

                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-semibold text-gray-900">{job.name}</h4>
                  <span className="text-sm text-gray-600">
                    {new Date(job.startDate).toLocaleDateString('en-US', {
                      month: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    - {job.isWorkingHere ? 'PRESENT' : job.endDate}
                  </span>
                </div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">{job.position}</h5>
                {job.summary && (
                  <p className="text-sm leading-relaxed text-gray-600">{job.summary}</p>
                )}
              </div>
            ))}
          </section>
          <section>
            <h3 className="text-lg font-bold mb-4 text-black border-b-2 border-black pb-2">
              CERTIFICATIONS
            </h3>
            <div className="space-y-6">
              {certifications.map((certification) => (
                <div key={certification.id} className="certification-item">
                  <h4 className="font-semibold text-gray-900 mb-2">{certification.title}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm font-medium text-gray-700">Authority -</span>
                    <span className="text-sm text-gray-700">{certification.authority}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Date:{' '}
                    {new Date(certification.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  {certification.summary && (
                    <p className="text-sm leading-relaxed text-gray-600">{certification.summary}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

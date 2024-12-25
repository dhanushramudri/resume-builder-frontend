import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function TwoColumnTemplate() {
  const { resumeData } = useResume();
  const { basics, skills, work, education, certifications } = resumeData || {};

  return (
    <div className="max-w-[850px] mx-auto p-6 bg-white print:p-0">
      <header className="mb-6 pb-4 border-b-2 border-gray-200 print:avoid-breaks">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{basics?.name}</h1>
        {/* {basics?.label && (
          <h2 className="text-xl font-medium text-gray-700 mb-3">{basics.label}</h2>
        )} */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {basics?.email && (
            <a
              href={`mailto:${basics.email}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {basics.email}
            </a>
          )}
          {basics?.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {basics.phone}
            </span>
          )}
          {basics?.location?.city && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {`${basics.location.city}, ${basics.location.region}`}
            </span>
          )}
          {basics?.profiles?.map((profile) => (
            <a
              key={profile.network}
              href={profile.url}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              {profile.network === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
              {profile.network === 'GitHub' && <Github className="w-4 h-4" />}
              {profile.network}
            </a>
          ))}
        </div>
      </header>

      <div className="flex gap-8 print:gap-6">
        <div className="w-2/3">
          {basics?.summary && (
            <section className="mb-6 break-inside-avoid">
              <h3 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-200 pb-1">
                Professional Summary
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">{basics.summary}</p>
            </section>
          )}

          {work?.length > 0 && (
            <section className="mb-6 break-inside-avoid">
              <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-200 pb-1">
                Work Experience
              </h3>
              {work.map((job) => (
                <div key={job.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900">{job.position}</h4>
                    <span className="text-sm text-gray-600">
                      {job.startDate} - {job.isWorkingHere ? 'Present' : job.endDate}
                    </span>
                  </div>
                  <h5 className="text-sm text-gray-700 mb-2">{job.name}</h5>
                  <p className="text-sm leading-relaxed text-gray-600">{job.summary}</p>
                </div>
              ))}
            </section>
          )}

          {certifications?.length > 0 && (
            <section className="mb-6 break-inside-avoid">
              <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-200 pb-1">
                Certifications
              </h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900">{cert.title}</h4>
                    <span className="text-sm text-gray-600">{cert.date}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{cert.authority}</div>
                  <p className="text-sm leading-relaxed text-gray-600">{cert.summary}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="w-1/3">
          <section className="mb-6 break-inside-avoid">
            <h3 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-200 pb-1">
              Technical Skills
            </h3>
            {Object.entries(skills || {}).map(
              ([category, items]) =>
                items?.length > 0 &&
                category !== 'languages' && (
                  <div key={category} className="mb-4 last:mb-0">
                    <h4 className="text-sm font-semibold mb-2 text-gray-800">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
            )}
          </section>

          {education?.length > 0 && (
            <section className="mb-6 break-inside-avoid">
              <h3 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-200 pb-1">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{edu.studyType}</h4>
                  <div className="text-sm text-gray-700">{edu.institution}</div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.score && <div className="text-sm text-gray-600">Score: {edu.score}</div>}
                </div>
              ))}
            </section>
          )}

          {skills?.languages?.length > 0 && (
            <section className="mb-6 break-inside-avoid">
              <h3 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-200 pb-1">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

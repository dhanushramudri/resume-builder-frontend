import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ProgressBar = ({ level }: { level: number }) => (
  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${level}%` }} />
  </div>
);

export default function MinimalistTemplate() {
  const { resumeData } = useResume();
  if (!resumeData?.basics) return null;

  const { basics, skills, work, education, activities } = resumeData;

  return (
    <div className="max-w-4xl mx-auto p-6 print:p-4">
      {/* Header - Compact */}
      <header className="mb-4 pb-3 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{basics.name}</h1>
            {/* {basics.label && <h2 className="text-base text-gray-700">{basics.label}</h2>} */}
          </div>
          {basics.totalExp && (
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {basics.totalExp} Years
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
          {basics.location?.city && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {basics.location.city}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {basics.phone}
            </span>
          )}
          {basics.email && (
            <a
              href={`mailto:${basics.email}`}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <Mail className="w-3 h-3" />
              {basics.email}
            </a>
          )}
          {basics.profiles?.map((profile) => (
            <a
              key={profile.network}
              href={profile.url}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              {profile.network === 'LinkedIn' && <Linkedin className="w-3 h-3" />}
              {profile.network === 'GitHub' && <Github className="w-3 h-3" />}
              {profile.network}
            </a>
          ))}
        </div>
      </header>

      {/* Summary - Compact */}
      {basics.summary && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-1">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-snug">{basics.summary}</p>
        </section>
      )}

      {/* Skills - Compact Grid */}
      <section className="mb-4">
        <h2 className="text-base font-bold mb-2">Technical Skills</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(skills || {}).map(
            ([category, items]) =>
              items?.length > 0 &&
              category !== 'languages' && (
                <div key={category}>
                  <h3 className="font-medium mb-2 text-gray-800">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="space-y-2">
                    {items.map((skill: any) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-gray-500 text-xs">{skill.level}%</span>
                        </div>
                        <ProgressBar level={skill.level} />
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* Work Experience - Compact */}
      {work?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">Work Experience</h2>
          <div className="space-y-3">
            {work.map((job: any) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-medium text-gray-900">{job.name}</h3>
                    <p className="text-sm text-gray-700">{job.position}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {job.startDate} - {job.isWorkingHere ? 'Present' : job.endDate}
                  </span>
                </div>
                <div
                  className="text-xs text-gray-600 mt-1 leading-snug"
                  dangerouslySetInnerHTML={{ __html: job.summary }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education - Compact */}
      {education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">Education</h2>
          <div className="space-y-2">
            {education.map((edu: any) => (
              <div key={edu.id}>
                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                <p className="text-sm text-gray-700">{edu.studyType}</p>
                <div className="text-xs text-gray-600">
                  {edu.startDate} - {edu.endDate}
                  {edu.score && <span className="ml-2">Score: {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements - Compact */}
      {activities?.achievements && (
        <section>
          <h2 className="text-base font-bold mb-2">Achievements & Certifications</h2>
          <div
            className="text-sm text-gray-700 leading-snug"
            dangerouslySetInnerHTML={{ __html: activities.achievements }}
          />
        </section>
      )}
    </div>
  );
}

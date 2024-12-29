import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

const GeometricTemplate = () => {
  const { resumeData } = useResume();
  const { basics, skills, work, education, certifications, awards, activities } = resumeData || {};

  return (
    <div className="max-w-[850px] mx-auto px-6 pt-2">
      {/* Header Content */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{basics?.name}</h1>
        <h2 className="text-xl font-medium text-blue-600 mb-3">{basics?.label || 'UX DESIGNER'}</h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {basics?.email && (
            <a href={`mailto:${basics.email}`} className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              {basics.email}
            </a>
          )}
          {basics?.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              {basics.phone}
            </span>
          )}
          {basics?.url && (
            <a href={basics.url} className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              {basics.url}
            </a>
          )}
          {basics?.location?.city && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              {`${basics.location.city}, ${basics.location.region}`}
            </span>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {basics?.summary && (
        <section className="mb-4">
          <h3 className="text-lg font-bold text-blue-500 border-b-2 border-t-2 border-blue-500 p-2 mb-2">
            SUMMARY
          </h3>
          <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {/* Technical Skills Section */}
      {skills && (
        <section className="mb-4">
          <h3 className="text-lg font-bold text-blue-500 border-t-2 border-b-2 p-2 border-blue-500 mb-2">
            TECHNICAL SKILLS
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(skills)
              .flatMap(([_, items]) => items)
              .filter(Boolean)
              .map((skill: any) => (
                <span
                  key={skill.name}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {work?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-lg font-bold text-blue-500 border-b-2 border-t-2 border-blue-500 p-2 mb-2">
            PROFESSIONAL EXPERIENCE
          </h3>
          {work.map((job) => (
            <div key={job.name} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-gray-700">{job.name}</h4>
                <span className="text-sm text-black-600 font-bold">
                  {job.startDate} - {job.isWorkingHere ? 'Present' : job.endDate}
                </span>
              </div>
              <h5 className="text-blue-600 font-medium mb-1">{job.position}</h5>
              <p className="text-gray-700">{job.summary}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-lg font-bold text-blue-500 border-b-2 border-t-2 p-2 border-blue-500 mb-2">
            EDUCATION
          </h3>
          {education.map((edu) => (
            <div key={edu.institution} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-gray-900">{edu.studyType}</h4>
                <span className="text-sm text-black-600 font-bold">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <h5 className="text-blue-600 mb-1">{edu.institution}</h5>
              {edu.score && <p className="text-sm text-gray-700">Score: {edu.score}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Additional Information */}
      <section className="mb-4">
        {/* <h3 className="text-lg font-bold text-blue-500 border-b-2 border-t-2 p-2 border-blue-500 mb-2">
          ADDITIONAL INFORMATION
        </h3> */}
        <div className="grid grid-cols-1 gap-2">
          {/* Languages */}
          {/* {skills?.languages?.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium text-gray-800 mb-1">Languages:</h4>
              <p className="text-gray-700">
                {skills.languages.map((lang: any) => lang.name).join(', ')}
              </p>
            </div>
          )} */}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section className="mb-4">
              <h3 className="text-lg font-bold text-blue-500 border-b-2 border-t-2 p-2 border-blue-500 mb-2">
                CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{cert.title}</h4>
                      {cert.authority && (
                        <p className="text-sm text-gray-600">Issued by: {cert.authority}</p>
                      )}
                      {cert.date && <p className="text-sm text-gray-500">Obtained: {cert.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards & Activities */}
          {(awards?.length > 0 || activities?.achievements?.length > 0) && (
            <div className="mb-2">
              <h4 className="font-medium text-gray-800 mb-1">Awards/Activities:</h4>
              <p className="text-gray-700">
                {[...(awards || []), ...(activities?.achievements || [])]
                  .map((item: any) => item.title || item.name)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: -1.5in 0;
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

export default GeometricTemplate;

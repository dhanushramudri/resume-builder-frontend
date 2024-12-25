// components/Certifications.tsx
import React from 'react';

interface CertificationItem {
  id: string;
  title: string;
  date: string;
  authority: string;
  summary: string;
}

interface CertificationsProps {
  certifications: CertificationItem[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <div className="flex flex-col gap-4">
      {certifications.map((cert) => (
        <div key={cert.id} className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{cert.title}</h3>
            <span className="text-sm">{cert.date}</span>
          </div>
          <p className="text-sm font-medium">Issued by {cert.authority}</p>
          <p className="text-sm">{cert.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default Certifications;

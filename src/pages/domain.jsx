import React, { useState } from 'react';
import { useRouter } from 'next/router';
import degreesData from '../stores/degreesData';

const DomainPage = ({ initialData }) => {
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const router = useRouter();

  // Handle the degree selection
  const handleDegreeSelect = (degree) => {
    setSelectedDegree(degree);
    setSelectedSpecialization(null); // Reset specialization when a new degree is selected
  };

  // Handle the specialization selection
  const handleSpecializationSelect = (specialization) => {
    setSelectedSpecialization(specialization);
    // Redirect to the builder page with both degree and specialization as query parameters
    if (selectedDegree) {
      router.push({
        pathname: '/builder',
        query: {
          degree: selectedDegree.degree, // Pass the degree
          specialization: specialization, // Pass the selected specialization
        },
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Degree</h2>

        <div className="flex space-x-8 h-full overflow-hidden">
          {/* Degree Selection Column */}
          <div className="w-1/2 space-y-4 overflow-y-auto h-full">
            {degreesData.map((degree, index) => (
              <button
                key={index}
                onClick={() => handleDegreeSelect(degree)}
                className="w-full py-3 px-6 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
              >
                {degree.degree}
              </button>
            ))}
          </div>

          {/* Specializations Column */}
          <div className="w-1/2 flex justify-center items-center overflow-y-auto h-full">
            {selectedDegree ? (
              <div className="transition-all duration-500 opacity-100 transform translate-x-0 max-w-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Specializations for {selectedDegree.degree}:
                </h3>
                <ul className="space-y-4 pl-6 text-gray-600">
                  {selectedDegree.specializations.map((specialization, index) => (
                    <li
                      key={index}
                      onClick={() => handleSpecializationSelect(specialization)}
                      className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out"
                    >
                      <p className="text-lg font-medium text-blue-600">{specialization}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-lg text-gray-500">Select a degree to view specializations.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainPage;

import React, { useState, useEffect } from 'react';
import { countryData } from '../stores/countriesData'; // Assuming you have a file with country data
import { useUser } from '@clerk/nextjs';

const ResumeForm = () => {
  const { isLoaded, user } = useUser();

  console.log('user data is', user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    collegeName: '',
    specialization: '',
    course: '',
    branch: '',
    passOutYear: '',
    cgpaOrPercentage: '',
    gender: '',
    githubProfile: '',
    linkedinProfile: '',
    jobPreferredCountries: [],
    jobPreferredStates: [],
    jobPreferredCities: [],
    dob: '',
  });

  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(countryData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e, field) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: selectedValues,
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      course: selectedCourse,
    }));
    // Fetch branches based on selected course
    setBranches(getBranchesForCourse(selectedCourse));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      jobPreferredCountries: [selectedCountry],
    }));
    // Fetch states based on selected country
    setStates(getStatesForCountry(selectedCountry));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      jobPreferredStates: [selectedState],
    }));
    // Fetch cities based on selected state
    setCities(getCitiesForState(selectedState));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form data is ', formData);

    if (isLoaded && user) {
      try {
        console.log('now the updatePublicMetadata runs');
        console.log('user id is ', user.id);
        const response = await fetch('http://localhost:5001/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            filledForm: true, // Send filledForm flag only
          }),
        });

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`Server error in backend accepting`);
        }

        const data = await response.json();
        console.log('Response:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Optionally, display error to user (e.g., show a toast or alert)
      }
    }
  };

  const getBranchesForCourse = (course) => {
    const courseBranches = {
      Undergraduate: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
      Postgraduate: ['M.Tech', 'M.Sc', 'MBA'],
    };
    return courseBranches[course] || [];
  };

  const getStatesForCountry = (country) => {
    const countryStates = {
      India: ['Maharashtra', 'Karnataka'],
      USA: ['California', 'New York'],
    };
    return countryStates[country] || [];
  };

  const getCitiesForState = (state) => {
    const stateCities = {
      Maharashtra: ['Mumbai', 'Pune'],
      California: ['Los Angeles', 'San Francisco'],
    };
    return stateCities[state] || [];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">College Name</label>
        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Specialization</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleCourseChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Course</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Branch/Stream</label>
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pass-out Year</label>
        <input
          type="number"
          name="passOutYear"
          value={formData.passOutYear}
          onChange={handleChange}
          min="1990"
          max="2029"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CGPA/Percentage</label>
        <input
          type="number"
          name="cgpaOrPercentage"
          value={formData.cgpaOrPercentage}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GitHub Profile</label>
        <input
          type="url"
          name="githubProfile"
          value={formData.githubProfile}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
        <input
          type="url"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Job Locations</label>
        <div>
          <label className="block text-sm font-medium text-gray-700">Countries</label>
          <select
            name="jobPreferredCountries"
            multiple
            value={formData.jobPreferredCountries}
            onChange={(e) => handleMultiSelectChange(e, 'jobPreferredCountries')}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">States</label>
          <select
            name="jobPreferredStates"
            multiple
            value={formData.jobPreferredStates}
            onChange={(e) => handleMultiSelectChange(e, 'jobPreferredStates')}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cities</label>
          <select
            name="jobPreferredCities"
            multiple
            value={formData.jobPreferredCities}
            onChange={(e) => handleMultiSelectChange(e, 'jobPreferredCities')}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default ResumeForm;

// src/components/resume-builder/BasicInfoForm.tsx

import React, { useState } from 'react';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import type { Profile } from '../../types/resume';
import FormNavigation from './FormNavigation';
import CourseSelector from './CourseSelector';
import { specializations } from '../../helpers/constants/specializations';

const BasicInfoForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { basics } = resumeData;
  const formErrors = errors.basics || {};
  const countryData = {
    India: {
      states: {
        'Andhra Pradesh': ['Vijayawada', 'Visakhapatnam', 'Guntur'],
        Telangana: ['Hyderabad', 'Warangal'],
      },
    },
    USA: {
      states: {
        California: ['Los Angeles', 'San Francisco'],
        Texas: ['Dallas', 'Austin'],
      },
    },
  };
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // Dynamic Options

  // Handlers

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedCity(''); // Reset city on state change
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  // const [education, setEducation] = useState({
  //   level: '',
  //   course: '',
  //   specialization: '',
  // });

  // const handleEducationChange = (educationData: {
  //   level: string;
  //   course: string;
  //   specialization: string;
  // }) => {
  //   setEducation(educationData);
  //   updateResumeData('basics', {
  //     ...basics,
  //     education: educationData,
  //   });
  // };

  // console.log('update resume data:', updateResumeData);

  const handleCountryChange = (event: SelectChangeEvent<string[]>) => {
    const values = event.target.value as string[];
    if (values.length <= 3) {
      updateResumeData('basics', {
        ...basics,
        jobPreferredCountries: values,
      });
    }
  };

  const handleLocationChange = (field: keyof typeof basics.location, value: string) => {
    updateResumeData('basics', {
      ...basics,
      location: {
        ...basics.location,
        [field]: value,
      },
    });
  };
  const getFullName = () => {
    return `${basics.firstName} ${basics.lastName}`.trim();
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateResumeData('basics', {
      ...basics,
      [name]: value,
      name:
        name === 'firstName' || name === 'lastName'
          ? `${name === 'firstName' ? value : basics.firstName} ${name === 'lastName' ? value : basics.lastName}`.trim()
          : basics.name,
    });
  };

  const handleProfileChange = (index: number, field: keyof Profile, value: string) => {
    const updatedProfiles = [...basics.profiles];
    updatedProfiles[index] = {
      ...updatedProfiles[index],
      [field]: value,
    };
    updateResumeData('basics', {
      ...basics,
      profiles: updatedProfiles,
    });
  };

  const addProfile = () => {
    updateResumeData('basics', {
      ...basics,
      profiles: [...basics.profiles, { network: '', username: '', url: '' }],
    });
  };

  const removeProfile = (index: number) => {
    const updatedProfiles = basics.profiles.filter((_, i) => i !== index);
    updateResumeData('basics', {
      ...basics,
      profiles: updatedProfiles,
    });
  };

  const renderFieldError = (fieldName: string) => {
    return formErrors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
    ) : null;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear + 5 - 1990 + 1 }, (_, i) => 1990 + i);
  const educationLevels = ['Undergraduate', 'Postgraduate'];

  const courses: Record<'Undergraduate' | 'Postgraduate', Record<string, string[]>> = {
    Undergraduate: {
      'Bachelor of Technology (B.Tech)': [
        'Computer Science and Engineering',
        'Mechanical Engineering',
        'Electrical and Electronics Engineering',
        'Civil Engineering',
        'Electronics and Communication Engineering',
        'Information Technology',
        'Chemical Engineering',
        'Biotechnology',
        'Data Science',
        'Artificial Intelligence and Machine Learning',
        'Aerospace Engineering',
      ],
      'Bachelor of Engineering (B.E.)': [
        'Computer Science and Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Electronics Engineering',
      ],
    },
    Postgraduate: {
      'Master of Technology (M.Tech)': [
        'Computer Science and Engineering',
        'Mechanical Engineering',
        'Electrical and Electronics Engineering',
        'Civil Engineering',
        'Electronics and Communication Engineering',
        'Information Technology',
        'Chemical Engineering',
        'Biotechnology',
        'Data Science',
        'Artificial Intelligence and Machine Learning',
        'Aerospace Engineering',
      ],
      'Master of Engineering (M.E.)': [
        'Structural Engineering',
        'Thermal Engineering',
        'VLSI Design',
        'Embedded Systems',
        'Robotics',
      ],
      'Master of Science (M.Sc)': [
        'Physics',
        'Mathematics',
        'Chemistry',
        'Biotechnology',
        'Environmental Science',
      ],
      'Master of Business Administration (MBA)': [
        'Finance',
        'Marketing',
        'Human Resources',
        'Operations Management',
        'Business Analytics',
      ],
    },
  };

  const allCourses = Object.values(courses).flat();

  // Add this handler
  const handleEducationChange = (field: string, value: string) => {
    updateResumeData('basics', {
      ...basics,
      education: {
        ...basics.education,
        [field]: value,
        // Reset dependent fields when parent field changes
        ...(field === 'level' && { course: '', specialization: '' }),
        ...(field === 'course' && { specialization: '' }),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Image */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Image</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-200">
            {basics.image ? (
              <img
                src={basics.image}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = '/api/placeholder/128/128';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-2 w-full max-w-md">
            <input
              type="text"
              name="image"
              value={basics.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter image URL"
            />
            <div className="flex justify-center">
              <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateResumeData('basics', {
                          ...basics,
                          image: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                or upload image
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={basics.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="John"
            />
            {renderFieldError('firstName')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={basics.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Doe"
            />
            {renderFieldError('lastName')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={basics.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {renderFieldError('dateOfBirth')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <div className="space-y-2">
              <select
                name="gender"
                value={basics.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {basics.gender === 'other' && (
                <input
                  type="text"
                  name="genderOther"
                  value={basics.genderOther}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Please specify"
                />
              )}
              {renderFieldError('gender')}
              {basics.gender === 'other' && renderFieldError('genderOther')}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="label"
              value={basics.label}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Frontend Developer"
            />
            {renderFieldError('label')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={basics.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="john@example.com"
            />
            {renderFieldError('email')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={basics.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="+1 234 567 890"
            />
            {renderFieldError('phone')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Relevant Experience</label>
            <input
              type="text"
              name="relExp"
              value={basics.relExp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., 5 years"
            />
            {renderFieldError('relExp')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Experience</label>
            <input
              type="text"
              name="totalExp"
              value={basics.totalExp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., 8 years"
            />
            {renderFieldError('totalExp')}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Portfolio URL</label>
          <input
            type="url"
            name="url"
            value={basics.url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://yourportfolio.com"
          />
          {renderFieldError('url')}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={basics.location.address}
              onChange={(e) => handleLocationChange('address', e.target.value)}
              className="w-full p-2 border rounded"
            />
            {renderFieldError('location.address')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={basics.location.city}
              onChange={(e) => handleLocationChange('city', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={basics.location.postalCode}
              onChange={(e) => handleLocationChange('postalCode', e.target.value)}
              className="w-full p-2 border rounded"
            />
            {renderFieldError('location.postalCode')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region/State</label>
            <input
              type="text"
              value={basics.location.region}
              onChange={(e) => handleLocationChange('region', e.target.value)}
              className="w-full p-2 border rounded"
            />
            {renderFieldError('location.region')}
          </div>
        </div>
      </div>

      {/* Summary & Objective */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Professional Summary</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Professional Summary</label>
          <textarea
            name="summary"
            value={basics.summary}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="Brief overview of your professional background and key strengths..."
          />
          {renderFieldError('summary')}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Career Objective</label>
          <textarea
            name="objective"
            value={basics.objective}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="Your career goals and aspirations..."
          />
          {renderFieldError('objective')}
        </div>
      </div>

      {/* Job Preferences */}
      <div className="space-y-4">
        {/* <h3 className="text-lg font-medium">Job Preferences</h3> */}

        <div className="grid grid-cols-1 gap-4">
          <div>
            {/* <label className="block text-sm font-medium mb-1">
              Preferred Countries (Select up to 3)
            </label> */}
            {/* <Select
              multiple
              value={basics.jobPreferredCountries || []} // Provide fallback empty array
              onChange={handleCountryChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
              className="w-full border rounded p-0"
            >
              <MenuItem value="us">
                <Checkbox checked={basics.jobPreferredCountries?.includes('us')} />
                <ListItemText primary="United States" />
              </MenuItem>
              <MenuItem value="uk">
                <Checkbox checked={basics.jobPreferredCountries?.includes('uk')} />
                <ListItemText primary="United Kingdom" />
              </MenuItem>
              <MenuItem value="ca">
                <Checkbox checked={basics.jobPreferredCountries?.includes('ca')} />
                <ListItemText primary="Canada" />
              </MenuItem>
            </Select> */}
            {renderFieldError('jobPreferredCountries')}
          </div>

          <div>
            {/* <label className="block text-sm font-medium mb-1">
              Preferred States (Select up to 6)
            </label> */}
            {/* <Select
              multiple
              value={basics.jobPreferredStates || []} // Add fallback empty array
              onChange={(event: SelectChangeEvent<string[]>) => {
                const values = event.target.value as string[];
                if (values.length <= 6) {
                  updateResumeData('basics', {
                    ...basics,
                    jobPreferredStates: values,
                  });
                }
              }}
              renderValue={(selected) => (selected as string[]).join(', ')}
              className="w-full border rounded p-0"
            >
              <MenuItem value="new_york">
                <Checkbox checked={basics.jobPreferredStates?.includes('new_york')} />
                <ListItemText primary="New York" />
              </MenuItem>
              <MenuItem value="california">
                <Checkbox checked={basics.jobPreferredStates?.includes('california')} />
                <ListItemText primary="California" />
              </MenuItem>
              <MenuItem value="illinois">
                <Checkbox checked={basics.jobPreferredStates?.includes('illinois')} />
                <ListItemText primary="Illinois" />
              </MenuItem>
            </Select> */}
            {renderFieldError('jobPreferredStates')}
          </div>

          <div>
            {/* <label className="block text-sm font-medium mb-1">
              Preferred Cities (Select up to 6)
            </label> */}
            {/* <Select
              multiple
              value={basics.jobPreferredCities}
              onChange={(event: SelectChangeEvent<string[]>) => {
                const values = event.target.value as string[];
                if (values.length <= 6) {
                  updateResumeData('basics', {
                    ...basics,
                    jobPreferredCities: values,
                  });
                }
              }}
              renderValue={(selected) => (selected as string[]).join(', ')}
              className="w-full border rounded p-0"
            >
              <MenuItem value="new_york">
                <Checkbox checked={basics.jobPreferredCities?.includes('new_york') ?? false} />
                <ListItemText primary="New York" />
              </MenuItem>
              <MenuItem value="los_angeles">
                <Checkbox checked={basics.jobPreferredCities?.includes('los_angeles') ?? false} />
                <ListItemText primary="Los Angeles" />
              </MenuItem>
              <MenuItem value="chicago">
                <Checkbox checked={basics.jobPreferredCities?.includes('chicago') ?? false} />
                <ListItemText primary="Chicago" />
              </MenuItem>
            </Select> */}
            {renderFieldError('jobPreferredCities')}
          </div>
        </div>
      </div>
      {/* Specialization (Drop down)
  ○ Segmented into Postgraduate and Undergraduate categories
  ● Course(List of Courses given at the end of the document) (Drop Down with Search enabled)
  ○ Specializations listed based on the degree (e.g., M.Tech, M.Sc, MBA, etc.) as per selected option from Postgraduate or Undergraduate.
  ● Branch/Stream (As per selected Course) (Drop down with search enabled, List of Branch/stream as per courses given at the end of the document)
  ● Pass-out Year (Year picker, Starts from 1990-Current+5 Years) 
  LIST OF COURSES
  1. "Master of Technology (M.Tech)",
  2. "Master of Engineering (M.E.)"
  Master of Technology (M.Tech)
  ○ ComputerScience and Engineering
  ○ Mechanical Engineering
  ○ Electrical and Electronics Engineering
  ○ Civil Engineering
  ○ Electronics and Communication Engineering
  ○ Information Technology
  ○ Chemical Engineering
  ○ Biotechnology
  ○ DataScience
  ○ Artificial Intelligence and Machine Learning
  ○ Aerospace Engineering
  Master of Engineering (M.E.)
  ○ ComputerScience and Engineering
  ○ Mechanical Engineering
  ○ Electrical and Electronics Engineering
  ○ Civil Engineering
  ○ Electronics and Communication Engineering
  ○ Information Technology
  ○ Chemical Engineering
  ○ Biotechnology
  ○ DataScience
  ○ Artificial Intelligence an}

{/* Education Section */}
      {/* Education Section */}
      {/* <div className="space-y-4">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">College</label>
            <input
              type="text"
              value={basics.education?.institution || ''}
              onChange={(e) => handleEducationChange('college', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your college name"
            />
          </div> */}

      {/* Level (Undergraduate/Postgraduate) */}
      {/* <div>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={basics.education?.level || ''}
                onChange={(e) => handleEducationChange('level', e.target.value)}
              >
                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                <MenuItem value="Postgraduate">Postgraduate</MenuItem>
              </Select>
            </FormControl>
          </div> */}

      {/* Course Selection */}
      {/* <div> */}
      {/* <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={basics.education?.courses || []}
                onChange={(e) => handleEducationChange('courses', e.target.value)}
                disabled={!basics.education?.level}
                multiple
              >
                {basics.education?.level &&
                  Object.keys(
                    courses[basics.education.level as 'Undergraduate' | 'Postgraduate'] || {}
                  ).map((course) => (
                    <MenuItem key={course} value={course}>
                      <Checkbox checked={(basics.education?.courses || []).includes(course)} />
                      <ListItemText primary={course} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
      {/* </div> */}

      {/* Specialization Selection */}
      {/* education: {
      id: '', // Added required id field
      institution: '',
      studyType: '',
      area: '',
      startDate: '',
      endDate: '',
      score: '',
      courses: [],
      isStudyingHere: false,
      level: 'graduation', // Added required level field with default value
    }, */}
      {/* <div>
            <FormControl fullWidth>
              <InputLabel>Specialization</InputLabel>
              <Select
                value={basics.education?.specialization || ''}
                onChange={(e) => handleEducationChange('specialization', e.target.value)}
                disabled={!basics.education?.courses || basics.education.courses.length === 0}
              >
                {basics.education?.courses &&
                  (typeof basics.education.courses === 'string'
                    ? [basics.education.courses]
                    : basics.education.courses
                  ).map((course: string) =>
                    courses[basics.education.level as 'Undergraduate' | 'Postgraduate']?.[
                      course
                    ]?.map((spec: string) => (
                      <MenuItem key={`${course}-${spec}`} value={spec}>
                        {spec}
                      </MenuItem>
                    ))
                  )}
              </Select>
            </FormControl>
          </div> */}

      {/* Pass-out Year */}
      {/* <div>
            <FormControl fullWidth>
              <InputLabel>Pass-out Year</InputLabel>
              <Select
                value={basics.education?.passOutYear || ''}
                onChange={(e) => handleEducationChange('passOutYear', e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div> */}

      {/* Social Profiles */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Profiles</h3>

        {renderFieldError('profiles')}
        {basics.profiles.map((profile, index) => (
          <div key={index} className="p-4 border rounded space-y-4 relative">
            <button
              onClick={() => removeProfile(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              type="button"
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <input
                  type="text"
                  value={profile.network}
                  onChange={(e) => handleProfileChange(index, 'network', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., LinkedIn, GitHub"
                />
                {renderFieldError(`${index}_network`)}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => handleProfileChange(index, 'username', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Your username"
                />
                {renderFieldError(`${index}_username`)}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={profile.url}
                  onChange={(e) => handleProfileChange(index, 'url', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://..."
                />
                {renderFieldError(`${index}_url`)}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProfile}
          className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + Add Social Profile
        </button>
      </div>
      <FormNavigation />
    </div>
  );
};

export default BasicInfoForm;

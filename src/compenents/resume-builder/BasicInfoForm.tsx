// src/components/resume-builder/BasicInfoForm.tsx

import React, { useState } from 'react';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import type { Profile } from '../../types/resume';
import FormNavigation from './FormNavigation';
import CourseSelector from './CourseSelector';

const BasicInfoForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { basics } = resumeData;
  const formErrors = errors.basics || {};
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
        <h3 className="text-lg font-medium">Job Preferences</h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Countries (Select up to 3)
            </label>
            <Select
              multiple
              value={basics.jobPreferredCountries}
              onChange={handleCountryChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
              className="w-full border rounded p-0"
            >
              <MenuItem value="us">
                <Checkbox checked={basics.jobPreferredCountries.includes('us')} />
                <ListItemText primary="United States" />
              </MenuItem>
              <MenuItem value="uk">
                <Checkbox checked={basics.jobPreferredCountries.includes('uk')} />
                <ListItemText primary="United Kingdom" />
              </MenuItem>
              <MenuItem value="ca">
                <Checkbox checked={basics.jobPreferredCountries.includes('ca')} />
                <ListItemText primary="Canada" />
              </MenuItem>
              {/* Add more countries as needed */}
            </Select>
            {renderFieldError('jobPreferredCountries')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred States (Select up to 6)
            </label>
            <Select
              multiple
              value={basics.jobPreferredStates}
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
                <Checkbox checked={basics.jobPreferredStates.includes('new_york')} />
                <ListItemText primary="New York" />
              </MenuItem>
              <MenuItem value="california">
                <Checkbox checked={basics.jobPreferredStates.includes('california')} />
                <ListItemText primary="California" />
              </MenuItem>
              <MenuItem value="illinois">
                <Checkbox checked={basics.jobPreferredStates.includes('illinois')} />
                <ListItemText primary="Illinois" />
              </MenuItem>
              {/* Add more states as needed */}
            </Select>
            {renderFieldError('jobPreferredStates')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Cities (Select up to 6)
            </label>
            <Select
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
                <Checkbox checked={basics.jobPreferredCities.includes('new_york')} />
                <ListItemText primary="New York" />
              </MenuItem>
              <MenuItem value="los_angeles">
                <Checkbox checked={basics.jobPreferredCities.includes('los_angeles')} />
                <ListItemText primary="Los Angeles" />
              </MenuItem>
              <MenuItem value="chicago">
                <Checkbox checked={basics.jobPreferredCities.includes('chicago')} />
                <ListItemText primary="Chicago" />
              </MenuItem>
              {/* Add more cities as needed */}
            </Select>
            {renderFieldError('jobPreferredCities')}
          </div>
        </div>
      </div>

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

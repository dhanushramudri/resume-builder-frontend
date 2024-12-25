import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useResume, steps } from '../../context/ResumeContext';
import type { StepType } from '../../context/ResumeContext';
import userDetailsData from '../../functions/userDetails.js';
import { useRouter } from 'next/router';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import { useAwards } from '../../stores/awards';
import { useActivity } from '../../stores/activity';
import { useBasicDetails } from '../../stores/basic';
import { useEducations } from '../../stores/education';
import { useExperiences } from '../../stores/experience';
import { useVoluteeringStore } from '../../stores/volunteering';

export const updateResumeData = (newData: any) => {
  if(!newData) return false;
  // Update basics
  if (newData.basics && Object.keys(newData.basics).length > 0) {
    const reset = useBasicDetails.getState().reset;
    reset(newData.basics);
  }

  // Update skills
  if (newData.skills) {
    if (newData.skills.languages && newData.skills.languages.length > 0) {
      const reset = useLanguages.getState().reset;
      reset(newData.skills.languages); // Reset languages
    }
    if (newData.skills.frameworks && newData.skills.frameworks.length > 0) {
      const reset = useFrameworks.getState().reset;
      reset(newData.skills.frameworks); // Reset frameworks
    }
    if (newData.skills.libraries && newData.skills.libraries.length > 0) {
      const reset = useLibraries.getState().reset;
      reset(newData.skills.libraries); // Reset libraries
    }
    if (newData.skills.databases && newData.skills.databases.length > 0) {
      const reset = useDatabases.getState().reset;
      reset(newData.skills.databases); // Reset databases
    }
    if (newData.skills.technologies && newData.skills.technologies.length > 0) {
      const reset = useTechnologies.getState().reset;
      reset(newData.skills.technologies); // Reset technologies
    }
    if (newData.skills.practices && newData.skills.practices.length > 0) {
      const reset = usePractices.getState().reset;
      reset(newData.skills.practices); // Reset practices
    }
    if (newData.skills.tools && newData.skills.tools.length > 0) {
      const reset = useTools.getState().reset;
      reset(newData.skills.tools); // Reset tools
    }
  }

  // Update work experience
  if (newData.work && newData.work.length > 0) {
    const reset = useExperiences.getState().reset;
    reset(newData.work); // Reset work experience
  }

  // Update education
  if (newData.education && newData.education.length > 0) {
    const reset = useEducations.getState().reset;
    reset(newData.education); // Reset education section
  }

  // Update volunteering
  if (newData.volunteer && newData.volunteer.length > 0) {
    const reset = useVoluteeringStore.getState().reset;
    reset(newData.volunteer); // Reset volunteering section
  }

  // Update awards
  if (newData.awards && newData.awards.length > 0) {
    const reset = useAwards.getState().reset;
    reset(newData.awards); // Reset awards section
  }

  // Update activities
  if (newData.activities && Object.keys(newData.activities).length > 0) {
    const reset = useActivity.getState().reset;
    reset(newData.activities); // Reset activities section
  }
  console.log('update Done');
  return true;
};

const FormNavigation = () => {
  const router = useRouter();
  const { setResumeData } = useResume();

  const { currentStep, validateAndNavigate,setIsSubmitting, isSubmitting, resumeData, errors } = useResume();
  const { isLoaded, user } = useUser();

  const currentIndex = steps.indexOf(currentStep as StepType);
  const isLastStep = currentIndex === steps.length - 1;
  const nextStep = isLastStep ? null : steps[currentIndex + 1];

  // Call getUserDetails() here to access the stored user data

  const handleSubmit = async () => {
    if (!isLoaded || !user) {
      console.error('User not loaded or not authenticated');
      return;
    }

    try {
      // First request: Update user form status
      const userResponse = await fetch('http://localhost:5001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          filledForm: true,
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user status');
      }

      // Second request: Save user details
      const userDetailsResponse = await fetch('http://localhost:5001/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          resumeData, // Assuming resumeData is defined and holds the resume content
        }),
      });

      if (!userDetailsResponse.ok) {
        throw new Error('Failed to save user details');
      }

      // Retrieve response data after the successful POST request
      const saveData = await userDetailsResponse.json();
      console.log('Resume data saved successfully:', saveData);

      // New addition: Fetch the saved user details
      const fetchUserDetailsResponse = await fetch(
        `http://localhost:5001/user-details/${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!fetchUserDetailsResponse.ok) {
        throw new Error('Failed to fetch saved user details');
      }

      const fetchedData = await fetchUserDetailsResponse.json();
      if (fetchedData) {
        setResumeData(fetchedData.resumeData); // Note: The data structure includes resumeData field

          router.push('/builder');
          setIsSubmitting(false);
          

      
      }

      // Handle successful submission (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      if (validateAndNavigate(nextStep)) handleSubmit();
    } else {
      validateAndNavigate(nextStep);
    }
  };

  return (
    <div className="flex justify-end space-x-4 mt-8">
      {isLastStep ? (
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Resume'}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next: {nextStep ? nextStep.charAt(0).toUpperCase() + nextStep.slice(1) : ''}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;

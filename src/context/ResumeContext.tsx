// src/context/ResumeContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { ResumeData } from '../types/resume';
import { useRouter } from 'next/router';

interface FormErrors {
  [key: string]: {
    [key: string]: string;
  };
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  currentStep: string;
  setCurrentStep: (step: StepType) => void;
  resetForm: () => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  validateAndNavigate: (nextStep: string | null) => boolean;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  submitForm: () => void;
  setResumeData: (data: ResumeData) => void;
}

const steps = [
  'basics',
  'skills',
  'work',
  'education',
  'activities',
  'volunteer',
  'awards-and-certifications',
] as const;

export type StepType = (typeof steps)[number];

const initialState: ResumeData = {
  basics: {
    firstName: '',
    lastName: '',
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    college: '',
    specialization: '',
    course: '',
    branch: '',
    passOutYear: '',
    cgpa: '',
    gender: '',
    genderOther: '',
    dateOfBirth: '',
    jobPreferredCountries: [],
    jobPreferredStates: [],
    jobPreferredCities: [],
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    relExp: '',
    totalExp: '',
    objective: '',
    profiles: [
      {
        network: 'linkedin',
        username: '',
        url: '',
      },
      {
        network: 'github',
        username: '',
        url: '',
      },
    ],
  },
  skills: {
    languages: [],
    frameworks: [],
    technologies: [],
    libraries: [],
    databases: [],
    practices: [],
    tools: [],
  },
  work: [],
  education: [],
  activities: {
    involvements: [],
    achievements: [],
  },
  volunteer: [],
  awards: [],
  certifications: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode; userId: string }> = ({
  children,
  userId,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialState);
  const [currentStep, setCurrentStep] = useState<StepType>('basics');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`https://resume-builder-backend-gamma.vercel.app/${userId}`, {
          method: 'GET', // Changed to GET since it's a get request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          return;
          // throw new Error('Failed to fetch resume data');
        }

        const data = await response.json();
        if (data) {
          setResumeData(data.resumeData); // Note: The data structure includes resumeData field
          router.push('/builder');
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [userId]);
  const validateBasics = () => {
    const newErrors: FormErrors = { basics: {} };
    const { basics } = resumeData;

    if (!basics.firstName.trim()) newErrors.basics.firstName = 'First name is required';
    if (!basics.lastName.trim()) newErrors.basics.lastName = 'Last name is required';
    if (!basics.gender.trim()) newErrors.basics.gender = 'Gender is required';
    if (basics.gender === 'other' && !basics.genderOther.trim()) {
      newErrors.basics.genderOther = 'Please specify gender';
    }
    if (!basics.dateOfBirth.trim()) newErrors.basics.dateOfBirth = 'Date of birth is required';

    // Job preferences validation
    if (!basics.jobPreferredCountries.length) {
      newErrors.basics.jobPreferredCountries = 'Select at least one preferred country';
    } else if (basics.jobPreferredCountries.length > 3) {
      newErrors.basics.jobPreferredCountries = 'Maximum 3 countries allowed';
    }

    if (!basics.jobPreferredStates.length) {
      newErrors.basics.jobPreferredStates = 'Select at least one preferred state';
    } else if (basics.jobPreferredStates.length > 3) {
      newErrors.basics.jobPreferredStates = 'Maximum 3 states allowed';
    }

    if (!basics.jobPreferredCities.length) {
      newErrors.basics.jobPreferredCities = 'Select at least one preferred city';
    } else if (basics.jobPreferredCities.length > 6) {
      newErrors.basics.jobPreferredCities = 'Maximum 6 cities allowed';
    }

    // Existing validations
    if (!basics.label.trim()) newErrors.basics.label = 'Job title is required';
    if (!basics.email.trim()) {
      newErrors.basics.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)) {
      newErrors.basics.email = 'Invalid email format';
    }
    if (!basics.phone.trim()) newErrors.basics.phone = 'Phone is required';
    if (!basics.summary.trim()) newErrors.basics.summary = 'Summary is required';
    if (basics.summary.length > 300)
      newErrors.basics.summary = 'Summary cannot exceed 300 characters';
    if (!basics.objective.trim()) newErrors.basics.objective = 'Objective is required';
    if (basics.objective.length > 300)
      newErrors.basics.objective = 'Objective cannot exceed 300 characters';
    if (!basics.location.city.trim()) newErrors.basics.city = 'City is required';
    if (!basics.relExp.trim()) newErrors.basics.relExp = 'Relevant experience is required';
    if (!basics.totalExp.trim()) newErrors.basics.totalExp = 'Total experience is required';

    // Profile validation
    basics.profiles.forEach((profile, index) => {
      if (!profile.url.trim()) {
        newErrors.basics[`${profile.network}_url`] = `${profile.network} profile URL is required`;
      } else if (!isValidUrl(profile.url)) {
        newErrors.basics[`${profile.network}_url`] = `Invalid ${profile.network} URL format`;
      }
    });

    return Object.keys(newErrors.basics).length === 0 ? null : newErrors;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateSkills = () => {
    const newErrors: FormErrors = { skills: {} };
    const { skills } = resumeData;

    // At least one language is required
    if (skills.languages.length === 0 || !skills.languages[0].name) {
      newErrors.skills.languages = 'At least one programming language is required';
    }

    // At least one framework is required
    if (skills.frameworks.length === 0 || !skills.frameworks[0].name) {
      newErrors.skills.frameworks = 'At least one framework is required';
    }

    // At least one Technology is required
    if (skills.technologies.length === 0 || !skills.technologies[0].name) {
      newErrors.skills.technologies = 'At least one technology is required';
    }
    return Object.keys(newErrors.skills).length === 0 ? null : newErrors;
  };

  const validateWork = () => {
    const newErrors: FormErrors = { work: {} };
    const { work } = resumeData;
    if (work.length === 0) {
      newErrors.work.entry = 'At least one work experience or project is required';
    } else {
      work.forEach((entry, index) => {
        if (!entry.name.trim()) {
          newErrors.work[`${index}_name`] =
            `${entry.type === 'work' ? 'Company' : 'Project'} name is required`;
        }
        if (!entry.position.trim()) {
          newErrors.work[`${index}_position`] =
            `${entry.type === 'work' ? 'Position' : 'Role'} is required`;
        }
        if (!entry.startDate.trim()) {
          newErrors.work[`${index}_startDate`] = 'Start date is required';
        }
        if (!entry.isWorkingHere && !entry.endDate.trim()) {
          newErrors.work[`${index}_endDate`] = 'End date is required';
        }
        if (!entry.summary.trim()) {
          newErrors.work[`${index}_summary`] = 'Summary is required';
        }
        if (entry.summary.length > 300) {
          newErrors.work[`${index}_summary`] = 'Summary cannot exceed 300 characters';
        }
        if (!entry.highlights?.length || !entry.highlights.some((h) => h.trim())) {
          newErrors.work[`${index}_highlights`] =
            `${entry.type === 'work' ? 'Achievements' : 'Key features'} are required`;
        }
        if (entry.highlights.length > 5) {
          newErrors.work[`${index}_highlights`] = 'Maximum 5 highlights allowed';
        }
        if (!entry.years.trim()) {
          newErrors.work[`${index}_years`] = 'Duration is required';
        }
      });
    }
    return Object.keys(newErrors.work).length === 0 ? null : newErrors;
  };

  const validateEducation = () => {
    const newErrors: FormErrors = { education: {} };
    const { education } = resumeData;

    // Validate presence of both education levels
    if (education.length !== 2) {
      newErrors.education.entry = 'Both secondary and graduation education entries are required';
      return newErrors;
    }

    education.forEach((edu, index) => {
      const level = edu.level === 'secondary' ? 'Secondary' : 'Graduation';

      if (!edu.institution.trim()) {
        newErrors.education[`${index}_institution`] = `${level} institution is required`;
      }
      if (!edu.studyType.trim()) {
        newErrors.education[`${index}_studyType`] = `${level} degree type is required`;
      }
      if (!edu.area.trim()) {
        newErrors.education[`${index}_area`] = `${level} field of study is required`;
      }
      if (!edu.startDate.trim()) {
        newErrors.education[`${index}_startDate`] = `${level} start date is required`;
      }
      if (!edu.isStudyingHere && !edu.endDate.trim()) {
        newErrors.education[`${index}_endDate`] = `${level} end date is required`;
      }
      if (!edu.score.trim()) {
        newErrors.education[`${index}_score`] = `${level} score is required`;
      }
    });

    return Object.keys(newErrors.education).length === 0 ? null : newErrors;
  };

  const validateActivities = () => {
    const newErrors: FormErrors = { activities: {} };
    const { activities } = resumeData;

    if (!activities.involvements?.length) {
      newErrors.activities.involvements = 'At least one involvement is required';
    }
    if (!activities.achievements?.length) {
      newErrors.activities.achievements = 'At least one achievement is required';
    }

    return Object.keys(newErrors.activities).length === 0 ? null : newErrors;
  };

  const validateVolunteer = () => {
    const newErrors: FormErrors = { volunteer: {} };
    const { volunteer } = resumeData;

    if (volunteer.length === 0) {
      newErrors.volunteer.entry = 'At least one volunteer experience is required';
    } else {
      volunteer.forEach((entry, index) => {
        if (!entry.organization.trim()) {
          newErrors.volunteer[`${index}_organization`] = 'Organization name is required';
        }
        if (!entry.position.trim()) {
          newErrors.volunteer[`${index}_position`] = 'Position is required';
        }
        if (!entry.startDate.trim()) {
          newErrors.volunteer[`${index}_startDate`] = 'Start date is required';
        }
        if (!entry.endDate.trim() && !entry.isVolunteeringNow) {
          newErrors.volunteer[`${index}_endDate`] = 'End date is required';
        }
        if (!entry.summary.trim()) {
          newErrors.volunteer[`${index}_summary`] = 'Summary is required';
          if (entry.summary.length > 300) {
            newErrors.volunteer[`${index}_summary`] = 'Summary cannot exceed 500 characters';
          }
        }
        // if (!entry.highlights?.length || !entry.highlights.some((h) => h.trim())) {
        //   newErrors.volunteer[`${index}_highlights`] = 'At least one highlight is required';
        // }
      });
    }

    return Object.keys(newErrors.volunteer).length === 0 ? null : newErrors;
  };

  const validateCertifications = () => {
    const newErrors: FormErrors = { certifications: {} };
    const { certifications } = resumeData;

    if (certifications.length < 2) {
      newErrors.certifications.entry = 'At least two certifications are required';
    }
    certifications.forEach((entry, index) => {
      if (!entry.title.trim()) {
        newErrors.certifications[`${index}_title`] = 'Title is required';
      }
      if (!entry.date.trim()) {
        newErrors.certifications[`${index}_date`] = 'Date is required';
      }
      if (!entry.authority.trim()) {
        newErrors.certifications[`${index}_authority`] = 'Authority is required';
      }
      if (!entry.summary.trim()) {
        newErrors.certifications[`${index}_summary`] = 'Summary is required';
      }
    });

    return Object.keys(newErrors.certifications).length === 0 ? null : newErrors;
  };

  const validateSection = (section: StepType) => {
    switch (section) {
      case 'basics':
        return validateBasics();
      case 'skills':
        return validateSkills();
      case 'work':
        return validateWork();
      case 'education':
        return validateEducation();
      case 'activities':
        return validateActivities();
      case 'volunteer':
        return validateVolunteer();
      case 'awards-and-certifications':
        return validateCertifications();
      default:
        return null;
    }
  };

  const validateAndNavigate = (nextStep: string | null): boolean => {
    const currentErrors = validateSection(currentStep);

    if (currentErrors) {
      setErrors(currentErrors);
      return false;
    }

    setErrors({});

    if (nextStep) {
      setCurrentStep(nextStep as StepType);
    } else {
      // This is the final submit
      const AwardsCertificationsFormError = validateCertifications();
      if (!AwardsCertificationsFormError) {
        submitForm();
        return true;
      }
    }
    return false;
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    // Validate all sections
    for (const step of steps) {
      const stepErrors = validateSection(step);
      if (stepErrors) {
        setErrors(stepErrors);
        setCurrentStep(step);
        setIsSubmitting(false);
        return;
      }
    }

    // try {
    //   const response = await fetch('http://localhost:5001/save-resume-data', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId: userId,
    //       resumeData,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to save resume data');
    //   }
    // } catch (error) {
    //   console.error('Error saving resume data:', error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
    // Clear errors for the field being updated
    if (errors[section]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {},
      }));
    }
  };

  const resetForm = () => {
    setResumeData(initialState);
    setCurrentStep('basics');
    setErrors({});
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        currentStep,
        setCurrentStep,
        resetForm,
        errors,
        setErrors,
        validateAndNavigate,
        isSubmitting,
        setIsSubmitting,
        submitForm,
        setResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export { steps };

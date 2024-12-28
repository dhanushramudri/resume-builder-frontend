// src/services/resumeDataService.ts
import type { User } from '@clerk/nextjs/server';

export interface ResumeData {
  basics: {
    firstName: string;
    lastName: string;
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    education: {
      college: string;
      specialization: string;
      course: string;
      branch: string;
      passOutYear: string;
      cgpa: string;
    };
    gender: string;
    genderOther: string;
    dateOfBirth: string;
    jobPreferredCountries: string[];
    jobPreferredStates: string[];
    jobPreferredCities: string[];
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    relExp: string;
    totalExp: string;
    objective: string;
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  skills: {
    languages: Array<{ name: string; level: number }>;
    frameworks: Array<{ name: string; level: number }>;
    technologies: Array<{ name: string; level: number }>;
    libraries: Array<{ name: string; level: number }>;
    databases: Array<{ name: string; level: number }>;
    practices: Array<{ name: string; level: number }>;
    tools: Array<{ name: string; level: number }>;
  };
  work: Array<{
    id: string;
    name: string;
    position: string;
    url: string;
    startDate: string;
    isWorkingHere: boolean;
    endDate: string | null;
    highlights: string[];
    summary: string;
    years: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    url: string;
    studyType: string;
    area: string;
    startDate: string;
    isStudyingHere: boolean;
    endDate: string;
    score: string;
    courses: string[];
  }>;
  activities: {
    involvements: string;
    achievements: string;
  };
  volunteer: Array<{
    id: string;
    organization: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
    isVolunteeringNow: boolean;
  }>;
  awards: Array<{
    id: string;
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }>;
}

export async function fetchUserResumeData(userId: string): Promise<ResumeData | null> {
  try {
    const response = await fetch(
      `https://resume-builder-backend-gamma.vercel.app/user-details/${userId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user resume data');
    }

    const data = await response.json();
    return data.resumeData;
  } catch (error) {
    console.error('Error fetching user resume data:', error);
    return null;
  }
}

export async function saveUserResumeData(userId: string, resumeData: ResumeData): Promise<boolean> {
  try {
    const response = await fetch('https://resume-builder-backend-gamma.vercel.app/user-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        resumeData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save user resume data');
    }

    return true;
  } catch (error) {
    console.error('Error saving user resume data:', error);
    return false;
  }
}

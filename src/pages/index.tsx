// src/pages/index.js
import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import ResumeForm from '../forms/ResumeForm';
import DomainPage from './domain';
import { useEffect, useState } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import ResumeBuilder from '@/compenents/resume-builder';

function Header() {
  return (
    <header className="w-full py-4 bg-blue-600 text-white flex justify-between items-center px-8 sticky top-0 z-10 shadow-md">
      <div className="text-2xl font-bold">E-Resume</div>
      <div className="flex items-center space-x-4 sm:space-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

function HomePage() {
  const { user, isLoaded } = useUser();
  const [step2Completed, setStep2Completed] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isLoaded && user) {
        console.log('index user:', user);
        setIsLoading(true);

        try {
          // Fetch user data
          const userResponse = await fetch(`http://localhost:5001/user/${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Fetch user details data
          const userDetailsResponse = await fetch(`http://localhost:5001/user-details/${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('User data from backend:', userData);

            if (userDetailsResponse.ok) {
              const userDetailsData = await userDetailsResponse.json();
              console.log('User details from backend:', userDetailsData);

              // Store user details data in localStorage
              try {
                localStorage.setItem('userDetailsData', JSON.stringify(userDetailsData));
              } catch (error) {
                console.error('Error saving to localStorage:', error);
              }

              // Check both conditions:
              // 1. User has filledForm marked as true
              // 2. UserDetails exists and has resumeData
              const formCompleted = userData.filledForm && userDetailsData?.resumeData;
              setStep2Completed(formCompleted);

              if (formCompleted) {
                setResumeData(userDetailsData.resumeData);
              }
            } else {
              console.log('No user details found, form not completed');
              setStep2Completed(false);
            }
          } else {
            console.error('Failed to fetch user data:', userResponse.status);
            setStep2Completed(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setStep2Completed(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('User is not loaded yet or is undefined', { isLoaded, user });
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [isLoaded, user]);

  return (
    <div className="flex items-center justify-center flex-col">
      <Head>
        <title>E-Resume: Home</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8 px-4 sm:px-8 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Welcome to E-Resume
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center">
          Build your professional resume effortlessly!
        </p>

        <div className="mt-8 w-8 flex justify-center items-center">
          <SignedIn>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ResumeBuilder />
            )}
          </SignedIn>
          <SignedOut>
            <div className="flex justify-center items-center w-full h-full">
              <SignInButton mode="modal">
                <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full sm:w-auto">
                  Sign In to Get Started
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

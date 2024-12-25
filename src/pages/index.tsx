import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import ResumeForm from '../forms/ResumeForm';
import DomainPage from './domain';
import { useEffect, useState } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import ResumeBuilder from '@/compenents/resume-builder';

function Header() {
  return (
    <header className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white flex justify-between items-center px-8 sticky top-0 z-10 shadow-md animate-fadeIn">
      <div className="text-2xl font-bold hover:scale-105 transition-transform duration-300">
        E-Resume
      </div>
      <div className="flex items-center space-x-4 sm:space-x-2">
        <SignedIn>
          <div className="animate-fadeIn">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 font-semibold text-white bg-teal-700 rounded-md hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300 animate-fadeIn">
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isLoaded && user) {
        console.log('index user:', user);
        setIsLoading(true);

        try {
          const userResponse = await fetch(
            `https://resume-builder-backend-gamma.vercel.app/user/${user.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const userDetailsResponse = await fetch(
            `https://resume-builder-backend-gamma.vercel.app/user-details/${user.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('User data from backend:', userData);

            if (userDetailsResponse.ok) {
              const userDetailsData = await userDetailsResponse.json();
              console.log('User details from backend:', userDetailsData);

              try {
                localStorage.setItem('userDetailsData', JSON.stringify(userDetailsData));
              } catch (error) {
                console.error('Error saving to localStorage:', error);
              }

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
    <div
      className={`flex items-center justify-center flex-col transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <Head>
        <title>E-Resume: Home</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8 px-4 sm:px-8 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center transform hover:scale-105 transition-transform duration-300 animate-slideDown">
          Welcome to E-Resume
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center animate-fadeIn delay-300">
          Build your professional resume effortlessly!
        </p>

        <div className="mt-8 w-full flex justify-center items-center animate-slideUp delay-500">
          <SignedIn>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <ResumeBuilder />
              </div>
            )}
          </SignedIn>
          <SignedOut>
            <div className="flex justify-center items-center w-full h-full">
              <SignInButton mode="modal">
                <button className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 w-auto rounded-md hover:bg-teal-700 hover:scale-105 transition-all duration-300 animate-pulse">
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

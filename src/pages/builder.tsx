// src/pages/builder.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from '@/modules/builder/BuilderLayout';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'; // Import framer-motion
import { ResumeProvider } from '@/context/ResumeContext';

const BuilderPage: NextPage = () => {
  const router = useRouter();
  const { degree, specialization } = router.query;

  // if (!degree || !specialization) {
  //   return (
  //     <div className="p-8">
  //       <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid or missing parameters</h2>
  //       <p className="text-lg text-gray-500">
  //         Please make sure both degree and specialization are selected.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Head>
        <title>Resume: Builder</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume1-icon.png" />
      </Head>

      <SignedIn>
        <div className="p-2">
          {/* Animated Text for Degree and Specialization */}
          {/* <motion.h2
            className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-5 text-center border-b-2 border-blue-600 shadow-md"
            initial={{ opacity: 0, y: 20 }} // Initial state: hidden and moved down
            animate={{ opacity: 1, y: 0 }} // Final state: visible and in place
            transition={{ duration: 3 }} // Duration of animation
          >
            Building Resume for <span className="text-blue-600">{degree}</span> -{' '}
            <span className="text-blue-600">{specialization}</span>
          </motion.h2> */}

          <div>
            <BuilderLayout />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default BuilderPage;

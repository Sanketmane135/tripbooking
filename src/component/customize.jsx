import React from 'react'
import { useRouter } from 'next/navigation';

import { useSession, signIn } from "next-auth/react";


function Customize() {
  const router = useRouter();
  const { data: session } = useSession();
  
   const handleBookClick = () => {
    if (session) {
      router.push('/customize');
    } else {
      signIn("google"); // redirect to Google login
    }
  };
  return (
    <div>
        <section className="bg-white py-12 text-center">
            <h2 className="text-5xl font-bold text-gray-900 sm:text-5xl">
                Customize Your <span className='text-pink-500'> Dream Trip</span> 
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto p-1">
                Tailor every aspect of your journey to create unforgettable memories.
                <br />
                From destinations to activities, make it uniquely yours.
            </p>
        </section>
        
        <div className='w-full p-5 pb-0 flex items-center justify-center relative '>
            <img src='/customtravel.jpg' className='w-200' />
            <div className='absolute w-40 md:w-auto  md:right-60 right-5 flex flex-col pb-10 gap-2'>
              <p className='md:text-3xl'>Click bellow to <span className='text-fuchsia-600 font-bold'> CUSTOMIZE</span> the Trip</p>
             <button onClick={handleBookClick}  className="  rounded border text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-bgChange px-1 py-1 text-sm font-bold sm:px-6 sm:py-3 sm:text-xl lg:px-8 lg:py-4 lg:text-2xl">Create Trip</button>

            </div>
        </div>

    </div>
  )
}

export default Customize
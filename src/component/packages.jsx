'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function Packages() {

const router = useRouter();

const [builtpackages, setPackages] = useState([]);

useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "https://bagpackbackendweb.onrender.com/api/bagpack/builtpackages"
      );
      // console.log("Full API response:", res);
      // console.log("API response data:", res.data);

      setPackages(res.data.tripPacks);

    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  fetchPackages();
}, []);

const PackageSkeleton = () => {
  return (
    <div className="w-full bg-gray-50 flex flex-wrap items-center justify-center gap-10">
       {[...Array(9)].map((_, i) => (
        <div key={i} className="w-80 rounded-lg shadow-md overflow-hidden bg-white">
          {/* Image Skeleton */}
          <div className="h-48 w-full bg-gray-300 animate-pulse"></div>

          <div className="p-4 space-y-3">
            {/* Title Skeleton */}
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>

            {/* Subtitle Skeleton */}
            <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>

            {/* Price Skeleton */}
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>

            {/* Button Skeleton */}
            <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};




  return (
    <div>
    <section className="bg-gray-50 py-12 text-center">
      <h2 className="text-5xl font-bold text-gray-900 sm:text-5xl">
        Popular <span className='text-pink-500'>Destinations</span> 
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto p-1">
        Discover our most sought-after destinations, carefully curated for
        unforgettable experiences.
      </p>
    </section>

    {/* package section */}
<div  className='w-full  bg-gray-50 flex flex-wrap items-center gap-y-3.5 pb-10'>
    {
      builtpackages===null || builtpackages.length === 0 ?(
                    <div className="loading">
                       <PackageSkeleton/>
                    </div>
                ):builtpackages.map((v,i)=>{
                  return(
            <div key={i} className="w-80 mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
           
              <div className="h-56 w-full relative">
                <img
                  src={v.imageurl}
                  alt="Goa Beach"
                  className="w-full h-full object-cover"
                />
              </div>

 
                <div className="p-5">
                  <h2 className="flex items-center text-lg font-semibold text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{v.tripName}
                  </h2>
                  <p className="mt-2 text-gray-600">Package Starting @</p>

                  <p className="mt-1 text-2xl font-bold text-red-600">
                    ₹ {v.pricePerPerson}{" "}
                    <span className="text-base font-medium text-gray-700">per person</span>
                  </p>

                  <button onClick={()=>{router.push(`/package?id=${v._id}`)}} className="mt-4 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition">
                    Book Now
                  </button>
                </div>
            </div>


                  )
                })
    }
        </div>
    
   

    </div>
  )
}

export default Packages
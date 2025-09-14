"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import Footer from '../../component/footer';
import axios from 'axios';
import { useSession, signIn } from "next-auth/react";

function page() {
 const searchParams=useSearchParams();
  const currentId=searchParams.get("id");
  const router=useRouter();
  const { data: session } = useSession();

  const [packages, setPackages] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
   

    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `https://bagpackbackendweb.onrender.com/api/bagpack/builtpackages/${currentId}`
    
        );

        if (!res.data.tripPack) {
          setNotFound(true);
        } else {
          setPackages(res.data.tripPack);
          setNotFound(false);
        }
      } catch (err) {
        
        setNotFound(true);
      }
    };

    fetchPackage(); 
  }, [currentId]);

useEffect(() => {
  console.log("Fetched packages:", packages);
}, [packages]);


  const handleBookClick = () => {
    if (session) {
      router.push(`/package/packagebooking?id=${currentId}`);
    } else {
      signIn("google"); // redirect to Google login
    }
  };

  return (
    <>
  {
    notFound ? (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-1.5">
        <img className='w-20' src={"/browser.png"} alt='not found' />
          <p className=" text-2xl">There is no such trip that are tryring to access</p>
          <button onClick={()=>{window.history.back()}} className='border p-1 rounded  '>Go Back</button>
        </div>
    ):packages?(
          <div >
            <div className="min-h-screen bg-gray-100">
              {/* Hero Section */}
              <div
                className="relative h-[70vh] flex items-center justify-center text-center text-white mb-20
                "
                style={{
                  backgroundImage: `url('${packages.imageurl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 max-w-2xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{packages.tripName}</h1>
                  <p className="text-lg md:text-xl mb-4">
                    Click the bellow button and start your journey now...
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex text-yellow-400 text-xl">★★★★★</div>
                    <span className="ml-2 text-white text-lg">4.9 (127 reviews)</span>
                  </div>

                  {/* Button */}
                  <button  onClick={handleBookClick} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
                    Book Your Adventure
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          
          {/* Duration */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#666666">
                <path d="m588.67-300.67-142-142V-640h66.66v169.67l122 122-46.66 47.66Zm-142-426v-86.66h66.66v86.66h-66.66Zm280 280v-66.66h86.66v66.66h-86.66Zm-280 300v-86.66h66.66v86.66h-66.66Zm-300-300v-66.66h86.66v66.66h-86.66ZM480.18-80q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-2xl">Duration</h3>
              <p className="text-gray-600">{packages.durationDays} Days / {packages.durationDays-1} Nights</p>
            </div>
          </div>

          {/* Price */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#666666">
                <path d="M531-260h88.67v-3L456-438l1-3h6.67q53.33 0 90.83-31t45.5-79h39.33v-47H599q-3-15-10.17-28.83Q581.67-640.67 572-653h67.33v-47H320.67v50.33h140q31.33 0 49.83 14.34Q529-621 535.67-598h-215v47H536q-5.33 24-24.67 39.83-19.33 15.84-53.66 15.84H367V-438l164 178ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-2xl">{packages.pricePerPerson}</h3>
              <p className="text-gray-600">Price Per Person</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#666666">
                <path d="M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q14.67 0 28.33 1 13.67 1 27.67 3.67V-807q-13.33-3.33-27.17-4.83-13.83-1.5-28.83-1.5-106.61 0-179.97 73.23-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-6-.33-12t-1-12h67.33q.67 6 .67 12v12q0 100-79.5 217.5T480-80Zm.06-406.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-560Zm248-82.67h66.67V-768H920v-66.67H794.67V-960H728v125.33H602.67V-768H728v125.33Z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-2xl">Location</h3>
              <p className="text-gray-600">{packages.location}</p>
            </div>
          </div>

        </div>

            </div> 

            <div className=" bg-gray-100 pl-20 pr-20 mx-auto px-6 py-12  gap-10 " >
              {/* LEFT CONTENT */}
              <div className=" w-full lg:col-span-2 space-y-10 ">
                {/* About Section */}
                <section>
                  <h2 className="text-3xl font-bold mb-4 text-gray-700">About This Adventure</h2>
                  <p className="text-gray-600 mb-4 text-xl">{packages.description}</p>
                  
                </section>

                {/* Trip Highlights */}
                <section>
                  <h2 className="text-3xl font-bold mb-4 text-gray-700">Trip Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packages.highlights.map((item, i) => (
                      <div key={i} className="bg-green-50 p-6 rounded-xl shadow-sm flex items-start space-x-4">
                        <div className="text-2xl"></div>
                        <div>
                          <h3 className="font-semibold">Hightlight {i+1}</h3>
                          <p className="text-gray-600 text-xl">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Daily Itinerary */}
                <section className='  grid grid-cols-1 md:grid-cols-1'>
                  <h2 className="text-3xl font-bold mb-4 text-gray-700">Daily Itinerary</h2>
                  <div className="space-y-4 ">
                    {packages.itinerary.map((item, i) => (
                    <div key={i} className="max-w-3xl mx-auto space-y-4">
                      {/* Day 1 */}
                      <details className="group border rounded-lg">
                        <summary className="flex justify-between items-center cursor-pointer px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="bg-teal-900 text-white text-sm font-semibold px-3 py-1 rounded-md">
                              Day {i +1}
                            </span>
                            <h3 className="font-semibold">{item.title}</h3>
                          </div>
                          <span className="transition-transform group-open:rotate-180">
                            ▼
                          </span>
                        </summary>

                        <div className="px-4 pb-4 text-gray-700">
                          <p className="mb-3">
                            {item.description}
                          </p>
                          
                        </div>
                      </details>
                    </div>

                    ))}
                  </div>
                </section>

                
              </div>

              
            </div>
                
            <Footer/>
    </div>
    ):(
      <div className="w-full h-screen flex items-center justify-center">
          <p className=" text-4xl font-bold">Loading  <span className='text-pink-500'>package...</span></p>
        </div>
    )
  }
  </>

  )
}

export default page
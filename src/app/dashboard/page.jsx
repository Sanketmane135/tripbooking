'use client'
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import axios from 'axios';

function Page() {
  const { data: session } = useSession();
  const [tab, setTab] = useState('package');
  const [modal, showModal] = useState(false);
  const [modalNo,setModalNo] = useState(0);

  // ✅ states for trips, error, and loading
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return; // wait until session exists

    const fetchCustTrips = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://bagpackbackendweb.onrender.com/api/bagpack/getbookedtrips/${session.user.email}`
        );
        console.log("✅ Trips fetched:", res.data.packages);
        setTrips(res.data.packages); // store trips from backend
      } catch (err) {
        
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCustTrips();
  }, [session?.user?.email]);



    const [custTrips, setCustTrips] = useState([]);
    const [custerror, setcustError] = useState("");
    const [custloading, setcustLoading] = useState(false);
  
useEffect(() => {
  if (!session?.user?.email) return; // wait until session exists

  const fetchcustTrips = async () => {
    setcustLoading(true);

    try {
      const res = await axios.get(
        `https://bagpackbackendweb.onrender.com/api/bagpack/getCustomTripById/${session.user.email}`
      );
      console.log("✅ fetched custom Trips:", res.data.trips);

      // ✅ Only update state if trips exist and is an array or single object
      if (Array.isArray(res.data.trips) && res.data.trips.length > 0) {
        setCustTrips(res.data.trips);
      } else if (res.data.trips && typeof res.data.trips === "object") {
        setCustTrips([res.data.trips]); // wrap single object in array
      } else {
        setCustTrips([]); // keep empty if no valid data
      }
    } catch (err) {
      
      setcustError(err.response?.data?.message || "Something went wrong");
    } finally {
      setcustLoading(false);
    }
  };

  fetchcustTrips();
}, [session?.user?.email]);


  function BuiltPackage() {
    return (
      <div className='w-full flex flex-wrap  gap-6'>
        {
          trips.length === 0 && loading==false ? (
            <p className="text-gray-500">No booked packages found.</p>
          ) : (
            
              trips.map((v,i)=>{
                return(
                     <div key={i} className="border rounded-lg shadow-sm p-5 bg-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg md:text-2xl font-semibold">{v.packName}</h3>
                    <span className={` bg-gray-200 ${v.status=="Cancelled"?"text-orange-600 ":"text-green-700"}  px-3 py-1 rounded-full text-sm font-medium`}>
                      {v.status}
                    </span>
                  </div>
                 

                  <div>
                    <img src={v.packageImg} alt="Tropical Paradise" className="w-90 h-48 object-cover rounded-lg mb-4" />
                  </div>

                  {/* Price & Actions */}
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold flex items-center text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{v.totalAmount}</p>
                    <button className="px-4 py-2 border rounded-lg text-gray-700"
                     onClick={() => {showModal(true); setModalNo(i);  }}
                  >
                    View Details
                  </button>

                  </div>
                </div>
                )
              })
            
                
          )
        }
     
      </div>
    )
  }


const customStatusChange = async (id) => {
  try {
    const response = await axios.post(
      `https://bagpackbackendweb.onrender.com/api/bagpack/custStatusChange`,
      {
        id: id,
        status: "Cancelled", 
      }
    );

    console.log("Trip status updated:", response.data);

    // update local state
    setCustTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, status: "Cancelled" } : trip
      )
    );
  } catch (error) {
    setcustError("Error updating trip status:", error.response?.data || error.message);
  }
};

  function Customize() {
    return (
      <div className='w-full flex flex-wrap  gap-6'>

        {
          custTrips.length === 0 && loading==false ? (
            <p className="text-gray-500">No customized trips found.</p>
          ) : (
            custTrips.map((v,i)=>{
              return(
                       <div key={i} className="border rounded-lg shadow-sm p-5 bg-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg md:text-2xl font-semibold">{v.dest}</h3>
                              <span className={` ${v.status=="Cancelled"?" text-red-700 bg-red-100":" text-green-700 bg-green-100"} px-3 py-1 rounded-full text-sm font-medium`}>
                                {v.status}
                              </span>
                            </div>
                            <p className="text-gray-500 flex items-center mb-4 font-bold">
                              Trip Budget : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M547-144 288-408v-72h132q50 0 89-35.5t43-84.5H264v-72h274q-19-35-49.5-53.5T420-744H264v-72h432v72H576q13 17 23.5 33.5T615-672h81v72h-72q-5 81-64 136.5T420-408h-31l259 264H547Z"/></svg>{v.budget}
                            </p>

                            <div>
                              <img src="/custom.jpg" alt="Tropical Paradise" className="w-full h-48 object-cover rounded-lg mb-4" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 pb-2">
                              <div>
                                <h3 className="text-sm font-bold text-gray-500 ">Adult NO</h3>
                                <p className="font-semibold text-gray-900">{v.adultNo}</p>
                              </div>
                              <div>
                                <h3 className="text-sm text-gray-500 font-bold">Child No</h3>
                                <p className="font-semibold text-gray-900">{v.childNo}</p>
                              </div>
                              <div>
                                <h3 className="text-sm text-gray-500 font-bold">Trip Type</h3>
                                <p className="font-semibold text-gray-900">{v.tripType}</p>
                              </div>
                            </div>

                             <div className="grid grid-cols-3 gap-4 pb-2">
                              <div>
                                <h3 className="text-sm font-bold text-gray-500 ">Start date</h3>
                                <p className="font-semibold text-gray-900">{v.startDateNo}</p>
                              </div>
                              <div>
                                <h3 className="text-sm text-gray-500 font-bold">End Date</h3>
                                <p className="font-semibold text-gray-900">{v.endDateNO}</p>
                              </div>
                              <div>
                                <h3 className="text-sm text-gray-500 font-bold">Accomodation</h3>
                                <p className="font-semibold text-gray-900">{v.accommodation}</p>
                              </div>
                            </div>

                            {/* Price & Actions */}
                            
                            {
                              v.status === "Completed" ? (
                                <div className="w-full font-bold flex items-center justify-center cursor-not-allowed bg-green-600 text-white py-2 rounded-lg">
                                  Completed
                                </div>
                              ) : v.status === "Cancelled" ? (
                                <div>
                                  <div className="w-full bg-red-600 text-white py-2 rounded-lg flex items-center justify-center cursor-not-allowed">
                                    Cancelled
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h3 className="font-semibold text-red-600">Danger Zone</h3>
                                  <button
                                    onClick={() => customStatusChange(v._id)}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                                  >
                                    Cancel Trip
                                  </button>
                                </div>
                              )
                            }
                          </div>
              )
            })
          )
        }
       
      </div>
    )
  }


  const updateStatus=async(id)=>{
    try {
    const response = await axios.post(
      `https://bagpackbackendweb.onrender.com/api/bagpack/packageStatusChange`,
      {
        id: id,
        status: "Cancelled", 
      }
    );

    console.log("Trip status updated:", response.data);

    // update local state
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, status: "Cancelled" } : trip
      )
    );
     showModal(false);

    
  } catch (error) {
    console.error("Error updating trip status:", error);
  }
  }

  const content = tab === 'package' ? <BuiltPackage /> : <Customize />;

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      {/* ✅ Modal Overlay */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full transform transition-all duration-500 ease-out scale-95">
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{trips[modalNo].packName}</h1>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => showModal(false)}
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-4">
              <p className="text-gray-600 flex items-center text-3xl font-bold">
              <span className='text-xl text-pink-500'>Total Amount</span>  
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M551.83-80.09 258.52-391.61v-109.87h165.44q38.34 0 68.82-18.35 30.48-18.34 39.05-54.17H211.91v-122.96h316.05q-15.31-29.91-43.74-44.95-28.44-15.05-64.22-15.05H211.91v-122.95h536.18v122.95H622.44q10.6 9.05 21.04 26.79 10.43 17.74 14.43 33.21h90.18V-574h-89.18q-12.56 82.74-75.08 137.41-62.53 54.68-147.57 56.94h3.39L723-80.09H551.83Z"/></svg>
                 {trips[modalNo].totalAmount}
              </p>
               <div>
                    <img src={trips[modalNo].packageImg} alt="Tropical Paradise" className="w-full h-48 object-cover rounded-lg mb-4" />
                  </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Start Date</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].starDate}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Adults</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].adultsId}</p>
                </div>
                 <div>
                  <h3 className="text-sm text-gray-500">Childs</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].childId}</p>
                </div>
              </div>

              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Booked Email</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].emailId}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Trip Status</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].status}</p>
                </div>
                 <div>
                  <h3 className="text-sm text-gray-500">Payment Id</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].transId}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Trip Owner</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Phone No</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].phoneNO}</p>
                </div>
                 <div>
                  <h3 className="text-sm text-gray-500">Accomodation</h3>
                  <p className="font-semibold text-gray-900">{trips[modalNo].acco}</p>
                </div>
              </div>
                {
                trips[modalNo].status === "Completed" ? (
               
                    <div className="w-full font-bold flex items-center justify-center cursor-not-allowed bg-green-600 text-white py-2 rounded-lg">
                      Completed
                    </div>

                ) : trips[modalNo].status === "Cancelled" ? (
                  <div>
                    <div className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-lg">
                      Cancelled
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-red-600">Danger Zone</h3>
                    <button
                    onClick={() => updateStatus(trips[modalNo]._id)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel Trip
                  </button>

                  </div>
                )
                }

             
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Trip Status <span className="text-pink-500">Dashboard</span>
        </h1>
        <p className="text-gray-500">
          Track and manage your travel bookings and custom itineraries
        </p>
      </div>

      {/* Session logic */}
      <div>
        {
        session ? (
          <div className="p-6 max-w-7xl mx-auto">
            {/* ✅ Loading & Error Messages */}
            {loading && <p className="text-gray-500">Fetching your trips...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Tabs */}
            <div className="md:w-120 bg-neutral-200 flex items-center justify-around mb-6 p-2 rounded">
              <button
                onClick={() => setTab('package')}
                className={`px-4 flex gap-2 py-2 rounded-lg font-medium ${tab === 'package' ? 'bg-gray-50 text-gray-700' : 'text-gray-600'}`}  
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m352-522 86-87-56-57-44 44-56-56 43-44-45-45-87 87 159 158Zm328 329 87-87-45-45-44 43-56-56 43-44-57-56-86 86 158 159Zm24-567 57 57-57-57ZM290-120H120v-170l175-175L80-680l200-200 216 216 151-152q12-12 27-18t31-6q16 0 31 6t27 18l53 54q12 12 18 27t6 31q0 16-6 30.5T816-647L665-495l215 215L680-80 465-295 290-120Zm-90-80h56l392-391-57-57-391 392v56Zm420-419-29-29 57 57-28-28Z"/></svg>
                 Built-In Packages
              </button>
              <button
                onClick={() => setTab('customize')}
                className={`px-4 py-2 flex gap-2 rounded-lg font-medium ${tab === 'customize' ? 'bg-gray-50 text-gray-700' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M120-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T360-790v84q-72 26-116 88.5T200-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H120Zm717-360h-81q-5-35-21.5-67T690-648l-10-10v98h-80v-240h240v80H730l16 14q41 42 63 89t28 97ZM680-40l-12-60q-12-5-22.5-10.5T624-124l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T668-380l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T772-100l-12 60h-80Zm40-120q33 0 56.5-23.5T800-240q0-33-23.5-56.5T720-320q-33 0-56.5 23.5T640-240q0 33 23.5 56.5T720-160Z"/></svg>
                 Customized Trips
              </button>
            </div>

            {/* Package Tours */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Package Tours</h2>
            {tab === "package" ? (
              <div className="grid md:grid-cols-1 gap-6">{content}</div>
            ) : (
              <div>{content}</div>
            )}
          </div>
        ) : (
          <div className='w-full h-screen flex flex-col gap-2.5 justify-center items-center'>
            <h1 className='text-2xl font-bold'>User is not logged in</h1>
            <label>Click below to log in</label>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

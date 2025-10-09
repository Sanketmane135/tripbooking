'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaTelegramPlane, FaStar } from "react-icons/fa";
import Footer from "../../component/footer";
import { signIn, useSession } from "next-auth/react"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewErr, setReviewErr] = useState("");
  const [reviewloading, setreviewLoading] = useState(false);
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
  user: "",
  title: "",
  rating: 0,
});


  // ⭐ fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      setreviewLoading(true);
      try {
        const res = await axios.get("https://bagpackbackendweb.onrender.com/api/bagpack/getreviews");
        console.log("✅ fetched reviews:", res.data.reviews);
        setReviews(res.data.reviews); // ✅ correct key
        
      } catch (err) {
        console.error("❌ Error fetching reviews:", err);
        setReviewErr(err.response?.data?.message || "Something went wrong");
      } finally {
        setreviewLoading(false);
      }
    };

    fetchReviews();
  }, []);


 // handleChange (works fine)
const handleChange = (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

  // ⭐ handle rating click
  const handleRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  // ⭐ handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://bagpackbackendweb.onrender.com/api/bagpack/addreview", formData);
    console.log("✅ Review submitted:", res.data);

    const newReview = {
      _id: res.data.review?._id || Date.now().toString(), // fallback if no id
      title: res.data.review?.title || formData.title,
      user: res.data.review?.user || formData.user,
      rating: res.data.review?.rating || formData.rating,
    };

    setReviews((prev) => [...prev, newReview]);

    // reset form
    setFormData({ user: "", title: "", rating: 0 });
    setShowModal(false);
    alert("Review submitted successfully!");
  } catch (err) {
    console.error("❌ Error submitting review:", err);
    alert(err.response?.data?.message || "Failed to submit review");
  }
};

const giveReview = () => {
  if(session){
    setShowModal(true);
  }else{
  signIn("google");
  }
  
}


  return (
    <>
    <section className="bg-gray-50 py-12 w-full h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Clients' Feedback on Our Work
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Explore the experiences of our clients with our work, showing our
          dedication to delivering exceptional results.
        </p>

        {/* Button to open modal */}
        <div className="text-center mb-10">
          <button
            onClick={giveReview}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Give Review
          </button>
        </div>

        {/* Scrolling container */}
        <div className="overflow-hidden relative">

          
          {
            reviewloading && (
              <p className="text-center text-gray-500">Loading reviews...</p>
            )
          }
          <div className="flex gap-6 animate-scroll">
            {[...reviews, ...reviews].map((r, index) => (
              <div
                key={r._id ? `${r._id}-${index}` : index} // ✅ unique key fix
                className="min-w-[300px] max-w-sm flex-shrink-0 bg-white p-6 rounded-xl shadow-md"
              >
                {/* Review Text */}
                <p className="text-gray-600 italic mb-4">“ {r.title} ”</p>

                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">
                        {r.user?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{r.user}</h4>
                    </div>
                  </div>
                  <div className="flex space-x-2 text-gray-400">
                    <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                    <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                    <FaTelegramPlane className="hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Modal */}
      {showModal && (
       <div className="fixed inset-0 backdrop-blur-md bg-transparent flex items-center justify-center z-50">

          <div className="bg-white w-11/12 max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
             
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="user"                  // ✅ matches state
                      value={formData.user}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Review */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Review
                    </label>
                    <textarea
                      name="title"                 // ✅ matches state
                      value={formData.title}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
                      placeholder="Write your review..."
                    ></textarea>
                  </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex space-x-2 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      onClick={() => handleRating(i + 1)}
                      className={`h-6 w-6 cursor-pointer ${
                        i < formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
    <Footer/>
    </>
  );
}

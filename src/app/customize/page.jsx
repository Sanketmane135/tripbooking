"use client";
import React, { useState } from "react";
import Footer from "../../component/footer";
import { useRouter } from "next/navigation";
import axios from "axios";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: "",
    adults: 1,
    children: 0,
    accomodation: "",
    startDate: "",
    endDate: "",
    email: "",
    tripType: "",
    budget: "",
    requests: "",
  });

  const [submitError, setSubmitError] = useState(""); // ✅ error state
  const [submitting, setSubmitting] = useState(false); // ✅ loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(""); // reset old error
    setSubmitting(true);

    // Check for empty fields
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        setSubmitError(`Please fill the ${key} field`);
        setSubmitting(false);
        return;
      }
    }

    // Date validation
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end <= start) {
      setSubmitError("End date must be greater than Start date");
      setSubmitting(false);
      return;
    }

    if (formData.budget < 5000) {
      setSubmitError("Budget must be at least 5000 per person");
      setSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://bagpackbackendweb.onrender.com/api/bagpack/addCustom",
        {
          dest: formData.destination,
          adultNo:String(formData.adults),
          childNo: String(formData.children),
          startDateNo: formData.startDate,
          endDateNO: formData.endDate,
          accommodation: formData.accomodation,
          usermail: formData.email,
          tripType: formData.tripType,
          budget: formData.budget,
          status: "Under Approval",
        }
      );
      console.log("Trip added:", res.data);
      router.push("/customize/requested");
    } catch (error) {
    
      setSubmitError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8 md:mb-5">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900">
          Customize Your <span className="text-pink-500">Dream Trip</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Fill out the form below to request a personalized itinerary.
        </p>

        {/* Show error message */}
        {submitError && (
          <div className="mb-4 text-red-600 font-medium text-center">
            {submitError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Destination */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Bali, Indonesia"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Travelers */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Adults
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                min={1}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Children
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                min={0}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Accommodation
              </label>
              <select
                name="accomodation"
                value={formData.accomodation}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
                <option value="pg">PG</option>
                <option value="flat">Flat</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Start date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700">
                End date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Trip type */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Trip type
            </label>
            <select
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="Family">Family</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Budget per person
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 1200"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Special requests */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Special requests
            </label>
            <textarea
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              rows={3}
              placeholder="Let us know about dietary needs, accessibility, preferred airlines, etc."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="reset"
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
              onClick={() =>
                setFormData({
                  destination: "",
                  adults: 1,
                  children: 0,
                  accomodation: "",
                  startDate: "",
                  endDate: "",
                  email: "",
                  tripType: "",
                  budget: "",
                  requests: "",
                })
              }
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit request"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Page;

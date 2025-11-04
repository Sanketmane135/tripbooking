'use client'

import React, { useState } from "react";
import Footer from "../../component/footer";

function page() {

const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    // 👉 You can send formData to an API route later (e.g., /api/contact)
  };

    
  return (

    <div>
     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <form  className="space-y-4"   action="https://formspree.io/f/mjkeznpj" method="POST">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone No</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-400"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
        >
          Submit
        </button>
      </form>
      
      </div>
      <Footer/>
    </div>
  )
}

export default page
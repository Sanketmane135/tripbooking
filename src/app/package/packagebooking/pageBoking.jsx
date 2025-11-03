"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../../component/footer";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Qrcode from "../../../component/QrGenerator";
import { useSession } from "next-auth/react";
import { useRazorpay } from "react-razorpay";

function PageBooking() {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const router = useRouter();

  const { data: session, status } = useSession();
  const [packages, setPackages] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [transactionId, settransactionId] = useState("");
  const [amount, setAmount] = useState(1);
  const [submitError, setSubmitError] = useState("");

  const { error, isLoading, Razorpay } = useRazorpay();

  const [formData, setFormData] = useState({
    packageName: "",
    startDate: "",
    adults: 1,
    children: 0,
    fullName: "",
    phone: "",
    email: "",
    accommodation: "",
  });

  // Fetch package details
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
          setAmount(res.data.tripPack.pricePerPerson);
        }
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchPackage();
  }, [currentId]);

  // Auto-fill package name
  useEffect(() => {
    if (packages) {
      setFormData((prev) => ({
        ...prev,
        packageName: packages.tripName,
      }));
    }
  }, [packages]);

  // Auto-fill email from session
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
      }));
    }
  }, [session]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep adults/children numeric
    const val =
      name === "adults" || name === "children" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  // Form submit validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.startDate) return setSubmitError("Start Date is required");
    if (!formData.fullName.trim()) return setSubmitError("Full Name is required");
    if (!formData.phone.trim()) return setSubmitError("Phone Number is required");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return setSubmitError("Enter a valid Email");
    if (!formData.accommodation)
      return setSubmitError("Please select Accommodation");

    // if (packages) {
    //   const total =
    //     (Number(formData.adults) + Number(formData.children)) *
    //     Number(packages.pricePerPerson);
    //   setAmount(total);
    // }

    setShowQr(true);
  };

  // ✅ Payment handler with backend posting
 const handlePayment = async () => {
  setSubmitError("");

  // Basic validation
  if (
    !formData.packageName ||
    !formData.startDate ||
    !formData.fullName.trim() ||
    !formData.phone.trim() ||
    !formData.email.trim() ||
    !formData.accommodation
  ) {
    setSubmitError("Please fill all required details before payment!");
    return;
  }

  // ✅ Compute total immediately (not using async setAmount)
  const totalAmount =
    (Number(formData.adults) + Number(formData.children)) *
    Number(packages?.pricePerPerson || 0);

  try {
    // Step 1: Create order on backend with totalAmount
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount * 100 }),
    });

    const data = await res.json();
    if (!data.success) return alert("Failed to create order!");

    // console.log("Order created:", data);

    // Step 2: Configure Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Bagpack | Trips & Tourism",
      description: `Payment for Package Booking of ${formData.packageName}`,
      order_id: data.orderId,
      handler: async (response) => {
        // console.log("✅ Payment success:", response);

        try {
          // Step 3: Post booking details to backend
          const res = await axios.post(
            "https://bagpackbackendweb.onrender.com/api/bagpack/addpackage",
            {
              packName: formData.packageName,
              adultsId: String(formData.adults),
              childId: String(formData.children),
              name: formData.fullName,
              phoneNO: formData.phone,
              starDate: formData.startDate,
              acco: formData.accommodation,
              emailId: formData.email,
              transId: response.razorpay_payment_id,
              transStatus: "Success",
              totalAmount: totalAmount, // ✅ use computed total
              packageImg: packages.imageurl,
              status: "Under Approval",
            }
          );

          // console.log("✅ Data submitted:", res.data);
          // alert("Payment successful! Booking confirmed.");
          router.push("/package/packagebooking/conferm");
        } catch (err) {
          // console.log("❌ Error submitting:", err);
          alert("Payment done, but booking submission failed!");
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#F37254" }
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  } catch (err) {
    // console.error("❌ Payment initiation error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  // Disable Pay button if data missing
  const isFormIncomplete =
    !formData.packageName ||
    !formData.startDate ||
    !formData.fullName.trim() ||
    !formData.phone.trim() ||
    !formData.email.trim() ||
    !formData.accommodation;

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Invalid Package ID
        </h1>
        <p className="text-gray-600 mb-6">
          The package you are trying to access was not found.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    );
  }

  if (packages === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-xl text-gray-700 mb-4">Loading Package...</h1>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Booking Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mb-5 mt-5 md:border">
        <h2 className="font-bold text-gray-800 md:text-3xl text-2xl">
          Package <span className="text-pink-500">Booking</span>
        </h2>

        {submitError && (
          <div className="text-red-600 font-medium text-center mb-4">
            {submitError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Package Name */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={
                      packages === null
                        ? "Loading..."
                        : formData.packageName || packages.tripName
                    }
                    readOnly
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Start date */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Start date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Adults */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Adults
                  </label>
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Children */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Children
                  </label>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    min={0}
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sanket Mane"
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765xxxxx"
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Email (auto-filled) */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={
                      status === "loading"
                        ? "Loading..."
                        : formData.email || ""
                    }
                    onChange={handleChange}
                    readOnly // ✅ Prevent editing
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  />
                </div>

                {/* Accommodation */}
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700">
                    Accommodation
                  </label>
                  <select
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="villa">Villa</option>
                    <option value="hotel">Hotel</option>
                    <option value="banglow">Banglow</option>
                  </select>
                </div>
              </div>

             <div className="flex justify-end gap-3 mt-6">
                <button
                  type="reset"
                  onClick={() =>
                    setFormData({
                      packageName: "",
                      startDate: "",
                      adults: 1,
                      children: 0,
                      fullName: "",
                      phone: "",
                      email: "",
                      accommodation: "",
                    })
                  }
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
                >
                  Reset
                </button>

                <button
                  onClick={handlePayment}
                  disabled={isFormIncomplete || isLoading}
                  className={`px-5 py-2 rounded-lg text-white transition ${
                    isFormIncomplete || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700"
                  }`}
                >
                  {isLoading ? "Processing..." : "Pay Now"}
                </button>
              </div>

            </form>

 
      
      </div>

      <div className="w-full p-2 flex  flex-col md:flex-row items-center justify-center gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#EA3323"><path d="M480-80q-139.67-35-229.83-161.5Q160-368 160-520v-240l320-120 320 120v226.67h-66.67V-715L480-808.33l-253.33 93.01V-520q0 127.67 71 231t182.46 139.67q27.87-8 63.37-28.84Q579-199 602.67-220l46.66 47.33q-34.33 30.34-79.5 56Q524.67-91 480-80Zm366.55 0q-14.22 0-23.72-9.62-9.5-9.61-9.5-23.83 0-14.22 9.62-23.72 9.62-9.5 23.83-9.5 14.22 0 23.72 9.62 9.5 9.62 9.5 23.83 0 14.22-9.62 23.72-9.61 9.5-23.83 9.5Zm-33.22-133.33v-253.34H880v253.34h-66.67ZM480-481.33Zm.14 85.33q35.53 0 60.69-24.83Q566-445.67 566-481.67t-25.3-61.16Q515.4-568 479.86-568q-35.53 0-60.69 25.17Q394-517.67 394-481.67t25.3 60.84Q444.6-396 480.14-396Zm-.14 66.67q-63.33 0-108-44.34-44.67-44.33-44.67-108 0-63.66 44.67-108.33t108-44.67q63.33 0 108 44.67t44.67 108.67q0 21.33-5.84 42.16-5.83 20.84-18.16 38.5l128.33 124-47 47-128-123.66q-18.67 11-39.61 17.5-20.94 6.5-42.39 6.5Z"/></svg>
        <div>
              <h2 className="text-2xl font-bold">This is just demo payment gate way</h2>
              <p> It does not debit any real money go with process it will just ask you to give <span className=" font-bold text-green-600">SUCCESS</span> or <span className="text-red-600 font-bold">FAILURE</span> to payment </p>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default PageBooking;
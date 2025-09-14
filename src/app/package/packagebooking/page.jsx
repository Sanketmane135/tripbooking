"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../../component/footer";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Qrcode from "../../../component/QrGenerator";
import { useSession } from "next-auth/react"; // ✅ Import session

function Page() {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const router = useRouter();

  const { data: session, status } = useSession(); // ✅ get session
  const [packages, setPackages] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [transactionId, settransactionId] = useState("");
  const [amount, setAmount] = useState(1);
  const [submitError, setSubmitError] = useState(""); // ✅ error state

  const [formData, setFormData] = useState({
    packageName: "",
    startDate: "",
    adults: 1,
    children: 0,
    fullName: "",
    phone: "",
    email: "", // will be replaced by session
    accommodation: "",
  });

  // Fetch package
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

  // Auto-fill package name after fetch
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(""); // reset error before validation

    if (!formData.startDate) {
      setSubmitError("Start Date is required");
      return;
    }
    if (!formData.fullName.trim()) {
      setSubmitError("Full Name is required");
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError("Phone Number is required");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitError("Enter a valid Email");
      return;
    }
    if (!formData.accommodation) {
      setSubmitError("Please select Accommodation");
      return;
    }

    if (packages) {
      const total =
        (Number(formData.adults) + Number(formData.children)) *
        Number(packages.pricePerPerson);
      setAmount(total);
    }

    setShowQr(true);
  };

  // QR Submit
  const qrsubmit = async (e) => {
    e.preventDefault();
    setSubmitError(""); // reset old error

    if (!transactionId.trim()) {
      setSubmitError("Please submit your transaction id");
      return;
    }

    setShowQr(false);

    try {
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
          transId: transactionId,
          transStatus: "Unchecked",
          totalAmount: amount,
          packageImg: packages.imageurl,
          status: "Under Approval",
        }
      );

      console.log("✅ Data submitted:", res.data);
      router.push("/package/packagebooking/conferm");
    } catch (err) {
      console.log("❌ Error submitting:", err.response?.data || err.message);
      setSubmitError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="relative">
      {notFound ? (
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
      ) : (
        <>
          {/* QR Modal */}
          <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
              showQr ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`w-11/12 md:w-1/2  bg-white rounded-lg flex flex-col items-center justify-center shadow-lg p-6 text-center transform transition-all duration-500 ${
                showQr
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Payment QR
              </h2>
              <Qrcode amount={amount} />
              <div className="w-full flex flex-col items-center justify-center mt-4">
                <label className="text-lg">
                  Enter{" "}
                  <span className="font-semibold text-pink-500">
                    Transaction Id
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => settransactionId(e.target.value)}
                  className="w-1/2 rounded-lg bg-gray-50 border border-gray-400 px-3 py-2 text-[15px] font-medium focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <button
                onClick={qrsubmit}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Booking Form */}
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mb-5 mt-5 md:border">
            <h2 className=" font-bold text-gray-800 md:text-3xl text-2xl">
              Package <span className="text-pink-500">Booking</span>
            </h2>

            {/* ✅ Show errors here */}
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

              <div className="flex justify-end gap-3">
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
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Proceed to payment
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Page;

"use client";

import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
         <h1 className="text-2xl font-bold text-gray-800 mb-4">BagPack | Trips & Tourism</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}

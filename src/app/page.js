"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Link from "next/link";
import Hero from "../component/hero";
import Packages from "../component/packages";
import Customize from "../component/customize";
import Features from "../component/features";
import Footer from "../component/footer";

export default function HomePage() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Refs for sections
  const packagesRef = useRef(null);
  const customizeRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // close mobile menu after click
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-800">
              <img src={"/logo.png"} alt="Logo" className="h-8 inline mr-2" />
              BagPack
            </span>
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden space-x-6 md:flex items-center">
            <button
              onClick={() => scrollToSection(packagesRef)}
              className="text-gray-700 hover:text-red-600"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection(customizeRef)}
              className="text-gray-700 hover:text-red-600"
            >
              Customize Trip
            </button>
            <Link href="/dashboard" className="text-gray-700 hover:text-red-600">
              My Dashboard
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600">
              Contact
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-red-600">
              Reviews
            </Link>
            <span className="text-gray-400">|</span>
            {session ? (
              <div className="w-auto flex items-center gap-2">
                <img
                  src={session.user?.image}
                  alt="profile pic"
                  className="w-8 h-8 rounded-2xl"
                />
                <p>{session.user?.name}</p>
                <button
                  onClick={() => signOut()}
                  className="border p-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-1 border p-1 rounded"
              >
                Login
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col space-y-2 px-4 pb-4 md:hidden">
            <button
              onClick={() => scrollToSection(packagesRef)}
              className="block text-gray-700 hover:text-red-600 text-left"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection(customizeRef)}
              className="block text-gray-700 hover:text-red-600 text-left"
            >
              Customize Trip
            </button>
            <Link href="/dashboard" className="block text-gray-700 hover:text-red-600">
              My Dashboard
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-red-600">
              Contact
            </Link>
            <Link href="/reviews" className="block text-gray-700 hover:text-red-600">
              Reviews
            </Link>
            {session ? (
              <div className="w-full flex items-center justify-center gap-2">
                <img
                  src={session.user?.image}
                  alt="profile pic"
                  className="w-8 h-8 rounded-2xl"
                />
                <p>{session.user?.name}</p>
                <button
                  onClick={() => signOut()}
                  className="border p-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="border p-2 rounded text-left items-center flex gap-2 justify-center"
              >
                Login
              </button>
            )}
          </div>
        )}
      </header>

      {/* Sections with refs */}
      <Hero />
      <div ref={packagesRef}>
        <Packages />
      </div>
      <div ref={customizeRef}>
        <Customize />
      </div>
      <Features />
      <Footer />
    </div>
  );
}

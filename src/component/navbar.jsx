'use client'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";



import { useState } from "react";
import Link from "next/link";

function Navbar() {
 const { data: session } = useSession();
const [isOpen, setIsOpen] = useState(false);

  return (
      <header className="bg-transparent shadow-sm">
        
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img
            src="/logo.png" // replace with your logo
            alt="logo"
            className="h-8 w-auto"
          /> */}
          <span className="ml-2 text-xl font-semibold text-gray-800">
            BagPack
          </span>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <input id="menu-toggle" type="checkbox" className="hidden peer" />
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer text-gray-700 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="h-6 w-6 peer-checked:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close Icon */}
            <svg
              className="hidden h-6 w-6 peer-checked:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden space-x-6 md:flex items-center">
          <Link href="#" className="text-gray-700 hover:text-red-600">
            Packages
          </Link>
          <Link href="#" className="text-gray-700 hover:text-red-600">
            Customize Trip
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-red-600">
           My Dashboard
          </Link>
          <Link href="#" className="text-gray-700 hover:text-red-600">
            Contact
          </Link>
          <Link href="#" className="text-gray-700 hover:text-red-600">
            Reviews
          </Link>
          <Link href="#" className="text-gray-700 hover:text-red-600">
              
          </Link>
          <span className="text-gray-400">|</span>
              {session ? (
              <div className="w-auto flex items-center gap-2">
                <img src={session.user?.image} alt="profile pic" className="w-8 h-8 rounded-2xl"/>
                <p>{session.user?.name}</p>
                <button onClick={() => signOut()} className="border p-1 rounded bg-amber-300">Logout</button>
              </div>
            ) : (
              <button onClick={() => signIn("google")}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>Login in with </button>
            )}

          
         
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className="block flex-col space-y-2 px-4 pb-4 peer-checked:flex md:hidden">
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Extensions
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Themes
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Blog
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Support
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Demo
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Docs
        </Link>
        <Link href="#" className="block text-gray-700 hover:text-red-600">
          Log In
        </Link>
        <Link
          href="#"
          className="block rounded-md bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600"
        >
          Join Now
        </Link>
      </div>
    </header>
  )
}

export default Navbar
'use client'
import React, { useEffect, useState } from 'react'

function Hero() {
  const images = [
    '/herobg.jpg',
    '/herobg2.jpg',
    '/herobg3.jpg',
    '/herobg4.jpg',
    '/herobg5.jpg',
    '/herobg6.jpg',
    '/herobg7.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length); // switch image
        setFade(false); // fade-in
      }, 500); // half the fade duration
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className={`relative flex h-[90vh] items-center justify-center bg-cover bg-center text-center `}
      style={{ backgroundImage: `url("/herobg6.jpg")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Discover Your Next <span className="text-orange-400">Adventure</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white sm:mt-6 sm:text-xl">
          Explore breathtaking destinations, create unforgettable memories, and
          embark on the journey of a lifetime.
        </p>
      </div>
    </section>
  )
}

export default Hero

'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Review = {
  image: string;
  name: string;
  title: string;
  quote: string;
};

const reviews: Review[] = [
  {
    image: '/mira.png',
    name: 'Mira K.',
    title: 'A DAILY RITUAL I LOVE',
    quote:
      'I was looking for something nourishing yet easy to prepare, and this has been a game-changer. Light on the stomach, but keeps me full and energized.',
  },
  {
    image: '/john.png',
    name: 'John D.',
    title: 'PERFECT START TO MY MORNINGS',
    quote:
      'This drink helps me stay focused and refreshed throughout the day. I actually look forward to it every morning.',
  },
  {
    image: '/raj.png',
    name: 'Raj P.',
    title: 'ENERGY WITHOUT THE CRASH',
    quote:
      'Gives me clean energy with no crashes. It fits right into my busy schedule and feels great.',
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentIndex];
  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-left w-full max-w-4xl mb-16 tracking-tight">
        SIPS OF WELLNESS, SHARED BY YOU.
      </h2>

      <div className="relative w-full max-w-4xl flex justify-center items-center" style={{ minHeight: 320 }}>
        {/* Left Side Partial Image */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 hidden md:block">
          <div
            className="w-32 h-44 overflow-hidden rounded-xl opacity-60 grayscale shadow-lg cursor-pointer"
            onClick={() => setCurrentIndex(prevIndex)}
          >
            <Image
              src={reviews[prevIndex].image}
              alt={reviews[prevIndex].name}
              width={128}
              height={176}
              className="object-cover w-full h-full"
              style={{ objectPosition: 'right' }}
            />
          </div>
        </div>

        {/* Main Review Box */}
        <div className="relative z-10 w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row bg-white border rounded-xl shadow-md p-8 items-center gap-8 w-full max-w-2xl min-h-[260px] cursor-pointer"
              onClick={() => setCurrentIndex(currentIndex)}
            >
              <Image
                src={currentReview.image}
                alt={currentReview.name}
                width={160}
                height={160}
                className="rounded-xl object-cover shadow-md"
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(currentIndex); }}
                style={{ cursor: 'pointer' }}
              />
              <div className="flex-1 flex flex-col justify-center h-full">
                <h3 className="text-2xl md:text-2xl font-bold mb-4 text-gray-800 leading-tight">
                  &ldquo;{currentReview.title}&rdquo;
                </h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl">
                  {currentReview.quote}
                </p>
                <p className="text-right text-gray-700 font-medium text-base">— {currentReview.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Partial Image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 hidden md:block">
          <div
            className="w-32 h-44 overflow-hidden rounded-xl opacity-60 grayscale shadow-lg cursor-pointer"
            onClick={() => setCurrentIndex(nextIndex)}
          >
            <Image
              src={reviews[nextIndex].image}
              alt={reviews[nextIndex].name}
              width={128}
              height={176}
              className="object-cover w-full h-full"
              style={{ objectPosition: 'left' }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnails for navigation (optional, below main box) */}
      <div className="flex gap-4 mt-10 md:mt-12">
        {reviews.map((review, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              className={`rounded-full border-2 transition-all duration-200 w-4 h-4 focus:outline-none ${
                isActive ? 'bg-gray-800 border-gray-800' : 'bg-gray-300 border-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show review by ${review.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}
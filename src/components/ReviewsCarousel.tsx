'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  image: string; // reviewer photo url
  heading: string;
  quote: string;
  author: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  // Handle fewer than 3 reviews gracefully
  const getIndex = (offset: number) => {
    if (reviews.length < 3) return (current + offset + reviews.length) % reviews.length;
    return (current + offset + reviews.length) % reviews.length;
  };

  return (
    <section className="w-full py-12 flex flex-col items-center relative select-none">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
        SIPS OF WELLNESS, SHARED BY YOU.
      </h2>
      <div className="relative flex items-center justify-center w-full max-w-3xl min-h-[320px]">
        {/* Left side image (partially visible, clickable) */}
        {reviews.length > 1 && (
          <motion.button
            className="hidden md:block absolute left-0 z-10 focus:outline-none"
            onClick={prev}
            aria-label="Previous Review"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={reviews[getIndex(-1)].image}
              alt=""
              className="h-40 w-40 object-cover rounded-xl shadow-lg opacity-70 translate-x-[-30%] grayscale"
              initial={{ scale: 0.85, opacity: 0.5 }}
              animate={{ scale: 0.92, opacity: 0.7 }}
              exit={{ scale: 0.8, opacity: 0.3 }}
              draggable={false}
            />
          </motion.button>
        )}

        {/* Center review */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            className="relative bg-white border rounded-xl shadow-md flex items-center px-4 md:px-10 py-8 w-full z-20"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0, scale: 1.04, zIndex: 2 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <motion.img
              src={reviews[current].image}
              alt=""
              className="h-40 w-40 min-w-[10rem] object-cover rounded-xl mr-6 shadow-md"
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              draggable={false}
            />
            <motion.div
              className="flex flex-col justify-between h-full flex-1 min-w-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h3 className="font-bold text-lg md:text-xl mb-2 uppercase">{reviews[current].heading}</h3>
              <blockquote className="text-gray-700 text-base md:text-lg mb-6">{`“${reviews[current].quote}”`}</blockquote>
              <div className="text-right font-medium text-gray-700">{`— ${reviews[current].author}`}</div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Right side image (partially visible, clickable) */}
        {reviews.length > 1 && (
          <motion.button
            className="hidden md:block absolute right-0 z-10 focus:outline-none"
            onClick={next}
            aria-label="Next Review"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={reviews[getIndex(1)].image}
              alt=""
              className="h-40 w-40 object-cover rounded-xl shadow-lg opacity-70 translate-x-[30%] grayscale"
              initial={{ scale: 0.85, opacity: 0.5 }}
              animate={{ scale: 0.92, opacity: 0.7 }}
              exit={{ scale: 0.8, opacity: 0.3 }}
              draggable={false}
            />
          </motion.button>
        )}
      </div>

      {/* Mobile navigation */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-3 mt-8 md:hidden">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
            onClick={prev}
            aria-label="Previous Review"
          >
            ‹
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
            onClick={next}
            aria-label="Next Review"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
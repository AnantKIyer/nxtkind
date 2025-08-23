'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-8 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <br/> <span className="text-green-500">Community</span> Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have transformed their nutrition and performance with NXTKIND.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current}
                className="flex flex-col lg:flex-row items-center p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                {/* Reviewer Image */}
                <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto lg:mx-0 relative">
                      <Image
                        src={reviews[current].image}
                        alt={reviews[current].author}
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:w-2/3 lg:pl-8">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {reviews[current].heading}
                    </h3>
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                      &ldquo;{reviews[current].quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="w-12 h-0.5 bg-green-500 mr-4"></div>
                      <span className="text-lg font-semibold text-gray-900">
                        {reviews[current].author}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
                  aria-label="Previous Review"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
                  aria-label="Next Review"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Preview Images */}
          {reviews.length > 1 && (
            <div className="hidden lg:flex justify-center mt-8 space-x-4">
              {reviews.map((review, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === current ? 'ring-2 ring-green-500 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={review.image}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Mobile Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center mt-8 lg:hidden">
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience the same transformation and share your story with thousands of others who have upgraded their nutrition game.
            </p>
            <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-200">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
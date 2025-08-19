"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "The Efficiency Paradox",
        description: "Why Optimizing Your Nutrition Is the New Luxury",
        img: "/the-efficiency-paradox.jpeg",
        url: "/blogs/the-efficiency-paradox",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
        id: 2,
        title: "Tiny but Lit!",
        description: "How Macronutrients Secretly Run the Whole Show",
        img: "/macro-nutrients.jpg",
        url: "/blogs/tiny-but-lit",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
        id: 3,
        title: "Fats don't make you fat",
        description: "Discover why healthy fats are essential for brain function",
        img: "/fats-not-fat.jpg",
        url: "/blogs/fat-that-dont-make-you-fat",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen overflow-hidden relative mt-14">
            <div
                className="flex h-full transition-all ease-in-out duration-1000"
                style={{ 
                    transform: `translateX(-${current * 100}vw)`,
                    width: `${slides.length * 100}vw`
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        className="w-screen h-full relative flex-shrink-0"
                        key={slide.id}
                    >
                        <Link href={slide.url} className="block h-full w-full relative">
                        <Image
                            src={slide.img}
                            alt={slide.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={index === 0}
                        />
                        </Link>
                    </div>
                ))}
            </div>
            {/* Navigation Dots */}
            <div className="absolute bottom-24 left-16 flex gap-4">
              {slides.map((slide, index) => (
                  <button
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      className={`w-4 h-4 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg ${current === index ? "scale-125 bg-gray-800 ring-2 ring-gray-900" : "bg-gray-600/80 ring-1 ring-gray-700 hover:bg-gray-700"}`}
                      key={slide.id}
                      onClick={() => setCurrent(index)}
                  >
                  </button>
              ))}
            </div>
        </div>
    );
};

export default Slider;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Meal in one",
        description: "Sale! Up to 50% off!",
        img: "/nxtBanner_01.jpg",
        url: "/blogs/the-efficiency-paradox",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
        id: 2,
        title: "Fulfillment in a bottle",
        description: "Sale! Up to 50% off!",
        img: "/nxtBanner_02.jpg",
        url: "/vanilla-coffee-flavour",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
        id: 3,
        title: "Exciting flavour Collections",
        description: "Sale! Up to 50% off!",
        img: "/nxtBanner_03.jpg",
        url: "/blogs/tiny-but-lit",
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
        <div className="h-[90vh] overflow-hidden relative">
            <div
                className="w-max h-full mt-0 flex transition-all ease-in-out duration-1000"
                style={{ transform: `translateX(-${current * 100}vw)` }}
            >
                {slides.map((slide) => (
                    <div
                        className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
                        key={slide.id}
                    >
                       
                        {/* IMAGE CONTAINER */}
                        <div className="h-full w-full relative">
                            <Link href={slide.url} className="block h-full w-full relative">
                            <Image
                                src={slide.img}
                                alt=""
                                fill
                                sizes="100%"
                                className="object-cover"
                            />
                            </Link>
                        </div>
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

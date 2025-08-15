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
        <div className="h-[90vh] overflow-hidden">
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
                            <Link href={slide.url}>
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
            {/* <div className="absolute m-auto left-1/2 bottom-20 flex gap-4">
              {slides.map((slide, index) => (
                  <div
                      className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
                          current === index ? "scale-150" : ""
                      }`}
                      key={slide.id}
                      onClick={() => setCurrent(index)}
                  >
                      {current === index && (
                          <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
                      )}
                  </div>
              ))}
            </div> */}
        </div>
    );
};

export default Slider;

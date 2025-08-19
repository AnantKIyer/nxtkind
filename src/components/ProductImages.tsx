"use client";

import Image from "next/image";
import { useState } from "react";

// const items:item[] = [
//   {
//     _id: 1,
//     url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     _id: 2,
//     url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     _id: 3,
//     url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     _id: 4,
//     url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
// ];

interface ProductImage {
    _id?: string;
    image?: {
        url?: string;
    };
}

const ProductImages = ({ items }: { items: ProductImage[] }) => {
    const [index, setIndex] = useState(0);
    
    if (!items || items.length === 0) {
        return (
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={items[index]?.image?.url || ''}
                    alt="Product"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            
            {/* Thumbnail Images */}
            {items.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {items.map((item: ProductImage, i: number) => (
                        <div
                            className={`relative h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                i === index 
                                    ? 'ring-2 ring-green-500 ring-offset-2' 
                                    : 'hover:ring-2 hover:ring-gray-300 ring-offset-2'
                            }`}
                            key={item._id}
                            onClick={() => setIndex(i)}
                        >
                            <Image
                                src={item.image?.url || ''}
                                alt={`Product view ${i + 1}`}
                                fill
                                sizes="25vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImages;

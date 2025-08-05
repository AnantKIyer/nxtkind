'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ingredients = [
  {
    name: 'Pea protein',
    image: '/pea-protein.jpg',
    description: 'A clean, complete source of plant protein rich in BCAAs. Supports muscle recovery, satiety, and metabolic health without the heaviness of dairy. Easy to digest, light on the gut, big on performance.'
  },
  {
    name: 'Brown rice protein',
    image: '/brown-rice.jpg',
    description: 'Naturally hypoallergenic and rich in essential amino acids like cysteine and methionine. Complements pea protein to create a complete amino acid profile fueling strength, endurance, and lean muscle maintenance.'
  },
  {
    name: 'Stevia',
    image: '/stevia.jpg',
    description: 'A plant-derived sweetener with zero calories and zero blood sugar impact. Adds natural sweetness without added sugar, artificial aftertaste, or energy crashes. Ideal for daily, clean-eating routines.'
  },
  {
    name: 'Green tea',
    image: '/green-tea.jpg',
    description: 'Naturally rich in antioxidants like EGCG, which support fat metabolism, cellular health, and focus. A clean, plant-powered pick-me-up for sharper mornings and sustained clarity.'
  },
  {
    name: 'Coconut',
    image: '/coconut.jpg',
    description: 'Medium-chain triglycerides (MCTs) from coconuts provide fast, clean-burning fuel for your brain and body. Known to support energy, focus, and satiety without spiking insulin or storing as fat.'
  },
];

export default function IngredientsSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="py-16 mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Formulated <span className='font-light'>with the </span>
          <br />
           &ensp; &ensp; Super Ingredients
        </h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {ingredients.map((item, index) => (
            <div
              key={item.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4"
              >
                {openAccordion === index ? (
                  // Expanded state: text on left, image on right
                  <>
                    <div className="flex items-center space-x-3 transition-all duration-500 ease-out">
                      <FaChevronLeft className="text-gray-500 text-sm transition-transform duration-300 ease-out" />
                      <span className="text-gray-700 font-bold text-xl transition-all duration-500 ease-out">{item.name}</span>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded object-cover transition-all duration-500 ease-out"
                    />
                  </>
                ) : (
                  // Collapsed state: image on left, text on right
                  <>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded object-cover transition-all duration-500 ease-out"
                    />
                    <div className="flex items-center space-x-3 transition-all duration-500 ease-out">
                      <span className="text-gray-700 font-bold text-xl transition-all duration-500 ease-out">{item.name}</span>
                      <FaChevronRight className="text-gray-500 text-sm transition-transform duration-300 ease-out" />
                    </div>
                  </>
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                openAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`p-4 pt-0 transition-all duration-500 ease-out ${
                  openAccordion === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-700 text-xl flex justify-center font-extrabold tracking-wide">
          Backed By Science, Chosen For Strength — From Core To Cardio.
        </p>
      </div>
    </section>
  );
}
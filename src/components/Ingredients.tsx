'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ingredients = [
  {
    name: 'Pea protein',
    image: '/pea-protein.jpg',
    description: 'A clean, complete source of plant protein rich in BCAAs. Supports muscle recovery, satiety, and metabolic health without the heaviness of dairy. Easy to digest, light on the gut, big on performance.',
    icon: '🥜',
    color: 'green'
  },
  {
    name: 'Brown rice protein',
    image: '/brown-rice.jpg',
    description: 'Naturally hypoallergenic and rich in essential amino acids like cysteine and methionine. Complements pea protein to create a complete amino acid profile fueling strength, endurance, and lean muscle maintenance.',
    icon: '🌾',
    color: 'brown'
  },
  {
    name: 'Stevia',
    image: '/stevia.jpg',
    description: 'A plant-derived sweetener with zero calories and zero blood sugar impact. Adds natural sweetness without added sugar, artificial aftertaste, or energy crashes. Ideal for daily, clean-eating routines.',
    icon: '🍃',
    color: 'green'
  },
  {
    name: 'Green tea',
    image: '/green-tea.jpg',
    description: 'Naturally rich in antioxidants like EGCG, which support fat metabolism, cellular health, and focus. A clean, plant-powered pick-me-up for sharper mornings and sustained clarity.',
    icon: '🍵',
    color: 'green'
  },
  {
    name: 'Coconut',
    image: '/coconut.jpg',
    description: 'Medium-chain triglycerides (MCTs) from coconuts provide fast, clean-burning fuel for your brain and body. Known to support energy, focus, and satiety without spiking insulin or storing as fat.',
    icon: '🥥',
    color: 'brown'
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case 'green':
      return 'border-green-200 bg-green-50 hover:bg-green-100';
    case 'brown':
      return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
    default:
      return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
  }
};

export default function IngredientsSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Formulated with <br/><span className="text-green-600">Super Ingredients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every ingredient is carefully selected for its proven benefits, backed by science and chosen for strength.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {ingredients.map((item, index) => (
            <div
              key={item.name}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border h-fit ${getColorClasses(item.color)}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 hover:bg-opacity-50 transition-colors duration-200"
              >
                {openAccordion === index ? (
                  // Expanded state: text on left, image on right
                  <>
                    <div className="flex items-center space-x-4 transition-all duration-500 ease-out">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="text-left">
                        <span className="text-gray-900 font-bold text-xl transition-all duration-500 ease-out block">
                          {item.name}
                        </span>
                        <span className="text-green-600 text-sm font-medium">Click to collapse</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover transition-all duration-500 ease-out shadow-md"
                      />
                      <FaChevronLeft className="text-gray-500 text-lg transition-transform duration-300 ease-out" />
                    </div>
                  </>
                ) : (
                  // Collapsed state: image on left, text on right
                  <>
                    <div className="flex items-center space-x-4 transition-all duration-500 ease-out">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover transition-all duration-500 ease-out shadow-md"
                      />
                      <div className="text-left">
                        <span className="text-gray-900 font-bold text-xl transition-all duration-500 ease-out block">
                          {item.name}
                        </span>
                        <span className="text-gray-500 text-sm">Click to learn more</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{item.icon}</div>
                      <FaChevronRight className="text-gray-500 text-lg transition-transform duration-300 ease-out" />
                    </div>
                  </>
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                openAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`p-6 pt-0 transition-all duration-500 ease-out ${
                  openAccordion === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Backed By Science, Chosen For Strength
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              From core to cardio, every ingredient serves a purpose in your performance journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Plant-Based</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Scientifically Proven</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Performance Focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
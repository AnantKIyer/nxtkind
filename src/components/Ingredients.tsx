'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';



const ingredients = [
  {
    name: 'PEA PROTEIN',
    image: '/pea-protein.png',
    modal: '/pea-modal.png'
  },
  {
    name: 'FLAXSEED',
    image: '/flaxseed.png',
    modal: '/flaxseed-modal.png'
  },
  {
    name: 'OATS',
    image: '/oats.png',
    modal: '/oats-modal.png',
  },
  {
    name: 'FABA BEAN PROTEIN',
    image: '/fabia-bean.png',
    modal: '/faba-bean-modal.png',
  },
  {
    name: 'COCONUT',
    image: '/coconut.png',
    modal: '/coconut-modal.png',
  },
];

export default function IngredientsSection() {

    const [modal, setModal] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)

    const handleModal = (ingredient: string) => {
        setModal(true);
        setSelectedIngredient(ingredient);
        setTimeout(() => {
            setIsAnimating(true);
        }, 10);
    }

    const closeModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setModal(false);
        }, 300); // Match the transition duration
    }

  return (
    <section className="py-16 mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {modal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={closeModal}
        >
          <div 
            className={`rounded-lg max-w-md transition-all duration-300 ease-in-out transform ${
              isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedIngredient}
              alt='Modal'
              height={600} 
              width={600} 
              className="transition-opacity duration-300 ease-in-out"
            />
          </div>
        </div>
      )}
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap justify-center gap-[38px]">
          {ingredients.map((item) => (
            <div
              key={item.name}
              className="relative w-44 h-[340px] rounded-xl overflow-hidden shadow-xl group"
              onClick={() => handleModal(item.modal)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-between items-center p-4 text-white z-10">
                <div className="text-lg font-bold text-center leading-tight">
                  {item.name}
                </div>
                <FaChevronDown className="text-white text-xs opacity-80" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-700 flex justify-center font-extrabold tracking-wide">
          Backed By Science, Chosen For Strength — From Core To Cardio.
        </p>
      </div>
    </section>
  );
}
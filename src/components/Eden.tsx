'use client'

import Image from 'next/image';
import { useState } from 'react';
import { content } from '@/lib/content';

export default function Eden() {
    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <section className="w-screen h-screen bg-[url('/eden.png')] text-white" style={{backgroundSize: 'cover'}}>
            <div className="flex h-full">
                <div className="w-1/3 flex items-start justify-center pt-20 px-12">
                    <h1 className="text-4xl font-bold">Fueling the goals of over 3 million people worldwide</h1>
                </div>
                <div className="w-1/3 flex items-end justify-center pb-20">
                    <Image
                        src='/eye.png'
                        alt='Eye'
                        width={200}
                        height={200}
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full hover:bg-opacity-90 transition-all"
                    />
                </div>
                <div className="w-1/3 flex items-center justify-center">
                    <Image 
                        src="/eden-detail.png" 
                        alt="Eden Detail" 
                        width={250}
                        height={250}
                        className="max-w-[80%] h-auto"
                    />
                </div>
            </div>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div 
                        className="bg-white text-black p-8 rounded-lg max-w-2xl w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-4xl font-bold pb-3">{content.heading}</h1>
                        <h3 className='text-2xl font-bold pb-3'>{content.subHeading}</h3>
                        <p>{content.body}</p>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
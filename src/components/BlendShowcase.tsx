import Image from 'next/image';
import { LogoTicker } from './LogoTicker';
import Link from 'next/link';

const blends = [
    { flavor: 'ZERONOTE', color: 'text-green-500', image: '/nxtProduct_unflavoured.png', url:'/unflavoured-flavour' },
    { flavor: 'DARKCODE', color: 'text-orange-500', image: '/nxtProduct_chocolate.png', url:'/chocolate-flavour' },
    { flavor: 'WHITENOISE', color: 'text-red-600', image: '/nxtProduct_vanilla.png', url:'/vanilla-flavour' },
    { flavor: 'HYPERBEAN', color: 'text-cyan-500', image: '/nxtProduct_coffee.png', url:'/coffee-flavour' },
];

export default function BlendShowcase() {
    return (
        <section className="-mt-16 pt-24 pb-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mx-auto bg-white rounded-t-4xl shadow-[0_-7px_14px_#EAEAEA] z-20 relative">
            <div className="w-full px-4 md:px-20">
                <div className="w-full flex items-center justify-center px-5 py-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-700 text-center">Discover your perfect blend</h1>
                </div>
                
                <div className="flex items-center justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto w-full">
                        {blends.map((blend, index) => (
                            <div key={index} className={` flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg py-4 px-6 border border-gray-100 hover:shadow-xl transition h-full`}>
                                <Link href={blend.url} className="flex flex-col items-center justify-center h-full w-full">
                                    <p className={`tracking-wide text-center font-bold ${blend.color} text-lg mb-3`}>{blend.flavor}</p>
                                    <div className="w-full h-50 flex items-center justify-center mb-3">
                                        <Image 
                                            src={blend.image} 
                                            alt={blend.flavor} 
                                            width={200} 
                                            height={200} 
                                            className="w-full h-full object-cover hover:scale-110 transition duration-200 ease-in-out" 
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container pt-8 flex justify-center">
                    <LogoTicker/>
                </div>
            </div>
        </section>
    );
}
import Image from 'next/image';
import ParallaxWrapper from './ParallaxWrapper';
import { LogoTicker } from './LogoTicker';
import Link from 'next/link';

const blends = [
    { flavor: 'VANILLA', color: 'bg-green-500', image: '/vanilla-green.png', url:'/vanilla-coffee-flavour' },
    { flavor: 'CHOCOLATE', color: 'bg-orange-500', image: '/chocolate-orange.png', url:'/chocolate-flavour' },
    { flavor: 'HYPERBEAN', color: 'bg-red-600', image: '/hyperbean-red.png', url:'/hyperbean-red-flavour' },
    { flavor: 'HAZLENUT', color: 'bg-cyan-500', image: '/vanilla-blue.png', url:'/hazlenut-flavour' },
];

export default function BlendShowcase() {
    return (
        <ParallaxWrapper speed={0.3} className="relative">
            <section className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mx-auto bg-white rounded-t-4xl shadow-[0_-7px_14px_#EAEAEA] z-20 relative">
                
                <div className="w-full px-4 md:px-20">
                    <div className="w-full flex items-center justify-center px-5 py-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 text-center">Discover your perfect blend</h1>
                    </div>
                    
                    <div className="flex items-center justify-center mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto w-full">
                            {blends.map((blend, index) => (
                                <div key={index} className={` flex flex-col items-center justify-center ${blend.color} rounded-2xl shadow-lg py-6 border border-gray-100 hover:shadow-xl transition h-full`}>
                                    <Link href={blend.url} className="flex flex-col items-center justify-center h-full w-full">
                                        <p className='tracking-wide text-center text-white font-bold text-lg mb-4'>{blend.flavor}</p>
                                        <div className="w-32 h-32 flex items-center justify-center mb-4">
                                            <Image 
                                                src={blend.image} 
                                                alt={blend.flavor} 
                                                width={128} 
                                                height={128} 
                                                className="w-full h-full object-contain hover:scale-110 transition duration-200 ease-in-out" 
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container pt-10 flex justify-center">
                        <LogoTicker/>
                    </div>
                </div>
            </section>
        </ParallaxWrapper>
    );
}
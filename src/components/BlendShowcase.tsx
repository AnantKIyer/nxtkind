import Image from 'next/image';

import { LogoTicker } from './LogoTicker';

const blends = [
    { flavor: 'VANILLA', color: 'bg-green-500', image: '/vanilla-green.png' },
    { flavor: 'CHOCOLATE', color: 'bg-orange-500', image: '/chocolate-orange.png' },
    { flavor: 'HYPERBEAN', color: 'bg-red-600', image: '/hyperbean-red.png' },
    { flavor: 'VANILLA', color: 'bg-cyan-500', image: '/vanilla-blue.png' },
];

// TODO: Remove the line and spread out

export default function BlendShowcase() {
    return (
        <section className="py-10 mx-auto bg-white rounded-t-3xl shadow-[0_7px_14px_#EAEAEA] z-20">
            <div className="w-full px-10 ">

                <div className="flex flex-col lg:flex-row mt-10 items-center gap-8 lg:items-end lg:justify-center">
                    {blends.map((blend, index) => (
                        <div key={index} className={` card flex flex-col items-center justify-items-center ${blend.color}`}>
                            <p className='tracking-wide text-white font-bold pt-5'>{blend.flavor} </p>
                            <Image src={blend.image} alt={blend.flavor} width={200} height={200} className="w-full h-auto mt-10 px-5 hover:scale-110 transition duration-200 ease-in-out" />
                        </div>
                    ))}
                </div>

                <LogoTicker/>
            </div>
        </section>
    );
}
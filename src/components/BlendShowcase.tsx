import Image from 'next/image';

const blends = [
    { flavor: 'VANILLA', color: 'bg-green-500', image: '/vanilla-green.png' },
    { flavor: 'CHOCOLATE', color: 'bg-orange-500', image: '/chocolate-orange.png' },
    { flavor: 'HYPERBEAN', color: 'bg-red-600', image: '/hyperbean-red.png' },
    { flavor: 'VANILLA', color: 'bg-cyan-500', image: '/vanilla-blue.png' },
];

const icons = [
    { src: '/iso-icon.png', alt: 'ISO Certified' },
    { src: '/no-flavour.png', alt: 'No Artificial Flavours' },
    { src: '/gluten-free.png', alt: 'Gluten Free' },
    { src: '/natural.png', alt: '100% Natural' },
    { src: '/gmo-free.png', alt: 'Non-GMO' },
    { src: '/no-color.png', alt: 'No Artificial Colors' },
];

// TODO: Remove the line and spread out

export default function BlendShowcase() {
    return (
        <section className="py-10 px-4 bg-white">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-center justify-center p-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center mb-12">
                    {blends.map((blend, index) => (
                        <div key={index} className={` w-48 h-64 rounded-xl m-5 md:mx-10 shadow-lg flex flex-col items-center justify-items-center ${blend.color}`}>
                            <p className='tracking-wide text-white pt-5'>{blend.flavor} </p>
                            <img src={blend.image} alt={blend.flavor} className="w-full h-auto mt-10 px-5 hover:scale-110 transition duration-200 ease-in-out" />
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-between gap-4 md:gap-8 2xl:gap-20 pt-6 px-10">
                    {icons.map((icon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Image src={icon.src} alt={icon.alt} width={40} height={40} className="w-10 h-10" />
                            <p className="text-xs mt-2">{icon.alt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
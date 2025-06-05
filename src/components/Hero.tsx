// components/HeroSection.jsx
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="-mt-11 card bg-white z-20 rounded-t-4xl">
            <div className='flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16'>

            {/* Text Section */}
            <div className="order-1 md:order-1 w-full md:w-1/2 text-center items-start md:text-left space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#414143]">
                    A Balanced meal, <br />
                    Inspired by nature.
                </h1>
                <p className="text-gray-600 text-lg">
                    A meal replacement that feels as good as it tastes.
                </p>
            </div>

            {/* Image Section */}
            <div className="order-2 md:order-2 w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <Image
                    src="/product-coffee.png" // replace with your image in /public
                    alt="Hero Image"
                    width={500}
                    height={400}
                    className="rounded-xl object-cover"
                />
            </div>
            </div>
        </section>
    )
}
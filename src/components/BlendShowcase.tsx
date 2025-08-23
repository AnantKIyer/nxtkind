import Image from 'next/image';
import { LogoTicker } from './LogoTicker';
import Link from 'next/link';

const blends = [
    { 
        flavor: 'ZERONOTE', 
        subtitle: 'Pure & Natural',
        description: 'Unflavored perfection for those who prefer pure nutrition without any additives.',
        color: 'text-green-600', 
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        image: '/nxtProduct_unflavoured.png', 
        url:'/unflavoured-flavour' 
    },
    { 
        flavor: 'DARKCODE', 
        subtitle: 'Rich & Indulgent',
        description: 'Smooth chocolate flavor that satisfies your sweet cravings while fueling your body.',
        color: 'text-amber-800', 
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        image: '/nxtProduct_chocolate.png', 
        url:'/chocolate-flavour' 
    },
    { 
        flavor: 'WHITENOISE', 
        subtitle: 'Smooth & Creamy',
        description: 'Delicate vanilla notes that make every sip a delightful experience.',
        color: 'text-cyan-600', 
        bgColor: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        image: '/nxtProduct_vanilla.png', 
        url:'/vanilla-flavour' 
    },
    { 
        flavor: 'HYPERBEAN', 
        subtitle: 'Bold & Energizing',
        description: 'Rich coffee flavor that gives you the perfect boost to power through your day.',
        color: 'text-red-600', 
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        image: '/nxtProduct_coffee.png', 
        url:'/coffee-flavour' 
    },
];

export default function BlendShowcase() {
    return (
        <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Discover Your <br/>
                        <span className="text-green-600">Perfect</span> Blend
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Scientifically formulated flavors designed for hustlers who demand both taste and performance. 
                        Choose your ideal companion for the journey ahead.
                    </p>
                </div>

                {/* Blends Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {blends.map((blend, index) => (
                        <Link 
                            key={index} 
                            href={blend.url} 
                            className="group block"
                        >
                            <div className={`bg-white rounded-3xl shadow-lg border ${blend.borderColor} hover:shadow-xl transition-all duration-300 ease-in-out group-hover:scale-105 h-full overflow-hidden flex flex-col`}>
                                {/* Product Image */}
                                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                                    <Image 
                                        src={blend.image} 
                                        alt={blend.flavor} 
                                        width={300} 
                                        height={300} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out" 
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-3">
                                        <h3 className={`text-2xl font-bold ${blend.color} mb-1`}>
                                            {blend.flavor}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            {blend.subtitle}
                                        </p>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                                        {blend.description}
                                    </p>

                                    {/* CTA Button */}
                                    <div className={`inline-flex items-center justify-center w-full py-3 px-4 ${blend.bgColor} ${blend.color} rounded-xl font-semibold text-sm group-hover:bg-opacity-80 transition-colors duration-200 mt-auto`}>
                                        Explore Blend
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Features Section */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            The Nxt<span className="text-green-600">kind</span> Difference
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Every blend is crafted with precision to deliver the perfect balance of taste, nutrition, and performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Scientifically Formulated</h4>
                            <p className="text-gray-600">Each blend is backed by research and optimized for maximum effectiveness.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Quick & Convenient</h4>
                            <p className="text-gray-600">Ready in seconds, perfect for busy hustlers who need nutrition on the go.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h4>
                            <p className="text-gray-600">Made with the finest ingredients, ensuring you get the best nutrition possible.</p>
                        </div>
                    </div>
                </div>

                {/* LogoTicker Section */}
                <div className="text-center">
                    <div className="mb-8">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Professionals</h4>
                        <p className="text-gray-600">Join thousands of hustlers who have transformed their nutrition with NXTKIND</p>
                    </div>
                    <div className="bg-transparent">
                        <LogoTicker />
                    </div>
                </div>
            </div>
        </section>
    );
}
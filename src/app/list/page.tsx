import Image from "next/image";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import {wixClientServer} from "@/lib/wixClientServer";

type SearchParams = Promise<{
    name?: string;
    min?: number;
    max?: number;
    page?: string;
    sort?: string;
}>

const ListPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const catParams = await searchParams; 
    const wixClient = await wixClientServer();

    const cat = await wixClient.collections.getCollectionBySlug("all-products");

    return (
        <div className="scroll-smooth text-gray-800 font-sans pt-20">
            {/* Hero Section */}
            <section className="h-[40vh] min-h-[400px] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="w-full md:w-2/3 py-8 md:py-16">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Discover Your Perfect<br /> <span className="text-green-600">Blend</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                        Scientifically crafted nutrition for hustlers who demand performance without compromise. Find your ideal flavor and fuel your ambitions.
                    </p>
                </div>
                <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
                                         <Image 
                         src="/nxtProduct_vanilla.png" 
                         alt="NXTKIND Products" 
                         width={200} 
                         height={200} 
                         className="w-48 h-auto"
                     />
                </div>
            </section>

            {/* Products Section */}
            <section className="bg-white py-20 px-8 md:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Premium Nutrition Collection
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our carefully crafted flavors, each designed to deliver complete nutrition in every serving.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-12">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Refine Your Selection</h3>
                            <Filter/>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="bg-white rounded-2xl">
                        <ProductList
                            categoryId={
                                cat.collection?._id || "00000000-000000-000000-000000000001"
                            }
                            searchParams={catParams}
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose NXTKIND */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose NXTKIND?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the difference that science-backed nutrition makes in your daily performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl mb-6">🔬</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Scientifically Formulated</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Every ingredient is backed by clinical research and carefully selected for its proven benefits to your health and performance.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl mb-6">⚡</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Nutrition</h3>
                            <p className="text-gray-700 leading-relaxed">
                                25+ essential vitamins and minerals in every serving, providing complete nutrition for your busy lifestyle.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl mb-6">🌱</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Plant-Based Excellence</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Premium plant proteins and natural ingredients that are easy to digest and gentle on your system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flavor Guide */}
            <section className="bg-white py-20 px-8 md:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Find Your Perfect Flavor
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Each flavor is crafted to deliver the same complete nutrition with unique taste profiles to suit your preferences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <div className="text-4xl mb-4">☕</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Coffee</h3>
                                <p className="text-gray-600 text-sm">Rich, bold flavor with natural coffee notes for coffee lovers.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🍫</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Chocolate</h3>
                                <p className="text-gray-600 text-sm">Smooth, indulgent chocolate taste that satisfies your sweet cravings.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🍦</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Vanilla</h3>
                                <p className="text-gray-600 text-sm">Classic vanilla flavor that&apos;s versatile and universally loved.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🌾</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Unflavored</h3>
                                <p className="text-gray-600 text-sm">Pure nutrition without any flavor, perfect for smoothies and recipes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 px-8 md:px-24">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Transform Your Nutrition?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Join thousands of hustlers who have already upgraded their nutrition game with NXTKIND&apos;s scientifically formulated meal replacement.
                    </p>
                    <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg">
                        Start Your Journey Today
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ListPage
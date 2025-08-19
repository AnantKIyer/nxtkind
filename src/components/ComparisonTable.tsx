import React from 'react';
import Image from 'next/image';
import { CheckCircle2, XCircle } from 'lucide-react';

const ComparisonTable: React.FC = () => {
    const comparisonData = [
        { 
            metric: 'Cost', 
            nxtkind: 'Affordable & Saves Time', 
            homeCooked: 'Ingredients + Cooking Time', 
            junkFood: 'Expensive & Health Cost',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Time To Prepare', 
            nxtkind: '30 Seconds', 
            homeCooked: '30-60 Minutes', 
            junkFood: 'Instant But Unhealthy',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Taste', 
            nxtkind: 'Delicious & Smooth', 
            homeCooked: 'Depends On Recipe', 
            junkFood: 'Tasty But Addictive',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Nutritional Value', 
            nxtkind: 'Scientifically Balanced', 
            homeCooked: 'High, But Varies', 
            junkFood: 'Low, Mostly Empty Calories',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Protein Content', 
            nxtkind: 'High Protein (25g)', 
            homeCooked: 'Moderate But Hard To Track', 
            junkFood: 'Almost None',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Ingredients', 
            nxtkind: '100% Natural & Clinically Tested', 
            homeCooked: 'Natural But Hard To Measure', 
            junkFood: 'Artificial, Unhealthy & Additives',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Digestibility', 
            nxtkind: 'Easy To Digest & Light', 
            homeCooked: 'Can Be Heavy On Stomach', 
            junkFood: 'Hard To Digest',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Suitability', 
            nxtkind: 'On The Go, Anytime Meal', 
            homeCooked: 'Requires Cooking Skills', 
            junkFood: 'Craving Based Not A Meal',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        },
        { 
            metric: 'Long Term Health Impact', 
            nxtkind: 'Boosts Energy & Metabolism', 
            homeCooked: 'Depends On Diet', 
            junkFood: 'Leads To Weight Gain & Fatigue',
            nxtkindIcon: 'check',
            homeCookedIcon: 'neutral',
            junkFoodIcon: 'cross'
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'check':
                return <CheckCircle2 size={20} className="text-green-500" />;
            case 'cross':
                return <XCircle size={20} className="text-red-500" />;
            default:
                return <div className="w-5 h-0.5 bg-gray-400"></div>;
        }
    };

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Why Choose <span className="text-green-600">NXTKIND</span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how NXTKIND compares to traditional meal options and junk food alternatives.
                    </p>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                        <div className="p-6 text-left">
                            <h3 className="text-lg font-bold text-gray-900">Comparison Metric</h3>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-bold text-gray-900">Home Cooked</h3>
                            <p className="text-sm text-gray-600 mt-1">Traditional Meals</p>
                        </div>
                        <div className="p-6 text-center bg-green-600 text-white">
                            <div className="flex items-center justify-center mb-2">
                                <Image src="/nxt-logo-white.png" alt="NXTKIND" width={80} height={25} className="h-6 w-auto" />
                            </div>
                            <p className="text-sm text-green-100">Scientifically Formulated</p>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-bold text-gray-900">Junk Food</h3>
                            <p className="text-sm text-gray-600 mt-1">Fast Food & Snacks</p>
                        </div>
                    </div>

                    {/* Table Rows */}
                    {comparisonData.map((item, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                                index === comparisonData.length - 1 ? 'border-b-0' : ''
                            }`}
                        >
                            <div className="p-6 text-left">
                                <h4 className="font-semibold text-gray-900">{item.metric}</h4>
                            </div>
                            <div className="p-6 text-center">
                                <div className="flex items-center justify-center mb-2">
                                    {getIcon(item.homeCookedIcon)}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{item.homeCooked}</p>
                            </div>
                            <div className="p-6 text-center bg-green-50 border-l border-r border-green-200">
                                <div className="flex items-center justify-center mb-2">
                                    {getIcon(item.nxtkindIcon)}
                                </div>
                                <p className="text-green-800 text-sm font-medium leading-relaxed">{item.nxtkind}</p>
                            </div>
                            <div className="p-6 text-center">
                                <div className="flex items-center justify-center mb-2">
                                    {getIcon(item.junkFoodIcon)}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{item.junkFood}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-6">
                    {comparisonData.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">{item.metric}</h3>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                {/* Home Cooked */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(item.homeCookedIcon)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Home Cooked</h4>
                                        <p className="text-gray-600 text-sm">{item.homeCooked}</p>
                                    </div>
                                </div>

                                {/* NXTKIND */}
                                <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-xl border border-green-200">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(item.nxtkindIcon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <Image src="/nxt-logo.png" alt="NXTKIND" width={60} height={18} className="h-4 w-auto mr-2" />
                                            <h4 className="font-semibold text-green-800 text-sm">NXTKIND</h4>
                                        </div>
                                        <p className="text-green-700 text-sm">{item.nxtkind}</p>
                                    </div>
                                </div>

                                {/* Junk Food */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(item.junkFoodIcon)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Junk Food</h4>
                                        <p className="text-gray-600 text-sm">{item.junkFood}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
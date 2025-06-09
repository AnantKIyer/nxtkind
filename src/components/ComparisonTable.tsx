import React from 'react';
import { ArrowRight } from 'lucide-react';

const ComparisonTable: React.FC = () => {
    const comparisonData = [
        { metric: 'Cost', nxtkind: 'Affordable & Saves Time', homeCooked: 'Ingredients + Cooking Time', junkFood: 'Expensive & Health Cost' },
        { metric: 'Time To Prepare', nxtkind: '10 Seconds', homeCooked: '30 To 60 Minutes', junkFood: 'Instant But Unhealthy' },
        { metric: 'Taste', nxtkind: 'Delicious & Smooth', homeCooked: 'Depends On Recipe', junkFood: 'Tasty But Addictive' },
        { metric: 'Nutritional Value', nxtkind: 'Scientifically Balanced & Complete Nutrition', homeCooked: 'High, But Varies', junkFood: 'Low, Mostly Empty Calories' },
        { metric: 'Protein Content', nxtkind: 'High Protein', homeCooked: 'Moderate But Hard To Track', junkFood: 'Almost None' },
        { metric: 'Ingredients', nxtkind: '100% Natural & Clinically Tested', homeCooked: 'Natural But Hard To Measure', junkFood: 'Artificial, Unhealthy & Additives' },
        { metric: 'Digestibility', nxtkind: 'Easy To Digest & Light', homeCooked: 'Can Be Heavy On Stomach', junkFood: 'Hard To Digest' },
        { metric: 'Suitability', nxtkind: 'On The Go, Anytime Meal', homeCooked: 'Requires Cooking Skills', junkFood: 'Craving Based Not A Meal' },
        { metric: 'Long Term Health Impact', nxtkind: 'Boosts Energy & Metabolism', homeCooked: 'Depends On Diet', junkFood: 'Leads To Weight Gain & Fatigue' }
    ];

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="absolute left-0 top-1/4 w-4 h-64 bg-blue-100 rounded-r-full"></div>
            <div className=" flex flex-col container mx-auto px-4">

                {/* Table Header */}
                <div className="grid grid-cols-4 text-center font-medium text-gray-700 border-b border-gray-300 pb-3 mb-6">
                    <div className="text-left pl-4">Metric</div>
                    <div>
                        Ghar Ka Khana
                        <span className="block text-sm font-normal text-gray-500">(Home Cooked)</span>
                    </div>
                    <div>
            <span className="text-white bg-gray-800 px-3 py-1 rounded-full">
              NXT<span className="text-green-400">KIND</span>
            </span>
                    </div>
                    <div>Junk Food</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-3">
                    {comparisonData.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-4 border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                            <div className="px-4 py-3 text-sm text-left font-medium text-gray-800 bg-gray-50">
                                {item.metric}
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-700 text-center border-l border-gray-200">
                                {item.homeCooked}
                            </div>
                            <div className="px-4 py-3 text-sm text-white text-center font-medium bg-gray-800 border-l border-gray-200">
                                {item.nxtkind}
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-700 text-center border-l border-gray-200">
                                {item.junkFood}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-12 flex justify-center">
                    <button className="flex items-center bg-white border border-gray-300 rounded-full px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <span className="mr-2 font-medium">Benefits</span>
                        <div className="bg-gray-800 rounded-full p-1">
                            <ArrowRight size={14} className="text-white" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
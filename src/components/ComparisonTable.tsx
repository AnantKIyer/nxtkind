import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const ComparisonTable: React.FC = () => {
    const comparisonData = [
        { metric: 'Cost', nxtkind: 'Affordable & Saves Time', homeCooked: 'Ingredients + Cooking Time', junkFood: 'Expensive & Health Cost' },
        { metric: 'Time To Prepare', nxtkind: '10 Seconds', homeCooked: '30 To 60 Minutes', junkFood: 'Instant But Unhealthy' },
        { metric: 'Taste', nxtkind: 'Delicious & Smooth', homeCooked: 'Depends On Recipe', junkFood: 'Tasty But Addictive' },
        { metric: 'Nutritional Value', nxtkind: 'Scientifically Balanced', homeCooked: 'High, But Varies', junkFood: 'Low, Mostly Empty Calories' },
        { metric: 'Protein Content', nxtkind: 'High Protein', homeCooked: 'Moderate But Hard To Track', junkFood: 'Almost None' },
        { metric: 'Ingredients', nxtkind: '100% Natural & Clinically Tested', homeCooked: 'Natural But Hard To Measure', junkFood: 'Artificial, Unhealthy & Additives' },
        { metric: 'Digestibility', nxtkind: 'Easy To Digest & Light', homeCooked: 'Can Be Heavy On Stomach', junkFood: 'Hard To Digest' },
        { metric: 'Suitability', nxtkind: 'On The Go, Anytime Meal', homeCooked: 'Requires Cooking Skills', junkFood: 'Craving Based Not A Meal' },
        { metric: 'Long Term Health Impact', nxtkind: 'Boosts Energy & Metabolism', homeCooked: 'Depends On Diet', junkFood: 'Leads To Weight Gain & Fatigue' }
    ];

    return (
        <section className="bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative overflow-hidden py-16">
            <div className="flex flex-col container mx-auto px-2 sm:px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 tracking-wide flex items-center justify-center gap-2">
                  <span>Why Choose</span>
                  <span className="inline-flex items-center align-middle px-2">
                    <Image src="/nxt-logo.png" alt="NXTKIND Logo" width={90} height={28} className="h-7 w-auto" />
                  </span>
                  <span>?</span>
                </h2>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
                  <div className="min-w-[700px] hidden sm:block">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 text-center font-semibold text-gray-700 border-b border-gray-200 bg-gray-50">
                      <div className="py-4 text-left pl-6 text-base">Metric</div>
                      <div className="py-4 text-base">
                        Ghar Ka Khana
                        <span className="block text-xs font-normal text-gray-400">(Home Cooked)</span>
                      </div>
                      <div className="py-4 flex justify-center bg-[#414143] rounded-t-4xl items-center">
                        
                          <Image src="/nxt-logo-white.png" alt="NXTKIND Logo" width={70} height={22} className="inline h-6 w-auto align-middle" />
                    
                      </div>
                      <div className="py-4 font-extrabold text-base">Junk Food</div>
                    </div>
                    {/* Table Rows */}
                    {comparisonData.map((item, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-4 items-center border-b last:border-b-0 border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-150`}
                      >
                        <div className="px-6 py-6 text-left text-gray-800 text-sm md:text-base font-bold whitespace-nowrap">
                          {item.metric}
                        </div>
                        <div className="px-6 py-6 text-gray-800 text-center text-sm md:text-base whitespace-nowrap">
                          {item.homeCooked}
                        </div>
                        <div className="px-6 py-6 text-center text-sm md:text-base font-semibold bg-[#414143] text-white shadow-lg border border-gray-500 relative flex flex-col items-center justify-center transition-colors duration-200">
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 size={16} className="text-green-400 mr-1" />
                            {item.nxtkind}
                          </span>
                          <Image src="/nxt-logo.png" alt="NXTKIND Logo" width={60} height={18} className="md:hidden inline h-5 w-auto align-middle mt-2" />
                        </div>
                        <div className="px-6 py-6 text-gray-800 text-center text-sm md:text-base whitespace-nowrap">
                          {item.junkFood}
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-4 text-center font-semibold text-gray-700">
                      <div className="py-4 text-left pl-6 text-base"></div>
                      <div className="py-4 text-base"></div>
                      <div className="py-4 flex justify-center bg-[#414143] rounded-b-4xl items-center"></div>
                      <div className="py-4 font-extrabold text-base"></div>
                    </div>
                  </div>
                  
                  {/* Mobile Version */}
                  <div className="sm:hidden flex flex-col gap-4">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-semibold text-gray-900">{item.metric}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Ghar Ka Khana</span>
                            <span className="text-gray-700 text-sm text-right max-w-[60%]">{item.homeCooked}</span>
                          </div>
                          <div className="flex items-center justify-between bg-[#414143] text-white border border-gray-700 rounded-sm px-2 py-1 mt-1 shadow">
                          <Image src="/nxt-logo-white.png" alt="NXTKIND Logo" width={40} height={12} className="inline md:hidden h-4 w-auto align-middle ml-2" />
                            <span className="text-white text-sm font-medium flex items-center gap-3">
                              <CheckCircle2 size={14} className="text-green-400" />{item.nxtkind}
                            </span>
                            
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Junk Food</span>
                            <span className="text-gray-400 text-sm text-right max-w-[60%]">{item.junkFood}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
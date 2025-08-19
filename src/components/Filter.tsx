"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        
        replace(`${pathname}?${params.toString()}`);
    };

    const handlePriceFilter = () => {
        const params = new URLSearchParams(searchParams);
        
        if (minPrice) {
            params.set("min", minPrice);
        } else {
            params.delete("min");
        }
        
        if (maxPrice) {
            params.set("max", maxPrice);
        } else {
            params.delete("max");
        }
        
        replace(`${pathname}?${params.toString()}`);
    };

    const clearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        replace(pathname);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Price Range:</label>
                        <input
                            type="number"
                            name="min"
                            placeholder="Min ₹"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            name="max"
                            placeholder="Max ₹"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            onClick={handlePriceFilter}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            Apply
                        </button>
                    </div>
                    
                    {(minPrice || maxPrice) && (
                        <button
                            onClick={clearFilters}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
                
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                        name="sort"
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        onChange={handleFilterChange}
                        value={searchParams.get("sort") || ""}
                    >
                        <option value="">Featured</option>
                        <option value="asc price">Price: Low to High</option>
                        <option value="desc price">Price: High to Low</option>
                        <option value="desc lastUpdated">Newest First</option>
                        <option value="asc lastUpdated">Oldest First</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filter;

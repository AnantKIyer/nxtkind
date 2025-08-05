"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClientContext";
import { useState } from "react";

const Add = ({
                 productId,
                 variantId,
                 stockNumber,
             }: {
    productId: string;
    variantId: string;
    stockNumber: number;

}) => {
    const [quantity, setQuantity] = useState(1);

    // // TEMPORARY
    // const stock = 4;

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < stockNumber) {
            setQuantity((prev) => prev + 1);
        }
    };

    const wixClient = useWixClient();

    const { addItem } = useCartStore();

    return (
        <div className="flex w-full flex-col gap-4">
            <h4 className="font-medium">Choose a Quantity</h4>
            <div className="flex w-full items-center justify-center">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-200 py-2 px-4 rounded-xl flex items-center w-full">
                        <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("d")}
                            disabled={quantity===1}
                        >
                            -
                        </button>
                        
                    </div>
                    {quantity}
                    <div className="bg-gray-200 py-2 px-4 rounded-xl flex items-center w-full">
                    <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("i")}
                            disabled={quantity===stockNumber}
                        >
                            +
                        </button>
                    </div>
                    {stockNumber < 1 ? (
                        <div className="text-xs">Product is out of stock</div>

                    ) : ( 
                        <></>
                    )}
                </div>
                
            </div>
            <button
                    onClick={() => addItem(wixClient, productId, variantId, quantity)}
                    className="w-full rounded-xl ring-1 text-[#68D335] font-bold text-xl py-4 px-4 hover:bg-[#68D335] hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
                >
                    Add to Cart
                </button>
        </div>
    );
};

export default Add;

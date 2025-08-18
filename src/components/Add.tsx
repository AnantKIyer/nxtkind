"use client";

import { useState } from "react";
import { useWixClient } from "@/hooks/useWixClientContext";
import { useCartStore } from "@/hooks/useCartStore";
import { useNotification } from "@/context/NotificationContext";

interface AddProps {
    productId: string;
    variantId: string;
    stockNumber: number;
}

const Add = ({ productId, variantId, stockNumber }: AddProps) => {
    const [quantity, setQuantity] = useState(1);
    const { wixClient } = useWixClient();
    const { addItem } = useCartStore();
    const { addNotification } = useNotification();

    const handleAddToCart = async () => {
        if (quantity <= 0) {
            addNotification("Please select a valid quantity", "error");
            return;
        }

        if (quantity > stockNumber) {
            addNotification("Quantity exceeds available stock", "error");
            return;
        }

        try {
            await addItem(wixClient, productId, variantId, quantity);
            addNotification("Product added to cart successfully!");
            setQuantity(1); // Reset quantity after adding
        } catch {
            addNotification("Failed to add product to cart", "error");
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= stockNumber) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Quantity:
                </label>
                <div className="flex items-center border rounded-md">
                    <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={stockNumber}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-none focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= stockNumber}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>
                <span className="text-sm text-gray-500">
                    {stockNumber} available
                </span>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={stockNumber === 0}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {stockNumber === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        </div>
    );
};

export default Add;

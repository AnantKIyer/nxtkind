"use client";

import { useWixClient } from "@/hooks/useWixClientContext";
import { useCartStore } from "@/hooks/useCartStore";
import { useNotification } from "@/context/NotificationContext";

interface ClientAddToCartButtonProps {
  productId: string;
  variantId: string;
  stockNumber: number;
}

const ClientAddToCartButton = ({ productId, variantId, stockNumber }: ClientAddToCartButtonProps) => {
  const { wixClient } = useWixClient();
  const { addItem } = useCartStore();
  const { addNotification } = useNotification();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addItem(wixClient, productId, variantId, 1);
      addNotification("Product added to cart successfully!");
    } catch {
      addNotification("Failed to add product to cart", "error");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={stockNumber === 0}
      className="w-full bg-green-800 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      {stockNumber === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default ClientAddToCartButton;
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
      className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {stockNumber === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default ClientAddToCartButton;
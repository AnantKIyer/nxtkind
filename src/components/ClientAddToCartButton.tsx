"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClientContext";
import { useNotification } from "@/context/NotificationContext";

const ClientAddToCartButton = ({ productId, variantId, stockNumber }: { productId: string, variantId: string, stockNumber: number }) => {
  const wixClient = useWixClient();
  const { addNotification } = useNotification();
  const { addItem } = useCartStore();
  const disabled = stockNumber < 1;

  return (
    <button
      className="rounded-lg w-full ring-2 py-2 px-4 text-md hover:bg-[#475A47] hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none mt-2"
      disabled={disabled}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await addItem(wixClient, productId, variantId, 1);
          addNotification("Product added to cart successfully!");
        } catch {
          addNotification("Failed to add product to cart", "error");
        }
      }}
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default ClientAddToCartButton;
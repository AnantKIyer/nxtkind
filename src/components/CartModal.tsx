"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClientContext";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const router = useRouter();
  const { wixClient } = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      <h2 className="font-semibold text-lg">Cart</h2>
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : cart?.lineItems && cart.lineItems.length > 0 ? (
        <>
          <div className="max-h-64 overflow-y-auto space-y-4">
            {cart.lineItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.image, 60, 60, {})}
                    alt={typeof item.productName === 'string' ? item.productName : item.productName?.original || 'Product'}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">
                    {typeof item.productName === 'string' ? item.productName : item.productName?.original || 'Product'}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Qty: {item.quantity} × ₹{item.price?.amount}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(wixClient, item._id || "")}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                ₹{cart.lineItems.reduce((sum, item) => sum + Number(item.price?.amount ?? 0), 0)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={() => router.push('/cart')}
              className="w-full mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              View Cart
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/list')}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartModal;

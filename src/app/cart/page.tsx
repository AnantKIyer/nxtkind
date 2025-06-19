'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClientContext";
import { currentCart } from "@wix/ecom";

// Type guard for subtotal
function hasSubtotal(cart: unknown): cart is { subtotal: { amount: number } } {
  return (
    typeof cart === 'object' &&
    cart !== null &&
    'subtotal' in cart &&
    typeof (cart as { subtotal?: { amount?: unknown } }).subtotal?.amount === 'number'
  );
}

const CartPage = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, addItem, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout = await wixClient.currentCart.createCheckoutFromCurrentCart({
        channelType: currentCart.ChannelType.WEB,
      });
      const { redirectSession } = await wixClient.redirects.createRedirectSession({
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

  const isEmpty = !cart.lineItems || cart.lineItems.length === 0;

  // Try to use cart.subtotal?.amount, otherwise sum up lineItems
  const subtotal = hasSubtotal(cart)
    ? cart.subtotal.amount
    : (cart?.lineItems?.reduce((sum, item) => sum + Number(item.price?.amount ?? 0), 0) ?? 0);

  // Placeholder logic for tax and shipping
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal > 0 ? 8 : 0; // Example static tax
  const total = Number(subtotal) + Number(shipping) + Number(tax);

  // Add 1 to item quantity
  const handleAdd = (item: currentCart.LineItem) => {
    const productId = item.catalogReference?.catalogItemId || "";
    const variantId = item.catalogReference?.options?.variantId || "";
    if (productId) {
      addItem(
        wixClient,
        productId,
        variantId,
        1 // Always add 1 more
      );
    }
  };

  // Subtract 1 from item quantity or remove if 1
  const handleSubtract = (item: currentCart.LineItem) => {
    const productId = item.catalogReference?.catalogItemId || "";
    const variantId = item.catalogReference?.options?.variantId || "";
    if (productId && item.quantity) {
      if (item.quantity <= 1) {
        removeItem(wixClient, item._id!); // Completely remove from cart
      } else {
        addItem(wixClient, productId, variantId, item.quantity - 1); // Decrease quantity
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex flex-col px-2 md:px-8 py-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-10">
          <Link href="/list" className="text-gray-700 flex items-center mb-4 hover:underline text-base">
            <span className="mr-2 text-2xl">&#8592;</span> Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">READY TO FUEL UP?</h1>
          <p className="text-lg text-gray-600">You&apos;re one step closer to better sips and stronger days.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-0 md:p-6">
              {isEmpty ? (
                <div className="text-center text-gray-500 py-16">
                  <p className="text-lg mb-4">Your cart is empty.</p>
                  <Link href="/list" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors">Browse Products</Link>
                </div>
              ) : (
                <div>
                  {cart?.lineItems?.map((item, idx) => (
                    <div key={item._id} className={`flex items-center py-8 px-4 md:px-0 ${idx !== (cart.lineItems?.length ?? 0) - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="w-24 h-28 flex-shrink-0 relative">
                        {item.image && (
                          <Image
                            src={wixMedia.getScaledToFillImageUrl(item.image, 96, 112, {})}
                            alt={item.productName?.original || "Product image"}
                            fill
                            className="object-contain rounded-md"
                          />
                        )}
                      </div>
                      <div className="flex-1 ml-6">
                        <div className="font-bold text-lg md:text-xl text-gray-900 mb-1 uppercase tracking-wide">{item.productName?.original}</div>
                        <div className="text-gray-500 text-sm mb-2">{'UNFLAVOURED'}</div>
                        <div className="text-gray-400 text-xs mb-2">1kg / x{item.quantity ?? 1}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100"
                            disabled={isLoading || (item.quantity ?? 1) <= 1}
                            onClick={() => handleSubtract(item)}
                          >-</button>
                          <span className="text-lg font-medium w-6 text-center">{item.quantity ?? 1}</span>
                          <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100"
                            disabled={isLoading}
                            onClick={() => handleAdd(item)}
                          >+</button>
                        </div>
                      </div>
                      <div className="ml-auto text-lg font-semibold text-gray-900">₹{item.price?.amount}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Cart Total */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit flex flex-col">
            <h2 className="text-xl font-bold mb-6 tracking-wide">CART TOTAL</h2>
            <div className="flex justify-between text-gray-600 mb-3 text-sm">
              <span>Shipping (3-5 Business Day)</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-3 text-sm">
              <span>Tax (Estimated For India)</span>
              <span className="font-medium">₹{tax}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-3 text-sm">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-900 text-lg font-bold border-t border-gray-200 pt-4 mt-4 mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors disabled:cursor-not-allowed disabled:opacity-75 mb-4"
              disabled={isLoading || isEmpty}
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
            <Link href="/list" className="flex items-center justify-center text-gray-700 hover:underline text-base">
              <span className="mr-2 text-2xl">&#8592;</span> CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

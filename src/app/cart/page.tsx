"use client";

import { useWixClient } from "@/hooks/useWixClientContext";
import { useCartStore } from "@/hooks/useCartStore";
import { currentCart } from "@wix/ecom";
import { media as wixMedia } from "@wix/sdk";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function hasSubtotal(cart: unknown): cart is { subtotal: { amount: number } } {
  return (
    cart !== null &&
    typeof cart === 'object' &&
    'subtotal' in cart &&
    cart.subtotal !== null &&
    typeof cart.subtotal === 'object' &&
    'amount' in cart.subtotal &&
    typeof cart.subtotal.amount === 'number'
  );
}

const CartPage = () => {
  const { wixClient } = useWixClient();
  const { cart, isLoading, addItem, removeItem } = useCartStore();
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = async () => {
    setCheckoutError("");
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
      setCheckoutError("Checkout failed. Please try again.");
      console.log(err);
    }
  };

  const isEmpty = !cart?.lineItems || cart.lineItems.length === 0;

  // Calculate subtotal with proper decimal formatting
  const subtotal = hasSubtotal(cart)
    ? Number(cart.subtotal.amount.toFixed(2))
    : Number((cart?.lineItems?.reduce((sum, item) => sum + (Number(item.price?.amount ?? 0) * (item.quantity ?? 1)), 0) ?? 0).toFixed(2));

  // Placeholder logic for tax and shipping
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal > 0 ? Number((subtotal * 0.08).toFixed(2)) : 0; // 8% tax
  const total = Number((subtotal + shipping + tax).toFixed(2));

  // Add 1 to item quantity
  const handleAdd = async (item: currentCart.LineItem) => {
    const productId = item.catalogReference?.catalogItemId || "";
    const variantId = item.catalogReference?.options?.variantId || "";
    if (productId) {
      const newQty = (item.quantity ?? 1) + 1;
      await addItem(wixClient, productId, variantId, newQty);
    }
  };

  // Subtract 1 from item quantity or remove if 1
  const handleSubtract = async (item: currentCart.LineItem) => {
    const productId = item.catalogReference?.catalogItemId || "";
    const variantId = item.catalogReference?.options?.variantId || "";
    if (productId) {
      const currentQty = item.quantity ?? 1;
      if (currentQty <= 1) {
        await removeItem(wixClient, item._id || "");
      } else {
        await addItem(wixClient, productId, variantId, currentQty - 1);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your cart...</div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some amazing products to get started on your wellness journey!</p>
          <Link 
            href="/list" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Items ({cart?.lineItems?.length || 0})</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cart?.lineItems?.map((item) => (
                  <div key={item._id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        {item.image ? (
                          <Image
                            src={wixMedia.getScaledToFillImageUrl(item.image, 80, 80, {})}
                            alt={typeof item.productName === 'string' ? item.productName : item.productName?.original || 'Product'}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {typeof item.productName === 'string' 
                            ? item.productName 
                            : item.productName?.original || 'Product'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          Premium quality • Natural ingredients
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleSubtract(item)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-900"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleAdd(item)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-900"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{Number(item.price?.amount || 0).toFixed(2)}
                            </span>
                            <button
                              onClick={async () => await removeItem(wixClient, item._id || "")}
                              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Proceed to Checkout
                </button>
                
                {checkoutError && (
                  <p className="text-red-500 text-sm text-center mt-2">{checkoutError}</p>
                )}
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Secure checkout powered by Wix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

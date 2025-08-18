"use client";

import { useWixClient } from "@/hooks/useWixClientContext";
import { useCartStore } from "@/hooks/useCartStore";
import { currentCart } from "@wix/ecom";
import { useState } from "react";

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
      const newQty = (item.quantity ?? 1) + 1;
      addItem(wixClient, productId, variantId, newQty);
    }
  };

  // Subtract 1 from item quantity or remove if 1
  const handleSubtract = (item: currentCart.LineItem) => {
    const productId = item.catalogReference?.catalogItemId || "";
    const variantId = item.catalogReference?.options?.variantId || "";
    if (productId) {
      const currentQty = item.quantity ?? 1;
      if (currentQty <= 1) {
        removeItem(wixClient, item._id || "");
      } else {
        addItem(wixClient, productId, variantId, currentQty - 1);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-600">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            <div className="space-y-4">
              {cart?.lineItems?.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {typeof item.productName === 'string' 
                        ? item.productName 
                        : item.productName?.original || 'Product'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price?.amount} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSubtract(item)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(wixClient, item._id || "")}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{tax}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            {checkoutError && (
              <p className="text-red-500 text-sm mt-2">{checkoutError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

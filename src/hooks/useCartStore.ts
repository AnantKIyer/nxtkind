import { create } from "zustand";
import { WixClient } from "@/context/WixContext";
import { currentCart } from "@wix/ecom";

type CartState = {
    cart: currentCart.Cart | null;
    isLoading: boolean;
    counter: number;
    getCart: (wixClient: WixClient) => void;
    addItem: (wixClient: WixClient, productId: string, variantId: string, quantity: number) => void;
    removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    isLoading: true,
    counter: 0,
    getCart: async (wixClient) => {
        try {
            // Check if user is logged in before trying to get cart
            const isLoggedIn = wixClient.auth.loggedIn();
            if (!isLoggedIn) {
                set({
                    cart: null,
                    isLoading: false,
                    counter: 0,
                });
                return;
            }
            
            const cart = await wixClient.currentCart.getCurrentCart();
            set({
                cart: cart || null,
                isLoading: false,
                counter: cart?.lineItems?.length ?? 0,
            });
        } catch (err) {
            // Handle cart not found error gracefully
            if (err && typeof err === 'object' && 'message' in err) {
                const errorMessage = (err as { message: string }).message;
                if (errorMessage.includes('OWNED_CART_NOT_FOUND') || errorMessage.includes('Cannot find cart by ownership')) {
                    // User is not logged in or cart doesn't exist, set empty cart
                    set({
                        cart: null,
                        isLoading: false,
                        counter: 0,
                    });
                    return;
                }
            }
            set((prev) => ({ ...prev, isLoading: false }));
            console.log('Error ==>', err)
        }
    },
    addItem: async (wixClient, productId, variantId, quantity) => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const response = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
                            catalogItemId: productId,
                            ...(variantId && { options: { variantId } }),
                        },
                        quantity: quantity,
                    },
                ],
            });
            set((state) => ({
                ...state,
                cart: response.cart,
                counter: response.cart?.lineItems?.length ?? 0,
                isLoading: false,
            }));
        } catch (error) {
            console.error('Error adding item to cart:', error);
            set((state) => ({ ...state, isLoading: false }));
        }
    },
    removeItem: async (wixClient, itemId) => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
            set((state) => ({
                ...state,
                cart: response.cart,
                counter: response.cart?.lineItems?.length ?? 0,
                isLoading: false,
            }));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            set((state) => ({ ...state, isLoading: false }));
        }
    }
}));

"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { members } from "@wix/members";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { redirects } from '@wix/redirects';

// Helper function to safely parse refresh token
const getRefreshToken = () => {
  try {
    const token = Cookies.get("refreshToken");
    return token ? JSON.parse(token) : {};
  } catch {
    return {};
  }
};

if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
    console.error("WIX_CLIENT_ID is not defined in environment variables");
}

const wixClient = createClient({
    modules: {
        products,
        collections,
        currentCart,
        redirects,
        members
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
        tokens: {
            refreshToken: getRefreshToken(),
            accessToken: { value: "", expiresAt: 0 },
        },
    }),
});

export type WixClient = typeof wixClient;

interface User {
  _id?: string;
  contactId?: string;
  loginEmail?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    phones?: string[];
  };
  profile?: {
    nickname?: string;
    picture?: string;
  };
  privacyStatus?: string;
  status?: string;
}

interface AuthContextType {
  wixClient: WixClient;
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, profile: { firstName: string; lastName: string }) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthState: () => void;
}

export const WixClientContext = createContext<AuthContextType | null>(null);

export const WixClientContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    // Check auth state
    const checkAuthState = useCallback(async () => {
        try {
            const loggedIn = wixClient.auth.loggedIn();
            setIsLoggedIn(loggedIn);
            
            if (loggedIn) {
                // Try to get user info
                try {
                    const currentMember = await wixClient.members.getCurrentMember();
                    setUser(currentMember.member as User);
                } catch (error) {
                    console.warn("Could not fetch user info:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking auth state:", error);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Refresh auth state
    const refreshAuthState = useCallback(() => {
        checkAuthState();
    }, [checkAuthState]);

    // Login function
    const login = useCallback(async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await wixClient.auth.login({ email, password });
            
            if (response?.loginState === 'SUCCESS') {
                // Persist tokens
                try {
                    const tokens = await (wixClient as unknown as { auth: { getTokens?: () => Promise<{ refreshToken?: unknown }> } }).auth.getTokens?.();
                    if (tokens?.refreshToken) {
                        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { 
                            expires: 30, 
                            path: "/",
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax'
                        });
                    }
                } catch (tokenError) {
                    console.warn("Could not persist tokens:", tokenError);
                }
                
                await checkAuthState();
                return { success: true };
            } else {
                const errorMessage = (response as { errorCode?: string })?.errorCode === 'invalidEmail' || (response as { errorCode?: string })?.errorCode === 'invalidPassword' 
                    ? 'Invalid email or password' 
                    : 'Login failed';
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: 'Login failed' };
        } finally {
            setIsLoading(false);
        }
    }, [checkAuthState]);

    // Register function
    const register = useCallback(async (email: string, password: string, profile: { firstName: string; lastName: string }) => {
        try {
            setIsLoading(true);
            const response = await wixClient.auth.register({
                email,
                password,
                profile
            });
            
            if (response?.loginState === 'SUCCESS') {
                // Persist tokens
                try {
                    const tokens = await (wixClient as unknown as { auth: { getTokens?: () => Promise<{ refreshToken?: unknown }> } }).auth.getTokens?.();
                    if (tokens?.refreshToken) {
                        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { 
                            expires: 30, 
                            path: "/",
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax'
                        });
                    }
                } catch (tokenError) {
                    console.warn("Could not persist tokens:", tokenError);
                }
                
                await checkAuthState();
                return { success: true };
            } else {
                const errorMessage = (response as { errorCode?: string })?.errorCode === 'emailAlreadyExists' 
                    ? 'Email already exists' 
                    : 'Registration failed';
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, error: 'Registration failed' };
        } finally {
            setIsLoading(false);
        }
    }, [checkAuthState]);

    // Google OAuth login
    const loginWithGoogle = useCallback(async () => {
        try {
            setIsLoading(true);
            
            // Create a direct OAuth URL for Wix authentication
            const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
            const redirectUri = encodeURIComponent(window.location.origin);
            const state = btoa(`google_${Date.now()}`);
            
            // Use Wix's member area OAuth endpoint
            const oauthUrl = `https://manage.wix.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=offline_access&state=${state}`;
            
            window.location.href = oauthUrl;
        } catch (error) {
            console.error("Google OAuth error:", error);
            setIsLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            Cookies.remove("refreshToken", { path: "/" });
            await wixClient.auth.logout(window.location.origin);
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            // Force logout even if API call fails
            Cookies.remove("refreshToken", { path: "/" });
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial auth check
    useEffect(() => {
        checkAuthState();
    }, [checkAuthState]);

    // Listen for storage changes (for cross-tab auth sync)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'refreshToken' || e.key === null) {
                checkAuthState();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [checkAuthState]);

    // Handle OAuth callback
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
            console.error("OAuth error:", error);
            setIsLoading(false);
            return;
        }

        if (code) {
            const handleOAuthCallback = async () => {
                try {
                    setIsLoading(true);
                    
                    // Just refresh auth state as Wix should handle the rest
                    await checkAuthState();
                    
                    // Clean up URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                } catch (error) {
                    console.error("OAuth callback error:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            handleOAuthCallback();
        }
    }, [checkAuthState]);

    const contextValue: AuthContextType = {
        wixClient,
        isLoggedIn,
        isLoading,
        user,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshAuthState
    };

    return (
        <WixClientContext.Provider value={contextValue}>
            {children}
        </WixClientContext.Provider>
    );
};

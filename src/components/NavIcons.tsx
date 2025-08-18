"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useWixClient } from "@/hooks/useWixClientContext";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const { wixClient, isLoggedIn, logout, user } = useWixClient();

    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            router.push("/profile");
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        if (!isProfileOpen) return;
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [isProfileOpen]);

    // Close dropdown on navigation
    useEffect(() => {
        setIsProfileOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            setIsProfileOpen(false);
            router.push('/');
        } catch (error) {
            console.error("Logout error:", error);
            setIsLoading(false);
            setIsProfileOpen(false);
            // Fallback logout - just redirect to home
            router.push('/');
        }
    };

    const { counter, getCart } = useCartStore();

    useEffect(() => {
        // Only try to get cart if user is logged in
        if (isLoggedIn) {
            getCart(wixClient);
        }
    }, [wixClient, getCart, isLoggedIn]);

    // Get profile image source
    const getProfileImageSrc = () => {
        if (user?.profile?.picture) {
            return user.profile.picture;
        }
        return isLoggedIn ? "/woman.png" : "/profile.png";
    };

    // Get user display name
    const getUserDisplayName = () => {
        if (user?.contact?.firstName && user?.contact?.lastName) {
            return `${user.contact.firstName} ${user.contact.lastName}`;
        }
        if (user?.contact?.firstName) {
            return user.contact.firstName;
        }
        if (user?.loginEmail) {
            return user.loginEmail.split('@')[0];
        }
        return "User";
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <div className="relative">
                <Image
                    src={getProfileImageSrc()}
                    alt="Profile"
                    width={22}
                    height={22}
                    className="cursor-pointer rounded-full object-cover"
                    onClick={handleProfile}
                />
                {isLoggedIn && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>
            
            {isProfileOpen && isLoggedIn && (
                <div ref={dropdownRef} className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 min-w-[200px] flex flex-col">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                        <Image
                            src={getProfileImageSrc()}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium text-gray-900">{getUserDisplayName()}</p>
                            <p className="text-xs text-gray-500">{user?.loginEmail}</p>
                        </div>
                    </div>
                    <Link href="/profile" className="hover:text-green-600 py-1">Profile</Link>
                    <button
                        className="mt-2 text-left hover:text-red-600 py-1"
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            )}
            
            <div
                className="relative cursor-pointer"
                onClick={() => router.push('/cart')}
            >
                <Image src="/cart.png" alt="" width={22} height={22} />
                {counter > 0 && (
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#68D335] rounded-full text-white text-sm flex items-center justify-center">
                        {counter}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavIcons;
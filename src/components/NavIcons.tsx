"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClientContext";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const wixClient = useWixClient();
    const isLoggedIn = wixClient.auth.loggedIn();

    // TEMPORARY
    // const isLoggedIn = false;

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            setIsProfileOpen((prev) => !prev);
        }
    };

    // AUTH WITH WIX-MANAGED AUTH

    // const login = async () => {
    //     try {
    //         if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
    //             console.error("WIX_CLIENT_ID is not defined");
    //             return;
    //         }

    //         const loginRequestData = wixClient.auth.generateOAuthData(
    //             window.location.origin
    //         );
            
    //         console.log("Login request data:", loginRequestData);
    //         console.log(isLoggedIn)
         
    //         localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
    //         const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
            
    //         if (!authUrl) {
    //             console.error("No auth URL generated");
    //             return;
    //         }
            
    //         window.location.href = authUrl;
    //         isLoggedIn = true;
    //         setIsProfileOpen(true)
    //     } catch (error) {
    //         console.error("Login error:", error);
    //     }
    // };

    const handleLogout = async () => {
        setIsLoading(true);
        Cookies.remove("refreshToken");
        const { logoutUrl } = await wixClient.auth.logout(window.location.href);
        setIsLoading(false);
        setIsProfileOpen(false);
        router.push(logoutUrl);
        router.push('/');
    };


    const { counter, getCart } = useCartStore();

    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image
                src="/profile.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
                // onClick={login}
                onClick={handleProfile}
            />
            {isProfileOpen && (
                <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
                    <Link href="/profile">Profile</Link>
                    <div className="mt-2 cursor-pointer" onClick={handleLogout}>
                        {isLoading ? "Logging out" : "Logout"}
                    </div>
                </div>
            )}
            <Image
                src="/notification.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
            />
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

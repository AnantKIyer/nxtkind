'use client';
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from 'next/navigation';
import CartModal from "@/components/CartModal";

export default function NavIcons() {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const router = useRouter();

    //TODO: Implement authentication here
    const isLoggedIn = true;

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        }
        setIsProfileOpen((prev) => !prev);
    }

    return (

        // PROFILE
        <div className='flex items-center gap-4 xl:gap-6 relative'>
            <Image src='/profile.png' alt='profile' width={22} height={22} className='cursor-pointer'
                   onClick={handleProfile}/> {
            isProfileOpen && (
                <div className='absolute p-4 rounded-md top-12 left-0 text-sm shadow-box z-20'>
                    <Link href='/profile'>Profile</Link>
                    <div className='mt-2 cursor-pointer'>Logout</div>
                </div>
            )
        }
            {/*NOTIFICATIONS*/}
            <Image src='/notification.png' alt='notification' width={22} height={22}/>

            {/*CART*/}
            <div className='relative cursor-pointer' onClick={() => setIsCartOpen((prev) => !prev)}>

                <Image src='/cart.png' alt='cart' width={22} height={22}/>
                <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#68D335] rounded-full text-white text-sm flex items-center justify-center'>2
                </div>
            </div>
            {isCartOpen && <CartModal/>}
        </div>
    )
}
'use client';

import {useState, ReactNode} from "react";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
    label: string;
    href: string;
    icon?: ReactNode;
}

interface MenuProps {
    menuItems: MenuItem[];
}

export default function Menu({ menuItems }: MenuProps) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <Image src='/menu.png' alt='Menu' width={28} height={28} className='cursor-pointer'
                onClick={() => {setOpen((prev) => !prev)}}
            />{
            open && (
                <div className='absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10'>
                    {menuItems.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={() => setOpen(false)}>{item.icon}{item.label}</Link>
                    ))}
                </div>
            )
        }
        </div>
    )
}
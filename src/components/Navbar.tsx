import Link from "next/link";
import Menu from "@/components/Menu";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import NavIcons from "@/components/NavIcons";


const menuItems = [
    {label: 'Shop', href: '/list'},
    {label: 'Science', href: '/'},
    {label: 'About', href: '/about'},
    {label: 'Blog', href: '/'},

]

export default function Navbar() {
    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 sticky bg-transparent top-0 backdrop-blur-sm z-20'>
                {/*MOBILE*/}
            <div className='h-20 flex items-center justify-between md:hidden'>
                <Link href='/' className='flex items-center'>
                    <Image src='/nxt-logo-bw.png' alt='Logo' width={100} height={100} />
                </Link>
                <Menu menuItems={menuItems} />
            </div>
            {/*BIGGER SCREENS*/}
            <div className='hidden md:flex items-center h-full justify-between gap-8'>
                {/*LEFT*/}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link href='/' className='flex items-center'>
                        <Image src='/nxt-logo-bw.png' alt='Logo' height={100} width={100}/>
                    </Link>
                    <div className='hidden xl:flex gap-10 text-lg font-medium  items-baseline'>
                        {menuItems.map((item) => (
                            <Link key={item.label} href={item.href}>{item.label}</Link>
                        ))}
                        
                        {/* <Link href='/list'>Shop</Link>
                        <Link href='/science'>Science</Link>
                        <Link href='/about'>About</Link>
                        <Link href='/blog'>Blog</Link> */}
                    </div>

                </div>
                {/*RIGHT*/}
                <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
                    <SearchBar/>
                    <NavIcons/>
                </div>
            </div>
        </div>
    )
}
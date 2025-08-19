import Link from "next/link";
import Menu from "@/components/Menu";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import NavIcons from "@/components/NavIcons";

const menuItems = [
    {label: 'Shop', href: '/list'},
    {label: 'Science', href: '/science'},
    {label: 'About', href: '/about'},
    {label: 'Blog', href: '/blogs'},
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Mobile Menu */}
                    <div className="flex items-center lg:hidden">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src="/nxt-logo.png" 
                                alt="NXTKIND" 
                                width={120} 
                                height={40} 
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center justify-between w-full">
                        {/* Left Section - Logo and Navigation */}
                        <div className="flex items-center space-x-12">
                            {/* Logo */}
                            <Link href="/" className="flex items-center">
                                <Image 
                                    src="/nxt-logo.png" 
                                    alt="NXTKIND" 
                                    width={140} 
                                    height={45} 
                                    className="h-10 w-auto"
                                />
                            </Link>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-8">
                                {menuItems.map((item) => (
                                    <Link 
                                        key={item.label} 
                                        href={item.href}
                                        className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
                                    >
                                        {item.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Section - Search and Icons */}
                        <div className="flex items-center space-x-6">
                            {/* Search Bar */}
                            <div className="hidden xl:block">
                                <SearchBar />
                            </div>

                            {/* Navigation Icons */}
                            <NavIcons />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Menu menuItems={menuItems} />
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="lg:hidden pb-4">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
}
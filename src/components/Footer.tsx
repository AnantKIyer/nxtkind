import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="h-[40vh] bg-white px-6 md:px-12 py-8 overflow-y-clip">
            {/* Tagline */}
            <div className="text-[1.4rem] md:text-2xl text-gray-800 mb-4">
                NOURISHING YOUR BODY, SUSTAINING THE PLANET.
            </div>

            {/* Divider */}
            <div className="w-full pr-24 h-px bg-gray-300 mb-8"></div>

            <div className="flex flex-col">
                {/* Footer Columns */}
                <div className="w-full md:w-8/12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
                    {/* Quick Navigation */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Quick Navigation</h4>
                        <ul className="space-y-1">
                            <li>Home</li>
                            <li>Shop / Flavors</li>
                            <li>Recipes</li>
                            <li>About Us</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Customer Support</h4>
                        <ul className="space-y-1">
                            <li>FAQ</li>
                            <li>Shipping & Returns</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Contact Details</h4>
                        <p className="mb-1">support@nxtkind.com</p>
                        <p className="mb-3">+91 1234 567 890</p>
                        <div className="flex space-x-4 text-xl text-gray-700">
                            <FaInstagram />
                            <FaFacebookF />
                        </div>
                    </div>
                </div>

                {/* Centered Logo */}
                <div className="mt-6 flex justify-center">
                    <Image src='/nxt-logo.png' height={500} width={500} className=''  alt='Nxtkind Logo'/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
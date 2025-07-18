'use client';


import { motion } from "framer-motion";
import Image from "next/image";



const icons = [
    { src: '/iso-icon.png', alt: 'ISO Certified' },
    { src: '/no-flavour.png', alt: 'No Artificial Flavours' },
    { src: '/gluten-free.png', alt: 'Gluten Free' },
    { src: '/natural.png', alt: '100% Natural' },
    { src: '/gmo-free.png', alt: 'Non-GMO' },
    { src: '/no-color.png', alt: 'No Artificial Colors' },
];

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div className="flex gap-14 flex-none" 
          initial={{ x: 0 }}
          animate={{
            x: '-50%',
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          >
            {icons.map((icon, index) => (
    <div key={index} className="flex flex-col items-center">
        <Image src={icon.src} alt={icon.alt} width={40} height={40} className="w-10 h-10" />
        <p className="text-xs mt-2">{icon.alt}</p>
    </div>
))}
            {icons.map((icon, index) => (
    <div key={`duplicate-${index}`} className="flex flex-col items-center">
        <Image src={icon.src} alt={icon.alt} width={40} height={40} className="w-10 h-10" />
        <p className="text-xs mt-2">{icon.alt}</p>
    </div>
))}
{icons.map((icon, index) => (
    <div key={`duplicate-${index}`} className="flex flex-col items-center">
        <Image src={icon.src} alt={icon.alt} width={40} height={40} className="w-10 h-10" />
        <p className="text-xs mt-2">{icon.alt}</p>
    </div>
))}

          </motion.div>
        </div>
      </div>
    </div>
  );
};
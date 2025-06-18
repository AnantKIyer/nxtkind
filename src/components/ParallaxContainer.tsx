'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Background parallax layer */}
            <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                    willChange: 'transform'
                }}
            />
            
            {/* Floating elements for enhanced parallax effect */}
            <div 
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-sm pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.05}px)`,
                    willChange: 'transform'
                }}
            />
            <div 
                className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-sm pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.15}px) translateX(${-scrollY * 0.03}px)`,
                    willChange: 'transform'
                }}
            />
            <div 
                className="absolute top-80 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-sm pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.25}px) translateX(${scrollY * 0.08}px)`,
                    willChange: 'transform'
                }}
            />
            
            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
} 
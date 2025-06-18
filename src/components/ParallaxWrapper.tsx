'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxWrapperProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export default function ParallaxWrapper({ children, speed = 0.5, className = '' }: ParallaxWrapperProps) {
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -speed;
                setOffset(rate);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            <div 
                style={{ 
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                {children}
            </div>
        </div>
    );
} 
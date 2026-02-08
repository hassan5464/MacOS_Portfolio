import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const DockItem = ({ app, onClick }) => {
    const iconRef = useRef(null);

    const handleHover = () => {
        // Simple bounce/scale effect
        gsap.to(iconRef.current, { scale: 1.2, duration: 0.2, ease: "power2.out" });
    };

    const handleLeave = () => {
        gsap.to(iconRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const handleClick = () => {
        // Bounce effect on click
        gsap.to(iconRef.current, { y: -10, duration: 0.1, yoyo: true, repeat: 1 });
        console.log(`Opening ${app.name}`);
        if (onClick) onClick();
    };

    return (
        <div
            className="flex flex-col items-center gap-1 group relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
        >
            <div
                ref={iconRef}
                className="w-12 h-12 bg-gray-100/80 rounded-xl flex items-center justify-center shadow-lg cursor-pointer border border-white/30 backdrop-blur-sm"
            >
                {app.icon}
            </div>
            {/* Tooltip */}
            <span className="absolute -top-10 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md pointer-events-none whitespace-nowrap">
                {app.name}
            </span>
            {/* Active Indicator Dot */}
            <div className="w-1 h-1 bg-black/50 rounded-full mt-1 opacity-0" />
        </div>
    );
};

export default DockItem;

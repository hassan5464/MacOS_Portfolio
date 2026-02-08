import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Sliders } from 'lucide-react';
import dayjs from 'dayjs';

const TopBar = () => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 h-8 bg-white/20 backdrop-blur-md shadow-sm z-50 flex items-center justify-between px-4 text-white text-sm font-medium select-none">
            {/* Left Side: Apple Logo & Menus */}
            <div className="flex items-center gap-4">
                <Apple size={18} className="fill-current text-white hover:opacity-80 cursor-pointer" />
                <span className="font-bold tracking-wide">MacFolio</span>
                <nav className="hidden sm:flex gap-4 opacity-90">
                    <span className="hover:opacity-100 cursor-pointer">File</span>
                    <span className="hover:opacity-100 cursor-pointer">Edit</span>
                    <span className="hover:opacity-100 cursor-pointer">View</span>
                    <span className="hover:opacity-100 cursor-pointer">Go</span>
                    <span className="hover:opacity-100 cursor-pointer">Window</span>
                    <span className="hover:opacity-100 cursor-pointer">Help</span>
                </nav>
            </div>

            {/* Right Side: Status Icons & Clock */}
            <div className="flex items-center gap-3 opacity-90">
                <div className="hidden sm:flex items-center gap-3">
                    <Battery size={18} className="rotate-90" />
                    <Wifi size={16} />
                    <Search size={16} />
                </div>
                <div className="flex items-center gap-2">
                    <span>{time.format('ddd MMM D')}</span>
                    <span>{time.format('h:mm A')}</span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;

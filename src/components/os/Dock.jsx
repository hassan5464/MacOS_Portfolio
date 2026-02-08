import React from 'react';
import DockItem from './DockItem';
// import { Folder, Image, Mail, User, Terminal } from 'lucide-react'; 

const Dock = ({ onOpenApp }) => {
    // Apps with custom icons from public/images
    const apps = [
        {
            id: 'finder',
            name: 'Finder',
            icon: <img src="/images/finder.png" alt="Finder" className="w-full h-full object-contain" />
        },
        {
            id: 'photoshop',
            name: 'Gallery',
            icon: <img src="/images/photos.png" alt="Gallery" className="w-full h-full object-contain" />
        },
        {
            id: 'about',
            name: 'About',
            icon: <img src="/icons/user.svg" alt="About" className="w-8 h-8 object-contain opacity-80" />
        },
        {
            id: 'contact',
            name: 'Contact',
            icon: <img src="/images/contact.png" alt="Contact" className="w-full h-full object-contain" />
        },
        {
            id: 'terminal',
            name: 'Terminal',
            icon: <img src="/images/terminal.png" alt="Terminal" className="w-full h-full object-contain" />
        },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            {/* Dock Background - iOS/MacOS Glassmorphism style */}
            <div className="flex items-end gap-2 px-4 py-3 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl transition-all hover:scale-105 duration-300 ease-out">
                {apps.map((app) => (
                    <DockItem key={app.id} app={app} onClick={() => onOpenApp(app.id)} />
                ))}
            </div>
        </div>
    );
};

export default Dock;

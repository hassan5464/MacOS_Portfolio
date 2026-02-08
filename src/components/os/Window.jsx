import React, { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { Rnd } from 'react-rnd';

const Window = ({ id, title, children, onClose, onMinimize, isActive, onFocus, initialPosition = { x: 100, y: 100 }, initialSize = { width: 600, height: 400 }, style }) => {

    return (
        <Rnd
            default={{
                x: initialPosition.x,
                y: initialPosition.y,
                width: initialSize.width,
                height: initialSize.height,
            }}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            onDragStart={() => onFocus(id)}
            onResizeStart={() => onFocus(id)}
            className={`${isActive ? 'z-50' : 'z-10'}`}
            style={{ ...style, position: 'absolute' }} // Ensure zIndex from style prop is respected if needed, though className handles basic stacking
            dragHandleClassName="window-header"
        >
            <div
                className="flex flex-col w-full h-full bg-[#f5f5f5] rounded-xl shadow-2xl overflow-hidden border border-black/10 transition-shadow duration-200"
                onClick={() => onFocus(id)}
            >
                {/* Window Header / Titlebar */}
                <div
                    className="window-header h-10 bg-[#ebebeb] flex items-center justify-between px-4 border-b border-[#dcdcdc] select-none cursor-default"
                >
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2 group">
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(id); }}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:bg-[#ff5f57]/80 cursor-pointer"
                        >
                            <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                            className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center hover:bg-[#febc2e]/80 cursor-pointer"
                        >
                            <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center hover:bg-[#28c840]/80 cursor-pointer"
                        >
                            <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                    </div>

                    {/* Title */}
                    <span className="text-sm font-semibold text-gray-700">{title}</span>

                    {/* Empty right side needed for flex centering if we wanted exact center, but between is fine */}
                    <div className="w-14" />
                </div>

                {/* Content Content */}
                <div className="flex-1 overflow-auto p-4 bg-white/50 relative cursor-auto">
                    {children}
                </div>
            </div>
        </Rnd>
    );
};

export default Window;

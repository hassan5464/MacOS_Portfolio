import React from 'react';
import TextPressure from '../TextPressure';

const Desktop = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("/images/wallpaper.png")' }}>
      {/* Overlay for potential tinting/effects */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Text Pressure Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-center opacity-80 pointer-events-auto"> {/* Allow interactions with text if needed, or keep none */}
          <p className='text-white text-2xl font-light mb-4 font-georama tracking-wide'>
            hey, I'm Ahmed! Welcome to my
          </p>
          <div className="hidden md:block">
            <TextPressure
              text="Portfolio"
              className="text-8xl md:text-9xl text-white font-georama font-bold italic"
              minWeight={700} // BOLD base
              maxWeight={900}
              maxDist={800}
              italic={true}
            />
          </div>
          {/* Mobile Fallback */}
          <h1 className='text-6xl text-white font-bold md:hidden font-georama'>
            Portfolio
          </h1>
        </div>
      </div>

      {/* Desktop Content (Windows, Icons) */}
      <div className="relative z-10 w-full h-full p-2">
        {children}
      </div>
    </div>
  );
};

export default Desktop;

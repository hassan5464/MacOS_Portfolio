import React from 'react';
import Desktop from './components/os/Desktop';
import Navbar from './components/Navbar';
import Dock from './components/os/Dock';


import Window from './components/os/Window';
import AboutApp from './apps/AboutApp';
import ContactApp from './apps/ContactApp';
import FinderApp from './apps/FinderApp';
import GalleryApp from './apps/GalleryApp';
import { useState } from 'react'

import { WindowProvider, useWindowContext } from './context/WindowContext';

function AppContent() {
  const { windows, openApp, closeWindow, minimizeWindow, focusWindow, activeWindowId } = useWindowContext();

  return (
    <main className="w-screen h-screen overflow-hidden text-neutral-800">
      <Navbar />
      <Desktop>
        {windows.map((w) => (
          !w.isMinimized && (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              isActive={activeWindowId === w.id}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              initialPosition={w.position}
              style={{ zIndex: w.zIndex }}
            >
              {w.component}
            </Window>
          )
        ))}
      </Desktop>
      <Dock onOpenApp={openApp} />
    </main>
  );
}

function App() {
  return (
    <WindowProvider>
      <AppContent />
    </WindowProvider>
  );
}

export default App;

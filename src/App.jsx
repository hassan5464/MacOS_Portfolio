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

function App() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const apps = {
    about: <AboutApp />,
    contact: <ContactApp />,
    finder: <FinderApp />,
    photoshop: <GalleryApp />,
    terminal: <div className="p-4 font-mono text-sm">Welcome to MacFolio Terminal<br />$ _</div>
  };

  const openApp = (appId) => {
    if (windows.find((w) => w.id === appId)) {
      focusWindow(appId);
      return;
    }

    const newWindow = {
      id: appId,
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      component: apps[appId] || <div>App not found</div>,
      isOpen: true,
      isMinimized: false,
      zIndex: zIndexCounter + 1,
      // Random-ish position for new windows
      position: { x: 100 + (windows.length * 20), y: 100 + (windows.length * 20) }
    };

    setWindows([...windows, newWindow]);
    setZIndexCounter(zIndexCounter + 1);
    setActiveWindowId(appId);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const focusWindow = (id) => {
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w
      )
    );
    setZIndexCounter(zIndexCounter + 1);
    setActiveWindowId(id);
  };

  const minimizeWindow = (id) => {
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      )
    );
  };

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

export default App;

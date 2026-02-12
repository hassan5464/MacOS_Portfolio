import { createContext, useContext, useState, useCallback, useMemo } from "react";
import AboutApp from "../apps/AboutApp";
import ContactApp from "../apps/ContactApp";
import FinderApp from "../apps/FinderApp";
import GalleryApp from "../apps/GalleryApp";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(10);

    // We need to verify these imports work or if they cause circular deps or issues.
    // Assuming they are fine.

    const apps = useMemo(() => ({
        about: <AboutApp />,
        contact: <ContactApp />,
        finder: <FinderApp />,
        photoshop: <GalleryApp />,
        terminal: (
            <div className="p-4 font-mono text-sm">
                Welcome to MacFolio Terminal<br />$ _
            </div>
        ),
    }), []);

    const focusWindow = useCallback((id) => {
        setActiveWindowId(id);
        setZIndexCounter((prev) => prev + 1);
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w
            )
        );
    }, [zIndexCounter]);


    const openApp = useCallback((appId) => {
        setWindows((currentWindows) => {
            const existing = currentWindows.find((w) => w.id === appId);
            if (existing) {
                return currentWindows.map((w) =>
                    w.id === appId ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w
                );
            }
            return [
                ...currentWindows,
                {
                    id: appId,
                    title: appId.charAt(0).toUpperCase() + appId.slice(1),
                    component: apps[appId] || <div>App not found</div>,
                    isOpen: true,
                    isMinimized: false,
                    zIndex: zIndexCounter + 1,
                    position: {
                        x: 100 + (currentWindows.length * 20),
                        y: 100 + (currentWindows.length * 20),
                    },
                },
            ];
        });

        // Always increment and activate
        setZIndexCounter((prev) => prev + 1);
        setActiveWindowId(appId);
    }, [zIndexCounter, apps]);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const resetActiveWindow = useCallback(() => {
        setActiveWindowId(null);
    }, []);


    const value = useMemo(() => ({
        windows,
        activeWindowId,
        isActive: !!activeWindowId,
        openApp,
        closeWindow,
        focusWindow,
        minimizeWindow,
        resetActiveWindow
    }), [windows, activeWindowId, openApp, closeWindow, focusWindow, minimizeWindow, resetActiveWindow]);

    return (
        <WindowContext.Provider value={value}>
            {children}
        </WindowContext.Provider>
    );
};

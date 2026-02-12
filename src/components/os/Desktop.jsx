import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useWindowContext } from "../../context/WindowContext";




const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
}


const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => {
    return (
      <span key={i} className={className} style={{ fontVariationSettings: `"wght" ${baseWeight}` }}>
        {char === " " ? "\u00A0" : char}
      </span>
    )
  })
};


const setupTextHover = (container, type) => {
  if (!container) return;

  console.log(container);
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];
  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
      duration
    })
  };
  console.log(letters.length)
  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);
      animateLetter(letter, min + (max - min) * intensity)

    })
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  }


  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    container.removeEventListener("mousemove", handleMouseMove)
    container.removeEventListener("mouseleave", handleMouseLeave)
  }
}


const Desktop = ({ children }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null)
  const { isActive, resetActiveWindow } = useWindowContext();


  useEffect(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
    return () => {
      subtitleCleanup();
      titleCleanup();
    }

  }, [])

  // Background click handler to reset active window if needed
  const handleBackgroundClick = (e) => {
    // Only reset if clicking directly on the background or the text container (if it's not blocking)
    // But since text container is overlaying, we might want to check if the click target is NOT a window.
    // The windows are in {children}.
    // If the click bubbles up to here, it means it wasn't caught by a window (assuming windows stop propagation or are separate).
    // Actually, windows are rendered as children. If I click a window, it might bubble to this div.
    // So usually we check e.target === e.currentTarget or similar.
    // But let's stick to the requested z-index logic first.
    // If Text is z-50 (!isActive), clicks go to text or background.
    // If Text is z-0 (isActive), Windows are z-50.
    // If I click background when isActive is true, I want to reset.
    // But background is z-0 or z-1?
    // Background Image div is standard.
    // Text container is absolute inset-0.
    // If Text is z-0, and Windows z-50.
    // Clicking "background" (the gaps between windows) -> hits Text container (z-0)?
    // Or hits Background Image (parent)?
    // If Text container is `pointer-events-none`, it passes through to Background Image.
    // Check line 95 in proposed code: !isActive ? "z-50 pointer-events-auto" : "z-0 pointer-events-none".
    // If !isActive: Text is z-50, pointer-events-auto. Clicks hit Text.
    // If isActive: Text is z-0, pointer-events-none. Clicks pass through Text.
    // Where do they go? To the parent `div` (Background).
    // So if I put onClick on the parent div, it should catch clicks when isActive (and hitting background).
    // But will it catch clicks from Windows (z-50)? Yes, if they bubble.
    // So `Window` component should probably `e.stopPropagation()` on click?
    // Or I check `e.target` here.
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-background-hit-area')) {
      // resetActiveWindow(); // commenting out unless user requested "click background to reset" explicitly.
      // User said: "Show how to reset it when closed." - implies explicit close button.
      // But "When no window is active -> text pressure layer...".
      // I will not add auto-reset on click unless requested, to avoid unwanted closes.
    }
  };


  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("/images/wallpaper.png")' }}>
      {/* Overlay for potential tinting/effects */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />


      {/* Text Layer */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${!isActive ? "z-50 pointer-events-auto" : "z-0 pointer-events-none"}`}>
        <div className="text-center"> {/* Allow interactions with text if needed, or keep none */}
          <p ref={subtitleRef} className='text-white text-2xl font-light mb-4  tracking-wide'>
            {renderText("hey, I'm Ahmed! Welcome to my", "font-georama text-white text-2xl font-light mb-4  tracking-wide", 300)}
          </p>
          {/* Mobile Fallback */}
          <h1 ref={titleRef} className='text-6xl text-white font-bold '>
            {renderText("Portfolio", "font-georama  text-6xl text-white font-bold ", 400)}
          </h1>
        </div>
      </div>

      {/* Desktop Content (Windows, Icons) */}
      <div className={`relative w-full h-full p-2 transition-all duration-300 ${isActive ? "z-50 pointer-events-auto" : "z-0 pointer-events-none"}`}>
        {children}
      </div>
    </div>
  );
};

export default Desktop;

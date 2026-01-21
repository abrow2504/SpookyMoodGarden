import { useEffect } from "react";

/**
 * Custom hook that creates a subtle spotlight effect that follows the cursor
 */
export function useSparkleCursor() {
  useEffect(() => {
    // Create the spotlight element
    const spotlight = document.createElement("div");
    spotlight.className = "cursor-spotlight";
    document.body.appendChild(spotlight);

    function handleMouseMove(e: MouseEvent) {
      // Smooth follow with CSS custom properties
      spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
      spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      spotlight.remove();
    };
  }, []);
}

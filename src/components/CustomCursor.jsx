import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic hover detection for links, buttons, and custom controls
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .clickable');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Add listeners initially
    addHoverListeners();

    // Re-check periodically in case React renders new elements
    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  // Smooth lagging effect for the outer ring using requestAnimationFrame
  useEffect(() => {
    let requestRef;
    
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease value: smaller = slower, larger = faster trailing
        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef = requestAnimationFrame(updateRing);
    };

    requestRef = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(requestRef);
  }, [position]);

  if (hidden) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.3)',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
          borderWidth: isHovered ? '2px' : '1px',
        }}
      />
    </>
  );
}

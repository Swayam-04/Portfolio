import { useState, useEffect, useRef } from 'react';
import { useRobotStore } from '../../store/useRobotStore';

export const SpeechBubbleOverlay = () => {
  const { bubbleVisible, bubbleText, speechId, hideBubble } = useRobotStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [displayedText, setDisplayedText] = useState("");
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);

    if (!bubbleVisible || !bubbleText) {
      setDisplayedText("");
      return;
    }

    let currentString = "";
    let i = 0;
    
    typeIntervalRef.current = setInterval(() => {
      try {
        if (i < bubbleText.length) {
          currentString += bubbleText.charAt(i);
          setDisplayedText(currentString);
          i++;
        } else {
          if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
          dismissTimeoutRef.current = setTimeout(() => {
            hideBubble();
          }, 5000);
        }
      } catch (e) {
        console.error(`[ERROR] Typing Animation Failed`, e);
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setDisplayedText(bubbleText);
        dismissTimeoutRef.current = setTimeout(() => {
          hideBubble();
        }, 5000);
      }
    }, 30);

    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, [bubbleText, bubbleVisible, speechId, hideBubble]);

  // Click outside to close speech bubble on tap/click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (useRobotStore.getState().bubbleVisible) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'CANVAS') {
          hideBubble();
        }
      }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick, { passive: true });
    
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [hideBubble]);

  // Direct positioning and flip evaluation via requestAnimationFrame
  useEffect(() => {
    let active = true;

    const updateBubblePosition = () => {
      if (!active) return;
      const el = containerRef.current;
      if (el) {
        const xStr = document.documentElement.style.getPropertyValue('--robot-x');
        const yStr = document.documentElement.style.getPropertyValue('--robot-y');

        if (xStr && yStr) {
          const rx = parseFloat(xStr);
          const ry = parseFloat(yStr);

          const width = window.innerWidth;
          const height = window.innerHeight;

          // Determine placement based on available screen space
          let placement = 'top';

          const spaceRight = width - rx;
          const spaceLeft = rx;
          const spaceTop = ry;
          const spaceBottom = height - ry;

          // Flip evaluations: Priority Top, Right, Left, Bottom
          if (spaceTop > 180) {
            placement = 'top';
          } else if (spaceRight > 320) {
            placement = 'right';
          } else if (spaceLeft > 320) {
            placement = 'left';
          } else if (spaceBottom > 180) {
            placement = 'bottom';
          } else {
            placement = spaceTop > spaceBottom ? 'top' : 'bottom';
          }

          let tx = '-50%';
          let ty = '-50%';

          if (placement === 'right') {
            tx = '40px';
            ty = '-50%';
          } else if (placement === 'left') {
            tx = 'calc(-100% - 40px)';
            ty = '-50%';
          } else if (placement === 'top') {
            tx = '-50%';
            ty = 'calc(-100% - 80px)';
          } else if (placement === 'bottom') {
            tx = '-50%';
            ty = '80px';
          }

          el.style.left = `${rx}px`;
          el.style.top = `${ry}px`;
          el.style.transform = `translate(${tx}, ${ty})`;

          // Update arrow indicators
          const arrowL = el.querySelector('.arrow-l') as HTMLElement;
          const arrowR = el.querySelector('.arrow-r') as HTMLElement;
          const arrowT = el.querySelector('.arrow-t') as HTMLElement;
          const arrowB = el.querySelector('.arrow-b') as HTMLElement;

          if (arrowL) arrowL.style.display = placement === 'right' ? 'block' : 'none';
          if (arrowR) arrowR.style.display = placement === 'left' ? 'block' : 'none';
          if (arrowT) arrowT.style.display = placement === 'top' ? 'block' : 'none';
          if (arrowB) arrowB.style.display = placement === 'bottom' ? 'block' : 'none';
        }
      }
      requestAnimationFrame(updateBubblePosition);
    };

    requestAnimationFrame(updateBubblePosition);
    return () => {
      active = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed z-[9999] pointer-events-none transition-opacity duration-300
      ${bubbleVisible ? 'opacity-100' : 'opacity-0 scale-95'}`}
    >
      <div className="pointer-events-auto relative bg-black/80 backdrop-blur-xl border border-primary/40 text-white p-4 rounded-[20px] text-[14px] md:text-[16px] font-medium leading-relaxed shadow-[0_0_40px_rgba(0,229,255,0.2)] w-max max-w-[70vw] md:max-w-[300px] max-h-[120px] md:max-h-[200px] overflow-y-auto select-none">
        {displayedText}
        
        {/* Right Arrow (Bubble is to the right, arrow on left) */}
        <div className="arrow-l absolute top-1/2 -translate-y-1/2 -left-3 w-0 h-0 border-y-8 border-y-transparent border-r-[12px] border-r-black/80" />
        
        {/* Left Arrow (Bubble is to the left, arrow on right) */}
        <div className="arrow-r absolute top-1/2 -translate-y-1/2 -right-3 w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-black/80" />
        
        {/* Top Arrow (Bubble is above, arrow on bottom) */}
        <div className="arrow-t absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[12px] border-t-black/80" />
        
        {/* Bottom Arrow (Bubble is below, arrow on top) */}
        <div className="arrow-b absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-[12px] border-b-black/80" />
      </div>
    </div>
  );
};

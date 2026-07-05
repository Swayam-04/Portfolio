import { useState, useEffect, useRef } from 'react';
import { useRobotStore } from '../../store/useRobotStore';

export const SpeechBubbleOverlay = () => {
  const { bubbleVisible, bubbleText, speechId, hideBubble, activeSection } = useRobotStore();
  
  // Calculate which side of the screen the robot is on based on the active section
  const isRightEdge = !['about', 'experience', 'journey', 'awards', 'resume'].includes(activeSection);
  
  const [displayedText, setDisplayedText] = useState("");
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);

    if (!bubbleVisible || !bubbleText) {
      console.log(`[STAGE 9] Bubble Render: Hidden`);
      setDisplayedText("");
      return;
    }

    console.log(`[STAGE 6] Bubble Render: Visible, preparing text...`);
    let currentString = "";
    let i = 0;
    
    console.log(`[STAGE 7] Typing Animation Started (speechId: ${speechId})`);
    typeIntervalRef.current = setInterval(() => {
      try {
        if (i < bubbleText.length) {
          currentString += bubbleText.charAt(i);
          setDisplayedText(currentString);
          i++;
        } else {
          console.log(`[STAGE 8] Typing Animation Finished (speechId: ${speechId})`);
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
        // Don't close immediately if clicking the Canvas (which manages robot click)
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

  return (
    <div 
      className={`fixed z-[9999] pointer-events-none transition-all duration-500 
      ${bubbleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
      md:top-1/2 md:-translate-y-1/2 md:bottom-auto
      ${isRightEdge ? 'md:right-[15vw] md:left-auto' : 'md:left-[15vw] md:right-auto'}
      bottom-[120px] right-[16px] max-w-[70vw] md:max-w-[300px]`}
    >
      <div className="pointer-events-auto relative bg-black/80 backdrop-blur-xl border border-primary/40 text-white p-4 rounded-[20px] text-[14px] md:text-[16px] font-medium leading-relaxed shadow-[0_0_40px_rgba(0,229,255,0.2)] w-max max-w-full max-h-[120px] md:max-h-none overflow-y-auto md:overflow-visible">
        {displayedText}
        {/* Desktop Arrow */}
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent ${isRightEdge ? '-right-3 border-l-[12px] border-l-black/80' : '-left-3 border-r-[12px] border-r-black/80'}`} />
        {/* Mobile Arrow */}
        <div className="block md:hidden absolute -bottom-3 right-6 w-0 h-0 border-x-8 border-x-transparent border-t-[12px] border-t-black/80" />
      </div>
    </div>
  );
};

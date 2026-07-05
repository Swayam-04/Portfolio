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
          }, 4000);
        }
      } catch (e) {
        console.error(`[ERROR] Typing Animation Failed`, e);
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setDisplayedText(bubbleText);
        dismissTimeoutRef.current = setTimeout(() => {
          hideBubble();
        }, 4000);
      }
    }, 30);

    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, [bubbleText, bubbleVisible, speechId, hideBubble]);

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 z-[9999] pointer-events-none transition-all duration-500 
      ${bubbleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
      ${isRightEdge ? 'right-[20vw] md:right-[15vw]' : 'left-[20vw] md:left-[15vw]'}`}
    >
      <div className="relative bg-black/80 backdrop-blur-xl border border-primary/40 text-white p-4 rounded-[20px] text-[16px] font-medium leading-relaxed shadow-[0_0_40px_rgba(0,229,255,0.2)] w-max max-w-[300px]">
        {displayedText}
        <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent ${isRightEdge ? '-right-3 border-l-[12px] border-l-black/80' : '-left-3 border-r-[12px] border-r-black/80'}`} />
      </div>
    </div>
  );
};

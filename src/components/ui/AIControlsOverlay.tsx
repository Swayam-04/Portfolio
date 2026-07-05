import { useRobotStore } from '../../store/useRobotStore';
import { Compass, RotateCcw } from 'lucide-react';

export const AIControlsOverlay = () => {
  const { followGuide, resetPosition } = useRobotStore();

  const handleReset = () => {
    localStorage.removeItem('ai-guide-pos');
    if ((window as any)._aiGuideResumeTimeout) {
      clearTimeout((window as any)._aiGuideResumeTimeout);
    }
    resetPosition();
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9998] pointer-events-auto">
      <div className="glass flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl text-white select-none">
        <div className="flex items-center gap-1.5 pr-2">
          <Compass className={`w-4 h-4 ${followGuide ? 'text-primary animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[11px] md:text-xs font-semibold tracking-wide uppercase text-slate-200">AI Guide</span>
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className="flex items-center gap-1 hover:text-accent text-[11px] md:text-xs font-medium text-slate-300 hover:scale-105 transition-all pl-2 border-l border-white/10 active:scale-95 cursor-pointer"
          title="Reset AI Guide Position"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Position</span>
        </button>
      </div>
    </div>
  );
};

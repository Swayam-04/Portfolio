import { useRobotStore } from '../../store/useRobotStore';
import { Compass, RotateCcw } from 'lucide-react';

export const AIControlsOverlay = () => {
  const { followGuide, setFollowGuide, resetPosition } = useRobotStore();

  const handleReset = () => {
    localStorage.removeItem('ai-guide-pos');
    resetPosition();
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9998] pointer-events-auto">
      <div className="glass flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl text-white select-none">
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-2">
          <Compass className={`w-4 h-4 ${followGuide ? 'text-primary animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[11px] md:text-xs font-semibold tracking-wide uppercase text-slate-200">AI Guide</span>
        </div>

        {/* Toggle Switch */}
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-[11px] md:text-xs font-medium text-slate-300">Follow Mode</span>
          <div className="relative">
            <input 
              type="checkbox" 
              checked={followGuide} 
              onChange={(e) => setFollowGuide(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 bg-slate-700 peer-checked:bg-primary rounded-full transition-colors relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-[12px]"></div>
          </div>
        </label>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className="flex items-center gap-1 hover:text-accent text-[11px] md:text-xs font-medium text-slate-300 hover:scale-105 transition-all pl-2 border-l border-white/10 active:scale-95 cursor-pointer"
          title="Reset AI Guide Position"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

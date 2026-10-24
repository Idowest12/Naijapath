import React from 'react';
import { Bot, ChevronRight, Sparkles } from 'lucide-react';

interface DraggableAiButtonProps {
  isExpanded: boolean;
  onToggleExpand: (e: React.MouseEvent) => void;
  onOpenChatbot: () => void;
}

export const DraggableAiButton: React.FC<DraggableAiButtonProps> = ({
  isExpanded,
  onToggleExpand,
  onOpenChatbot,
}) => {
  return (
    <aside 
      aria-label="AI Tech Mentor Assistant"
      className="fixed bottom-6 right-4 sm:right-6 z-40 select-none print:hidden pointer-events-auto"
    >
      <div 
        className="flex items-center rounded-2xl bg-[#D4F938] text-black border-2 border-black shadow-neo-lg hover:shadow-neo-xl hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
      >
        {/* Main Action to open chatbot */}
        <button
          id="floating-chatbot-launcher-btn"
          type="button"
          onClick={onOpenChatbot}
          className="flex items-center gap-3 py-2.5 pl-3.5 pr-3 cursor-pointer group focus:outline-none"
          title="Chat with Mentor Tizzi, your Nigerian tech career guide"
          aria-label="Chat with Mentor Tizzi"
        >
          {/* Avatar icon with live status dot */}
          <div className="relative w-9 h-9 rounded-xl bg-black text-[#D4F938] flex items-center justify-center shrink-0 border-2 border-black shadow-neo-sm font-display font-black text-sm group-hover:bg-[#5D45FD] group-hover:text-white transition-colors">
            <span>T</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-black rounded-full animate-pulse" />
          </div>

          {isExpanded && (
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xs text-black tracking-tight uppercase">
                  Ask Mentor Tizzi
                </span>
                <span className="px-1.5 py-0.2 bg-black text-[#D4F938] text-[9px] font-mono-tech font-bold rounded-xs">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-black/75 font-mono-tech leading-tight">
                Realistic Naija tech guide • Free
              </span>
            </div>
          )}
        </button>

        {/* Minimize / expand toggle */}
        <button
          id="toggle-ai-button-compact-btn"
          type="button"
          onClick={onToggleExpand}
          className="p-2 text-black hover:bg-black/10 rounded-r-xl border-l-2 border-black transition-colors cursor-pointer"
          title={isExpanded ? 'Collapse mentor button' : 'Expand mentor button'}
          aria-label={isExpanded ? 'Collapse mentor button' : 'Expand mentor button'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
};


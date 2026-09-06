import React from 'react';
import { Bot, ChevronRight, MessageSquare } from 'lucide-react';

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
        className="flex items-center rounded-full bg-stone-900 text-white shadow-[0_8px_30px_rgb(0,0,0,0.18)] border border-stone-800 hover:border-stone-700 transition-all duration-200"
      >
        {/* Main Action to open chatbot */}
        <button
          id="floating-chatbot-launcher-btn"
          type="button"
          onClick={onOpenChatbot}
          className="flex items-center gap-2.5 py-2.5 pl-3.5 pr-3 rounded-full hover:bg-stone-800/80 transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          title="Chat with Mentor Tizzi, your Nigerian tech career guide"
          aria-label="Chat with Mentor Tizzi"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-100 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-emerald-700 transition-colors">
            <Bot className="w-4 h-4" />
          </div>

          {isExpanded && (
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-semibold text-white tracking-tight leading-tight">
                Ask Mentor Tizzi
              </span>
              <span className="text-[10px] text-stone-400 font-normal leading-tight">
                Realistic African tech advice
              </span>
            </div>
          )}
        </button>

        {/* Discreet minimize toggle */}
        <button
          id="toggle-ai-button-compact-btn"
          type="button"
          onClick={onToggleExpand}
          className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 rounded-r-full border-l border-stone-800 transition-colors cursor-pointer"
          title={isExpanded ? 'Collapse mentor button' : 'Expand mentor button'}
          aria-label={isExpanded ? 'Collapse mentor button' : 'Expand mentor button'}
        >
          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
};

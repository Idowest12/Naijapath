import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';

interface DraggableAiButtonProps {
  isExpanded: boolean;
  onToggleExpand: (e: React.MouseEvent) => void;
  onOpenChatbot: () => void;
}

const STORAGE_X_KEY = 'naija_ai_pos_x_ratio_v1';
const STORAGE_Y_KEY = 'naija_ai_pos_y_ratio_v1';

export const DraggableAiButton: React.FC<DraggableAiButtonProps> = ({
  isExpanded,
  onToggleExpand,
  onOpenChatbot,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    pointerX: number;
    pointerY: number;
    initialElemX: number;
    initialElemY: number;
    hasMoved: boolean;
  }>({
    pointerX: 0,
    pointerY: 0,
    initialElemX: 0,
    initialElemY: 0,
    hasMoved: false,
  });

  // Clamps position within safe screen margins
  const clampPosition = useCallback((x: number, y: number, elemWidth: number, elemHeight: number) => {
    if (typeof window === 'undefined') return { x, y };
    const margin = 12;
    const maxX = Math.max(margin, window.innerWidth - elemWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - elemHeight - margin);
    return {
      x: Math.min(Math.max(x, margin), maxX),
      y: Math.min(Math.max(y, margin), maxY),
    };
  }, []);

  // Initialize position from saved ratio or default to bottom-right
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPos = () => {
      const elem = containerRef.current;
      const width = elem?.offsetWidth || (isExpanded ? 180 : 54);
      const height = elem?.offsetHeight || 52;

      let targetX = window.innerWidth - width - 20;
      let targetY = window.innerHeight - height - 24;

      try {
        const savedXRatio = localStorage.getItem(STORAGE_X_KEY);
        const savedYRatio = localStorage.getItem(STORAGE_Y_KEY);
        if (savedXRatio !== null && savedYRatio !== null) {
          const ratioX = parseFloat(savedXRatio);
          const ratioY = parseFloat(savedYRatio);
          if (!isNaN(ratioX) && !isNaN(ratioY)) {
            targetX = ratioX * (window.innerWidth - width);
            targetY = ratioY * (window.innerHeight - height);
          }
        }
      } catch {}

      setPosition(clampPosition(targetX, targetY, width, height));
    };

    initPos();

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const elem = containerRef.current;
        const width = elem?.offsetWidth || (isExpanded ? 180 : 54);
        const height = elem?.offsetHeight || 52;
        return clampPosition(prev.x, prev.y, width, height);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition, isExpanded]);

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary pointer button
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    // Do not initiate drag if user clicked directly on the toggle collapse/expand button
    const target = e.target as HTMLElement;
    if (target.closest('#toggle-ai-button-compact-btn')) return;

    const elem = containerRef.current;
    if (!elem) return;

    const rect = elem.getBoundingClientRect();
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      initialElemX: rect.left,
      initialElemY: rect.top,
      hasMoved: false,
    };

    setIsDragging(true);
    elem.setPointerCapture(e.pointerId);
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;

    if (Math.hypot(dx, dy) > 5) {
      dragStartRef.current.hasMoved = true;
    }

    const elem = containerRef.current;
    const width = elem?.offsetWidth || (isExpanded ? 180 : 54);
    const height = elem?.offsetHeight || 52;

    const newX = dragStartRef.current.initialElemX + dx;
    const newY = dragStartRef.current.initialElemY + dy;

    setPosition(clampPosition(newX, newY, width, height));
  };

  // Pointer Up / Cancel
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      const elem = containerRef.current;
      elem?.releasePointerCapture(e.pointerId);

      // Save position ratio so it stays responsive across screens & reloads
      if (position && elem) {
        const width = elem.offsetWidth;
        const height = elem.offsetHeight;
        const maxScrollX = Math.max(1, window.innerWidth - width);
        const maxScrollY = Math.max(1, window.innerHeight - height);
        const ratioX = Math.min(1, Math.max(0, position.x / maxScrollX));
        const ratioY = Math.min(1, Math.max(0, position.y / maxScrollY));
        localStorage.setItem(STORAGE_X_KEY, ratioX.toFixed(4));
        localStorage.setItem(STORAGE_Y_KEY, ratioY.toFixed(4));
      }
    } catch {}

    // If pointer barely moved, treat as normal click on the button
    if (!dragStartRef.current.hasMoved) {
      onOpenChatbot();
    }
  };

  // Style positioning
  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        zIndex: 50,
      }
    : {
        position: 'fixed',
        bottom: '24px',
        right: '20px',
        touchAction: 'none',
        zIndex: 50,
      };

  return (
    <div
      ref={containerRef}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setIsDragging(false)}
      className={`select-none flex items-center shadow-2xl rounded-full border border-stone-700/80 bg-stone-900/95 backdrop-blur-md ${
        isDragging
          ? 'cursor-grabbing scale-105 shadow-emerald-950/40 ring-2 ring-emerald-500/50'
          : 'cursor-grab hover:shadow-emerald-950/20'
      } transition-transform duration-150`}
      title="Drag to reposition anywhere | Tap to chat with Naija AI"
    >
      {/* Drag Grip Indicator */}
      <div 
        className="pl-2 pr-0.5 text-stone-500 hover:text-stone-300 transition-colors flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Drag to move"
        aria-hidden="true"
      >
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      {/* Main AI button or collapsed icon */}
      <div
        id="floating-chatbot-launcher-btn"
        className={`group flex items-center rounded-full text-white transition-all duration-200 ${
          isExpanded ? 'pr-2.5 py-2 gap-2' : 'pr-2 py-2'
        }`}
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white shrink-0 shadow-sm transition-colors">
          <Bot className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-300 border border-stone-900 rounded-full animate-pulse"></span>
        </div>
        {isExpanded && (
          <div className="flex flex-col items-start text-left pr-0.5">
            <span className="text-xs font-black tracking-tight leading-tight text-white whitespace-nowrap">
              Ask Naija AI
            </span>
            <span className="text-[10px] text-stone-300 font-medium leading-tight whitespace-nowrap">
              Mentor Tizzi 🇳🇬
            </span>
          </div>
        )}
      </div>

      {/* Toggle collapse / expand button */}
      <button
        id="toggle-ai-button-compact-btn"
        type="button"
        onClick={onToggleExpand}
        className="px-1.5 py-2.5 text-stone-400 hover:text-white border-l border-stone-800 hover:bg-stone-800/60 rounded-r-full transition-colors cursor-pointer"
        title={isExpanded ? 'Minimize AI button' : 'Expand AI button'}
        aria-label={isExpanded ? 'Minimize AI button' : 'Expand AI button'}
      >
        {isExpanded ? (
          <ChevronRight className="w-3.5 h-3.5 pointer-events-none" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 pointer-events-none" />
        )}
      </button>
    </div>
  );
};

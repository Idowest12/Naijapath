import React from 'react';

interface TechNavLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export const TechNavLogo: React.FC<TechNavLogoProps> = ({
  className = '',
  variant = 'default',
  size = 'md',
}) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  const pillPad = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-0.5 text-xs sm:text-sm',
    lg: 'px-2.5 py-1 text-sm sm:text-base',
  }[size];

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-1.5 font-display font-black tracking-tight select-none ${textSizes} ${className}`}>
        <span className="text-white">NAIJA</span>
        <span className={`bg-[#D4F938] text-black font-extrabold rounded-md border-2 border-black ${pillPad}`}>
          PATH
        </span>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={`inline-flex items-center gap-1.5 font-display font-black tracking-tight select-none ${textSizes} ${className}`}>
        <span className="text-white">NAIJA</span>
        <span className={`bg-[#5D45FD] text-white font-extrabold rounded-md border border-white/20 ${pillPad}`}>
          PATH
        </span>
      </div>
    );
  }

  // Default header / light variant: NAIJA in black, PATH in purple box (#5D45FD)
  return (
    <div className={`inline-flex items-center gap-1.5 font-display font-black tracking-tight select-none ${textSizes} ${className}`}>
      <span className="text-black">NAIJA</span>
      <span className={`bg-[#5D45FD] text-white font-extrabold rounded-md ${pillPad}`}>
        PATH
      </span>
    </div>
  );
};

export const NaijaPathLogo = TechNavLogo;


import React from 'react';

interface HandIconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * Hand-drawn SVG icons designed with organic curves, rounded caps,
 * and warm, human craftsmanship to eradicate the mechanical 'AI-generated' aesthetic.
 */

export const HandSmartphone: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Sketched phone body with gentle wobble */}
    <rect x="6.2" y="2.5" width="11.6" height="19" rx="2.4" />
    {/* Screen line */}
    <path d="M7 5.8h10" strokeDasharray="0.2 0.2" opacity="0.6" />
    {/* Top speaker notch */}
    <path d="M10.5 4.5h3" />
    {/* Home indicator pill */}
    <path d="M10 18.5h4" strokeWidth={strokeWidth + 0.3} />
  </svg>
);

export const HandLaptop: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Open screen */}
    <path d="M4.5 5.5c0-.8.6-1.5 1.5-1.5h12c.9 0 1.5.7 1.5 1.5v9.2c0 .8-.6 1.3-1.5 1.3H6c-.9 0-1.5-.5-1.5-1.3V5.5z" />
    {/* Screen sketch notch */}
    <circle cx="12" cy="7" r="0.7" fill="currentColor" stroke="none" />
    {/* Base keyboard deck */}
    <path d="M2.5 18.5c.2-.7 1-1.5 2-1.5h15c1 0 1.8.8 2 1.5l.5 1.2c.1.5-.3 1-1 1H3c-.7 0-1.1-.5-1-1l.5-1.2z" />
    {/* Trackpad */}
    <path d="M10 19.5h4" opacity="0.7" />
  </svg>
);

export const HandPalette: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Hand-drawn artist palette contour */}
    <path d="M12 3a9 9 0 0 0-9 9c0 4.2 3.2 7.5 7.4 7.5 1.2 0 2.2-.8 2.5-1.9.2-.8.8-1.4 1.7-1.4h1.4c3.9 0 7-3.1 7-7 0-4.9-4.9-6.2-11-6.2z" />
    {/* Color paint dots */}
    <circle cx="8" cy="10" r="1.3" fill="currentColor" />
    <circle cx="12" cy="7.5" r="1.3" fill="currentColor" />
    <circle cx="16" cy="10.5" r="1.3" fill="currentColor" />
    {/* Thumb hole */}
    <ellipse cx="14" cy="14.5" rx="1.5" ry="1.8" />
  </svg>
);

export const HandPuzzle: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Jigsaw puzzle interlocking tab */}
    <path d="M4 10V6a2 2 0 0 1 2-2h4c0 1.2.9 2 2 2s2-.8 2-2h4a2 2 0 0 1 2 2v4c-1.2 0-2 .9-2 2s.8 2 2 2v4a2 2 0 0 1-2 2h-4c0-1.2-.9-2-2-2s-2 .8-2 2H6a2 2 0 0 1-2-2v-4c1.2 0 2-.9 2-2s-.8-2-2-2z" />
  </svg>
);

export const HandChecklist: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Clipboard body */}
    <path d="M7 5H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    {/* Clip top */}
    <rect x="8" y="2" width="8" height="4" rx="1.2" />
    {/* Check items */}
    <path d="M7.5 11l1.5 1.5 3-3" />
    <path d="M14 11h3" />
    <path d="M7.5 16l1.5 1.5 3-3" />
    <path d="M14 16h3" />
  </svg>
);

export const HandCoins: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Front coin */}
    <circle cx="9" cy="13" r="5.5" />
    <path d="M9 11v4M7.8 12.3h2.4" />
    {/* Stacked rear coin */}
    <path d="M14 8a5.5 5.5 0 0 1 4.5 5.4c0 3-2.5 5.6-5.5 5.6" />
    <path d="M12 6a5.5 5.5 0 0 1 5.5 5.5" />
  </svg>
);

export const HandGraduation: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Mortarboard Diamond */}
    <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3z" />
    {/* Skullcap */}
    <path d="M6 11v5c0 2.5 6 3.5 6 3.5s6-1 6-3.5v-5" />
    {/* Tassel */}
    <path d="M22 8.5v7" />
    <circle cx="22" cy="16" r="1" fill="currentColor" />
  </svg>
);

export const HandCompass: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer circle with slight sketch wobble */}
    <circle cx="12" cy="12" r="9.2" />
    {/* Cardinal tick marks */}
    <path d="M12 3.5v1.8M12 18.7v1.8M3.5 12h1.8M18.7 12h1.8" opacity="0.6" />
    {/* Compass Needle */}
    <polygon points="14.8,9.2 13.2,14 9.2,14.8 10.8,10" fill="currentColor" fillOpacity="0.18" />
    <polygon points="14.8,9.2 13.2,14 9.2,14.8 10.8,10" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
  </svg>
);

export const HandWrench: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const HandBulb: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Bulb glass envelope */}
    <path d="M9 18h6M10 21h4" />
    <path d="M9.5 15c-2.3-1.4-3.5-3.8-3.5-6.5a6 6 0 0 1 12 0c0 2.7-1.2 5.1-3.5 6.5" />
    {/* Filament doodle */}
    <path d="M10 11c.8-1 3.2-1 4 0" />
  </svg>
);

export const HandRocket: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-2.05 9-1.2 1.4-2.8 2.5-3.95 3l-4 1z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
  </svg>
);

export const HandBrain: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .3.05.6.14.88A3.5 3.5 0 0 0 4 11.5a3.5 3.5 0 0 0 2.14 3.12A3.5 3.5 0 0 0 9.5 18H10" />
    <path d="M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .3-.05.6-.14.88A3.5 3.5 0 0 1 20 11.5a3.5 3.5 0 0 1-2.14 3.12A3.5 3.5 0 0 1 14.5 18H14" />
    <path d="M12 4v16" strokeDasharray="1 2" />
    <path d="M7 10a2 2 0 0 1 2-2M17 10a2 2 0 0 0-2-2" opacity="0.6" />
  </svg>
);

export const HandShield: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5l8 3.5v6.5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3.5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const HandClock: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.5v5.5l3.5 2" />
  </svg>
);

export const HandUsers: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16 5a3 3 0 0 1 0 6M19 19c0-2.2-1.8-4-4-4.5" opacity="0.7" />
  </svg>
);

export const HandGlobe: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 12h17" />
    <path d="M12 3a13 13 0 0 1 4 9 13 13 0 0 1-4 9 13 13 0 0 1-4-9 13 13 0 0 1 4-9z" />
  </svg>
);

export const HandLightning: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.15" />
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const HandBook: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 0-2.5 2.5c0-.8-.7-1.5-1.5-1.5z" />
    <path d="M6 6h10M6 10h8" opacity="0.6" />
  </svg>
);

export const HandCheckCircle: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9.2" />
    <path d="M8.5 12.3l2.4 2.4 4.8-4.8" />
  </svg>
);

export const HandSprout: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21v-8" />
    <path d="M12 13c0-4.5 3.5-7 8-7 0 4.5-2.5 8-8 7z" />
    <path d="M12 15c0-3.5-2.5-5.5-6-5.5 0 3.5 2 6 6 5.5z" />
    <path d="M6 21c3-1 9-1 12 0" opacity="0.6" />
  </svg>
);

export const HandRefresh: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export const HandMessage: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.5 14a3 3 0 0 1-3 3h-8.5l-4 4V6a3 3 0 0 1 3-3h9.5a3 3 0 0 1 3 3v8z" />
    <path d="M8 9h8M8 12h5" opacity="0.6" />
  </svg>
);

export const HandBuilding: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 21v-4h4v4" />
  </svg>
);

export const HandCode: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" opacity="0.6" />
  </svg>
);

export const HandBriefcase: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M3 12h18" opacity="0.6" />
  </svg>
);

export const HandVideo: React.FC<HandIconProps> = ({ className = 'w-5 h-5', size, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="5" width="14" height="14" rx="2" />
    <polygon points="22 7 16 12 22 17 22 7" fill="currentColor" fillOpacity="0.15" />
    <polygon points="22 7 16 12 22 17 22 7" />
  </svg>
);



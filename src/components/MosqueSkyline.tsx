import React from 'react';

interface MosqueSkylineProps {
  className?: string;
  fillColor?: string;
  opacity?: number;
}

export const MosqueSkyline: React.FC<MosqueSkylineProps> = ({
  className = 'w-full h-12',
  fillColor = 'currentColor',
  opacity = 0.35,
}) => {
  return (
    <svg
      viewBox="0 0 500 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <g fill={fillColor} fillOpacity={opacity}>
        {/* Base ground line */}
        <rect x="0" y="82" width="500" height="8" rx="2" />

        {/* Left tower 1 */}
        <rect x="15" y="40" width="8" height="42" rx="1" />
        <path d="M19 22L13 38H25L19 22Z" />
        <circle cx="19" cy="20" r="2.5" />

        {/* Small minarets */}
        <rect x="36" y="52" width="6" height="30" rx="1" />
        <path d="M39 38L34 52H44L39 38Z" />

        {/* Dome Left */}
        <path d="M52 82V58C52 46 62 36 74 36C86 36 96 46 96 58V82H52Z" />
        <path d="M74 24V36" stroke={fillColor} strokeWidth="2" strokeOpacity={opacity} />
        <circle cx="74" cy="22" r="3" />
        {/* Window arch */}
        <path d="M66 76V65C66 60 70 56 74 56C78 56 82 60 82 65V76H66Z" fill="#ffffff" fillOpacity="0.4" />

        {/* Tower 2 */}
        <rect x="108" y="32" width="9" height="50" rx="1" />
        <path d="M112.5 14L106 32H119L112.5 14Z" />
        <circle cx="112.5" cy="12" r="2.5" />

        {/* Mosque Arched Hallway Left-Center */}
        <rect x="128" y="50" width="48" height="32" rx="1" />
        <path d="M136 82V65C136 60 140 56 144 56C148 56 152 60 152 65V82H136Z" fill="#ffffff" fillOpacity="0.4" />
        <path d="M156 82V65C156 60 160 56 164 56C168 56 172 60 172 65V82H156Z" fill="#ffffff" fillOpacity="0.4" />

        {/* Tall Minaret Left-Center */}
        <rect x="186" y="24" width="10" height="58" rx="1" />
        <rect x="183" y="44" width="16" height="4" rx="1" />
        <path d="M191 6L184 24H198L191 6Z" />
        <circle cx="191" cy="4" r="3" />

        {/* Central Grand Dome */}
        <path d="M208 82V54C208 32 226 20 250 20C274 20 292 32 292 54V82H208Z" />
        <path d="M250 4V20" stroke={fillColor} strokeWidth="3" strokeOpacity={opacity} />
        <circle cx="250" cy="3" r="4" />
        {/* Main Arch cutout */}
        <path d="M232 82V58C232 48 240 42 250 42C260 42 268 48 268 58V82H232Z" fill="#ffffff" fillOpacity="0.4" />

        {/* Tall Minaret Right-Center */}
        <rect x="304" y="24" width="10" height="58" rx="1" />
        <rect x="301" y="44" width="16" height="4" rx="1" />
        <path d="M309 6L302 24H316L309 6Z" />
        <circle cx="309" cy="4" r="3" />

        {/* Mosque Arched Hallway Right-Center */}
        <rect x="324" y="50" width="48" height="32" rx="1" />
        <path d="M332 82V65C332 60 336 56 340 56C344 56 348 60 348 65V82H332Z" fill="#ffffff" fillOpacity="0.4" />
        <path d="M352 82V65C352 60 356 56 360 56C364 56 368 60 368 65V82H352Z" fill="#ffffff" fillOpacity="0.4" />

        {/* Tower 3 */}
        <rect x="382" y="32" width="9" height="50" rx="1" />
        <path d="M386.5 14L380 32H393L386.5 14Z" />
        <circle cx="386.5" cy="12" r="2.5" />

        {/* Dome Right */}
        <path d="M404 82V58C404 46 414 36 426 36C438 36 448 46 448 58V82H404Z" />
        <path d="M426 24V36" stroke={fillColor} strokeWidth="2" strokeOpacity={opacity} />
        <circle cx="426" cy="22" r="3" />
        <path d="M418 76V65C418 60 422 56 426 56C430 56 434 60 434 65V76H418Z" fill="#ffffff" fillOpacity="0.4" />

        {/* Right Small minaret */}
        <rect x="458" y="52" width="6" height="30" rx="1" />
        <path d="M461 38L456 52H466L461 38Z" />

        {/* Right tower 4 */}
        <rect x="476" y="40" width="8" height="42" rx="1" />
        <path d="M480 22L474 38H486L480 22Z" />
        <circle cx="480" cy="20" r="2.5" />
      </g>
    </svg>
  );
};

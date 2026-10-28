import React from 'react';

interface VerifiedBadgeProps {
  className?: string;
  title?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  className = "w-4 h-4 text-[#1d9bf0]", 
  title = "Verified Assigned Candidate Profile" 
}) => {
  return (
    <span className="inline-flex items-center flex-shrink-0" title={title}>
      <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-label="Verified">
        <path 
          d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-3.999-4-3.999-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.15 1.273 2.52 2.148 4.1 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.15 2.148-2.52 2.148-4.1z" 
          fill="#1d9bf0"
        />
        <path 
          d="M9.8 17.1l-4.2-4.2 1.4-1.4 2.8 2.8 7.4-7.4 1.4 1.4-8.8 8.8z" 
          fill="#ffffff"
        />
      </svg>
    </span>
  );
};

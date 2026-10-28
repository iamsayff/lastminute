import React from 'react';

interface AmusuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AmusuLogo: React.FC<AmusuLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const logoHeights = {
    sm: 'h-12 sm:h-13',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24'
  };

  const logoUrl = 'https://i.ibb.co/rrNwtYY/Green-Mosque-Emblem-and-Election-Wordmark.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoUrl}
        alt="AMUSU Elections Logo"
        className={`${logoHeights[size]} w-auto object-contain transition-all hover:opacity-95`}
      />
    </div>
  );
};

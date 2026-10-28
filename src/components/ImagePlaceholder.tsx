import React from 'react';

interface ImagePlaceholderProps {
  type: 'bab-e-syed' | 'strachey-hall' | 'campus-sunset' | 'student-lawn';
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  type,
  alt,
  className = '',
  aspectRatio = 'aspect-[21/9]',
}) => {
  const imageUrls: Record<string, string> = {
    'bab-e-syed': 'https://i.ibb.co/9mgrLBGk/Grand-Campus-Gate-Under-Blue-Skies.png',
    'strachey-hall': 'https://i.ibb.co/PGMYS6BH/Historic-Red-Brick-Mughal-Campus-Panorama.png',
    'campus-sunset': 'https://i.ibb.co/ccSnnmzc/Red-Brick-Campus-at-Golden-Hour.png',
    'student-lawn': 'https://i.ibb.co/k2F7PrgB/Lively-Campus-Courtyard-Gathering.png',
  };

  const currentUrl = imageUrls[type] || imageUrls['bab-e-syed'];

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs border border-slate-200/60 bg-slate-900 group ${className}`}
    >
      <img
        src={currentUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
      />
      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

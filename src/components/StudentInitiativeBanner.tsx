import React from 'react';

interface StudentInitiativeBannerProps {
  className?: string;
  onClaimClick?: () => void;
}

export const StudentInitiativeBanner: React.FC<StudentInitiativeBannerProps> = ({
  className = '',
  onClaimClick
}) => {
  const handleEmailClick = () => {
    if (onClaimClick) {
      onClaimClick();
    } else {
      window.location.href = 'mailto:contact@amusuelections.in?subject=AMU%20Elections%20Initiative%20-%20Candidate%20Listing%20Query';
    }
  };

  return (
    <div className={`mt-10 sm:mt-12 w-full ${className}`}>
      <div 
        onClick={handleEmailClick}
        className="group relative overflow-hidden rounded-3xl border border-emerald-100/80 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-emerald-300 cursor-pointer bg-white"
        title="Contact AMU Elections Desk"
      >
        <img
          src="/assets/aistudio/Student_Election_Information_Banner_83af1152.png"
          alt="A Student Led Initiative - AMU Elections 2026"
          className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.005]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

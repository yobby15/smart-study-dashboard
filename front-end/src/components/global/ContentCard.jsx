import React from 'react';

const ContentCard = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-auto bg-[#90E0EF] rounded-xl p-4 mb-3 last:mb-0 shadow-sm border border-[#03045E] ${className}`}>
      {children}
    </div>
  );
};

export default ContentCard;
import React from 'react';

const ContentCard = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-auto bg-[#90E0EF] rounded-xl p-4 mb-3 last:mb-0 border border-[#03045E] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:bg-[#ade8f4] cursor-pointer active:scale-95 ${className}`}>
      {children}
    </div>
  );
};

export default ContentCard;
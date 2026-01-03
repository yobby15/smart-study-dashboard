import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const ContentCard = ({ children, className = "" }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const cardStyles = isDarkMode
    ? "bg-gray-800 border-gray-600 shadow-gray-900/50 hover:bg-gray-700 text-gray-100" 
    : "bg-[#90E0EF] border-[#03045E] shadow-md hover:bg-[#ade8f4]"; 

  return (
    <div 
      className={`
        w-full h-auto rounded-xl p-4 mb-3 last:mb-0 border shadow-md 
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 
        cursor-pointer active:scale-95 
        ${cardStyles} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ContentCard;
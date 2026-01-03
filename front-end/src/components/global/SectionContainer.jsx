import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const SectionContainer = ({ title, subtitle, children }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const containerClass = isDarkMode
    ? "bg-[#1f2937] border-gray-700 shadow-black/40" 
    : "bg-[#0077b6] border-[#ADE8F4] shadow-blue-900/20"; 

  const textClass = isDarkMode
    ? "text-gray-100" 
    : "text-[#CAF0F8]";

  const subTextClass = isDarkMode
    ? "text-gray-400"
    : "text-[#CAF0F8]/80";

  return (
    <div className={`${containerClass} rounded-xl px-6 py-4 mx-4 md:mx-6 my-4 shadow-md border`}>
      <div className="flex flex-col">
        <h2 className={`${textClass} font-semibold text-lg md:text-2xl leading-tight transition-colors`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`${subTextClass} text-sm md:text-base mt-0.5 transition-colors`}>
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="mt-3">
        {children} 
      </div>
    </div>
  );
};

export default SectionContainer;
import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const ClassCard = ({ title, percentage }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const titleColor = isDarkMode ? 'text-gray-100' : 'text-[#03045E]';
  
  const progressBg = isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-[#CAF0F8] border-[#03045E]/10';

  const progressFill = isDarkMode ? 'bg-[#0096C7]' : 'bg-[#03045E]';

  return (
    <div className="flex flex-col p-1">
      <h3 className={`font-semibold text-lg ${titleColor}`}>
        {title}
      </h3>

      <div className="relative mt-7 mb-2">
        <div 
          className="absolute -top-7 -translate-x-1/2 bg-white text-[#03045E] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-gray-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-white"
          style={{ left: `${percentage}%` }}
        >
          {percentage}%
        </div>

        <div className={`w-full h-3 rounded-full overflow-hidden border ${progressBg}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${progressFill}`} 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const ScheduleCard = ({ title, time }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  const timeParts = time ? time.split(' - ') : ["", ""];

  // Styling
  const containerClass = isDarkMode 
    ? "bg-gray-700 border-gray-500"
    : "bg-[#90E0EF] border-[#03045E]";

  const headerClass = isDarkMode
    ? "border-gray-500 bg-gray-600 text-white"
    : "border-[#03045E] bg-[#90E0EF] text-[#03045E]";
    
  const bodyClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-[#CAF0F8]/50 text-[#03045E]";

  const dividerClass = isDarkMode ? "bg-gray-400" : "bg-[#03045E]";

  return (
    <div className={`flex flex-col w-28 rounded-xl border-[1.5px] overflow-hidden shadow-sm shrink-0 h-full ${containerClass}`}>
      <div className={`h-12 p-1.5 border-b-[1.5px] flex items-center justify-center ${headerClass}`}>
        <h4 className="text-[10px] font-bold text-center line-clamp-2">
          {title}
        </h4>
      </div>

      <div className={`py-2 flex flex-col items-center justify-center min-h-12.5 ${bodyClass}`}>
        <p className="text-[12px] font-semibold">
            {timeParts[0]}
        </p>
      
        {timeParts[1] && (
            <>
                <div className={`w-3 h-[1.5px] my-0.5 opacity-50 ${dividerClass}`}></div>
                <p className="text-[12px] font-semibold">
                    {timeParts[1]}
                </p>
            </>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
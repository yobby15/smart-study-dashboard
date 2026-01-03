import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const Title = ({ Title, SubTitle, Icon }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const textColor = isDarkMode ? "text-white" : "text-[#03045E]";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-[#03045E] opacity-80";
  
  return (
    <div className="flex flex-row px-10 pt-5 gap-3 items-start transition-colors duration-300">
      {Icon && <Icon className={`size-10 shrink-0 ${textColor}`} />}
      
      <div>
        <h1 className={`text-[28px] font-semibold ${textColor}`}>
          {Title}
        </h1>
        <p className={`font-medium ${subTextColor}`}>
          {SubTitle}
        </p>
      </div>
    </div>
  );
};

export default Title;
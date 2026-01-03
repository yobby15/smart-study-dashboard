import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const CalendarDays = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const days = locale === 'id' 
    ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDarkMode = theme === 'dark';
  const headerClass = isDarkMode ? "bg-gray-700 border-gray-600" : "bg-[#CAF0F8] border-[#03045E]";
  const textClass = isDarkMode ? "text-gray-200" : "text-[#03045E]";
  const borderClass = isDarkMode ? "border-gray-600" : "border-[#03045E]";

  return (
    <div className={`grid grid-cols-7 border-b-2 ${headerClass}`}>
      {days.map((day) => (
        <div key={day} className={`py-2 text-center text-[10px] md:text-xs font-bold border-r last:border-r-0 ${textClass} ${borderClass}`}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
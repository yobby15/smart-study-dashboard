import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';

const CalendarHeader = ({ currentMonthYear, onToday, onPrev, onNext }) => {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const isDarkMode = theme === 'dark';

  const todayText = locale === 'id' ? 'Hari Ini' : 'Today';

  const textClass = isDarkMode ? "text-white" : "text-[#CAF0F8]";
  const buttonClass = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-500"
    : "bg-[#CAF0F8] hover:bg-white text-[#03045E] border-[#03045E]";

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className={`font-bold text-lg md:text-xl uppercase tracking-widest ${textClass}`}>
        {currentMonthYear}
      </h3>
      <div className="flex gap-2">
        <button onClick={onToday} className={`px-3 py-1 rounded-md text-[10px] font-bold border transition-all active:scale-95 ${buttonClass}`}>
          {todayText}
        </button>
        <button onClick={onPrev} className={`px-3 py-1 rounded-md font-bold border transition-all active:scale-95 ${buttonClass}`}>
          &lt;
        </button>
        <button onClick={onNext} className={`px-3 py-1 rounded-md font-bold border transition-all active:scale-95 ${buttonClass}`}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
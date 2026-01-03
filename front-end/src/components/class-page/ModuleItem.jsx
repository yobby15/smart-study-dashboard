import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const ModuleItem = ({ title, status }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const statusContent = {
    id: { completed: 'Selesai', uncompleted: 'Belum', inprogress: 'Proses' },
    en: { completed: 'Completed', uncompleted: 'Uncompleted', inprogress: 'In Progress' }
  };

  const normalizedStatus = status ? status.toLowerCase() : 'uncompleted';
  const displayStatus = statusContent[locale][normalizedStatus] || status;

  const containerClass = isDarkMode
    ? "bg-gray-700 border-gray-500 hover:bg-gray-600"
    : "bg-[#CAF0F8] border-[#03045E] hover:bg-[#AEE4F3]";

  const titleColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";

  const getStatusColor = () => {
    if (normalizedStatus === 'completed') return isDarkMode ? 'text-green-400' : 'text-[#03045E]';
    return isDarkMode ? 'text-gray-400' : 'text-[#03045E]/60';
  };

  return (
    <div className={`flex items-center justify-between w-full p-3 mb-2 border rounded-lg shadow-sm transition-colors ${containerClass}`}>
      <span className={`font-medium text-sm md:text-base ${titleColor}`}>
        {title}
      </span>

      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${getStatusColor()}`}>
        {displayStatus}
      </span>
    </div>
  );
};

export default ModuleItem;
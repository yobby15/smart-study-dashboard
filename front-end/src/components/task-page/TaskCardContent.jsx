import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const TaskCardContent = ({ title, status }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const statusKey = status ? status.toLowerCase() : '';

  const statusLabels = {
    id: {
      completed: 'Selesai',
      'in progress': 'Proses',
      overdue: 'Terlambat'
    },
    en: {
      completed: 'Completed',
      'in progress': 'In Progress',
      overdue: 'Overdue'
    }
  };

  const displayStatus = statusLabels[locale][statusKey] || status;

  const getStatusColor = () => {
    switch (statusKey) {
      case 'completed':
        return isDarkMode ? 'text-blue-400' : 'text-blue-800';
      case 'overdue':
        return isDarkMode ? 'text-red-400' : 'text-red-600';
      case 'in progress':
      default:
        return isDarkMode ? 'text-gray-300' : 'text-[#03045E]';
    }
  };

  const titleColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";

  return (
    <div className="flex justify-between items-center w-full px-1">
      <h3 className={`font-semibold text-base ${titleColor}`}>
        {title}
      </h3>

      <span className={`font-bold text-xs md:text-sm whitespace-nowrap ml-4 capitalize ${getStatusColor()}`}>
        {displayStatus}
      </span>
    </div>
  );
};

export default TaskCardContent;
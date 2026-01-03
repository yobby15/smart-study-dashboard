import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';

const ScheduleItem = ({ title, time, onDelete, onEdit }) => {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  const isDarkMode = theme === 'dark';

  const content = {
    id: { edit: 'Ubah', delete: 'Hapus' },
    en: { edit: 'Edit', delete: 'Delete' }
  };

  const containerClass = isDarkMode
    ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700 shadow-none"
    : "bg-[#CAF0F8]/50 border-[#03045E]/30 hover:bg-[#CAF0F8] shadow-md";

  const titleColor = isDarkMode ? "text-gray-200" : "text-[#03045E]";
  const timeColor = isDarkMode ? "text-gray-400" : "text-[#03045E]";

  const editBtnClass = isDarkMode
    ? "text-gray-400 hover:bg-gray-600 hover:text-white"
    : "text-[#03045E] hover:bg-[#90E0EF]";

  const deleteBtnClass = isDarkMode
    ? "text-red-400 hover:bg-red-900/30"
    : "text-red-500 hover:bg-red-100";

  return (
    <div className={`group rounded-xl p-4 flex justify-between items-center border transition-all duration-300 ${containerClass}`}>
      <div className="flex flex-col">
        <span className={`font-bold text-sm ${titleColor}`}>{title}</span>
        <span className={`text-xs font-semibold ${timeColor}`}>{time}</span>
      </div>
      
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEdit}
          className={`p-2 rounded-lg transition-colors ${editBtnClass}`}
          title={content[locale].edit}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        
        <button 
          onClick={onDelete}
          className={`p-2 rounded-lg transition-colors ${deleteBtnClass}`}
          title={content[locale].delete}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
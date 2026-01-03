import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';

const ScheduleItem = ({ title, time, onDelete, onEdit }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const bgClass = isDarkMode ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700" : "bg-[#CAF0F8]/50 border-[#03045E]/30 hover:bg-[#CAF0F8]";
  const textClass = isDarkMode ? "text-gray-200" : "text-[#03045E]";
  const timeClass = isDarkMode ? "text-gray-400" : "text-[#03045E]";
  const btnHover = isDarkMode ? "text-gray-300 hover:bg-gray-600" : "text-[#03045E] hover:bg-[#90E0EF]";

  return (
    <div className={`group rounded-xl p-4 flex justify-between items-center shadow-md border transition-all ${bgClass}`}>
      <div className="flex flex-col">
        <span className={`font-bold text-sm ${textClass}`}>{title}</span>
        <span className={`text-xs font-semibold ${timeClass}`}>{time}</span>
      </div>
      
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className={`p-2 rounded-lg transition-colors ${btnHover}`} title="Edit">
           ✏️
        </button>
        <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-100/20 rounded-lg transition-colors" title="Delete">
           🗑️
        </button>
      </div>
    </div>
  );
};

const ModalContent = ({ schedules, onEditItem, onDeleteItem }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const emptyText = locale === 'id' ? 'Tidak ada jadwal hari ini' : 'No schedule for today';
  const confirmText = locale === 'id' ? 'Hapus' : 'Delete';

  if (schedules.length === 0) {
    return (
      <div className={`text-center py-10 border-2 border-dashed rounded-xl ${isDarkMode ? 'border-gray-600' : 'border-[#03045E]/20'}`}>
        <p className={`italic ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]/50'}`}>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
      {schedules.map((item) => { 
        const displayTime = item.startTime === "All Day" 
          ? (locale === 'id' ? "Sepanjang Hari" : "All Day")
          : `${item.startTime} - ${item.endTime}`;

        return (
          <ScheduleItem 
            key={item.id} 
            title={item.title} 
            time={displayTime} 
            onDelete={() => {
              if (window.confirm(`${confirmText} "${item.title}"?`)) {
                onDeleteItem(item);
              }
            }}
            onEdit={() => onEditItem(item)} 
          />
        );
      })}
    </div>
  );
};

export default ModalContent;
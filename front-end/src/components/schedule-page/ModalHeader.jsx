import React, { useContext } from 'react';
import { Plus, X } from 'lucide-react'; 
import ThemeContext from '../../contexts/ThemeContext';

const ModalHeader = ({ monthName, year, day, dayName, onClose, onAddClick }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const textColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-[#03045E]/80";
  const iconHover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#CAF0F8]";

  return (
    <div className="relative">
      <button 
        onClick={onAddClick}
        className={`absolute -top-2 right-10 p-2 rounded-full transition-all active:scale-90 z-10 ${textColor} ${iconHover}`}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      <button 
        onClick={onClose} 
        className={`absolute -top-2 -right-2 p-2 hover:text-red-500 transition-all active:scale-90 z-10 ${textColor}`}
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold uppercase tracking-wide ${textColor}`}>{monthName} {year}</h2>
        <p className={`text-5xl font-black my-1 ${textColor}`}>{day}</p>
        <p className={`text-xl font-medium ${subTextColor}`}>{dayName}</p>
      </div>
    </div>
  );
};

export default ModalHeader;
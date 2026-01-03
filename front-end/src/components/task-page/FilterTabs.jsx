import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const FilterTabs = ({ currentFilter, onFilterChange }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const tabs = [
    { key: "All", label: { id: "Semua", en: "All" } },
    { key: "In Progress", label: { id: "Proses", en: "In Progress" } },
    { key: "Completed", label: { id: "Selesai", en: "Completed" } },
    { key: "Overdue", label: { id: "Terlambat", en: "Overdue" } }
  ];

  const baseStyle = "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 border";
  
  const activeStyle = isDarkMode
    ? "bg-blue-600 text-white border-blue-600 shadow-md"
    : "bg-[#03045E] text-white border-[#03045E] shadow-md";

  const inactiveStyle = isDarkMode
    ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
    : "bg-[#90E0EF] text-[#03045E] border-transparent hover:bg-[#00B4D8] hover:text-white";

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {tabs.map((tab) => (
        <button 
          key={tab.key}
          onClick={() => onFilterChange(tab.key)}
          className={`${baseStyle} ${currentFilter === tab.key ? activeStyle : inactiveStyle}`}
        >
          {tab.label[locale]}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
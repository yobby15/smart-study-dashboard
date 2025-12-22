import React from 'react';

const FilterTabs = ({ currentFilter, onFilterChange }) => {
  const tabs = ["All", "In Progress", "Completed", "Overdue"];
  const baseStyle = "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200";
  const activeStyle = "bg-[#03045E] text-white shadow-md"; 
  const inactiveStyle = "bg-[#90E0EF] text-[#03045E] hover:bg-[#00B4D8] hover:text-white";

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button 
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`${baseStyle} ${currentFilter === tab ? activeStyle : inactiveStyle}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
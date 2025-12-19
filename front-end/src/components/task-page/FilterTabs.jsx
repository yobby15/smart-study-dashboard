import React from 'react';

const FilterTabs = () => {
  const buttonStyle = "flex-1 text-xs font-semibold py-1 rounded-lg bg-[#90E0EF] text-[#03045E] hover:bg-[#90E0EF] hover:text-[#03045E]/40 transition duration-300 border border-transparent hover:border-[#03045E]/40";

  return (
    <div className="flex flex-row gap-4 w-lg mt-1">
      <button className={buttonStyle}>
        All
      </button>
        
      <button className={buttonStyle}>
        In Progress
      </button>

      <button className={buttonStyle}>
        Completed
      </button>

      <button className={buttonStyle}>
        Overdue
      </button>
    </div>
  );
};

export default FilterTabs;
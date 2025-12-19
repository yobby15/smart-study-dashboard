import React from 'react';

const statusColors = {
  'Completed': 'text-blue-800', 
  'In Progress': 'text-[#03045E]', 
  'Overdue': 'text-red-600'
};

const TaskCardContent = ({ title, status }) => {
  return (
    <div className="flex justify-between items-center w-full px-1">
      <h3 className="text-[#03045E] font-semibold text-sm md:text-base tracking-tight">
        {title}
      </h3>

      <span className={`font-bold text-xs md:text-sm whitespace-nowrap ml-4 ${statusColors[status] || 'text-[#03045E]'}`}>
        {status}
      </span>
    </div>
  );
};

export default TaskCardContent;
import React from 'react';

const statusColors = {
  'completed': 'text-blue-800', 
  'in progress': 'text-[#03045E]', 
  'overdue': 'text-red-600',
};

const TaskCardContent = ({ title, status }) => {
  const statusKey = status ? status.toLowerCase() : '';
  const textColor = statusColors[status] || statusColors[statusKey] || 'text-[#03045E]';

  return (
    <div className="flex justify-between items-center w-full px-1">
      <h3 className="text-[#03045E] font-semibold text-base">
        {title}
      </h3>

      <span className={`font-bold text-xs md:text-sm whitespace-nowrap ml-4 ${textColor} capitalize`}>
        {status}
      </span>
    </div>
  );
};

export default TaskCardContent;
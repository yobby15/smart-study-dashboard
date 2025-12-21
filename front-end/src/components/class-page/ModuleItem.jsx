import React from 'react';

const ModuleItem = ({ title, status }) => {
  return (
    <div className="flex items-center justify-between w-full p-3 mb-2 bg-[#CAF0F8] border border-[#03045E] rounded-lg shadow-sm hover:bg-[#AEE4F3] transition-colors">
      <span className="text-[#03045E] font-medium text-sm md:text-base">
        {title}
      </span>

      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
        status === 'completed' 
          ? 'text-[#03045E]' 
          : 'text-[#03045E]/60'
      }`}>
        {status}
      </span>
    </div>
  );
};

export default ModuleItem;
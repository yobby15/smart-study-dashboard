import React from 'react';

const ClassCard = ({ title, percentage }) => {

  return (
    <div className="flex flex-col p-1">
      <h3 className="text-[#03045E] font-semibold text-lg">
        {title}
      </h3>

      <div className="relative mt-7 mb-2">
        <div 
          className="absolute -top-7 -translate-x-1/2 bg-white text-[#03045E] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-gray-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-white"
          style={{ left: `${percentage}%` }}
        >
          {percentage}%
        </div>

        <div className="w-full h-3 bg-[#CAF0F8] rounded-full overflow-hidden border border-[#03045E]/10">
          <div 
            className="h-full bg-[#03045E] rounded-full" 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
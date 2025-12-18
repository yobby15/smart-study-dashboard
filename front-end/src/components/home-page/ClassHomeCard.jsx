import React from 'react';

const ClassHomeCard = () => {
  return (
    <div className="flex flex-col p-1">
      <h3 className="font-bold text-xl text-[#03045E]">Class</h3>
      <p className="text-sm text-[#03045E]/80 mt-0">Starting Basic AI</p>

      <div className="relative mt-7 mb-2">
        <div 
          className="absolute -top-7 bg-white text-[#03045E] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-gray-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-white"
          style={{ left: `calc(80% - 18px)` }}
        >
          80%
        </div>

        <div className="w-full h-3 bg-[#CAF0F8] rounded-full overflow-hidden border border-[#03045E]/10">
          <div className="h-full bg-[#03045E] rounded-full" style={{ width: '80%' }} />
        </div>
      </div>
      
      <button className="text-xs text-[#03045E]/60 hover:underline self-start mt-2">
        See More...
      </button>
    </div>
  );
};

export default ClassHomeCard;
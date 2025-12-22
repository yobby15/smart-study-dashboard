import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassHomeCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="p-2 text-center text-[#03045E]/50 text-sm italic">
        No active class enrolled.
      </div>
    );
  }

  const className = data.title || "Unknown Class"; 
  const progress = data.percentage || 0; 
  const currentModule = data.modules?.find(m => m.status === "uncompleted");
  const topic = currentModule ? currentModule.title : "All Modules Completed";

  return (
    <div className="flex flex-col p-1">
      <h3 className="font-bold text-xl text-[#03045E] line-clamp-1">
        {className}
      </h3>

      <p className="text-sm text-[#03045E]/80 mt-0 line-clamp-1">
        {topic}
      </p>

      <div className="relative mt-7 mb-2">
        <div 
          className="absolute -top-7 bg-white text-[#03045E] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-gray-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-white"
          style={{ left: `calc(${progress}% - 18px)` }}
        >
          {progress}%
        </div>

        <div className="w-full h-3 bg-[#CAF0F8] rounded-full overflow-hidden border border-[#03045E]/10">
          <div 
            className="h-full bg-[#03045E] rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      
      <button onClick={() => navigate('/class')} className="text-xs text-[#03045E]/60 hover:underline self-start mt-2">
        See Details...
      </button>
    </div>
  );
};

export default ClassHomeCard;
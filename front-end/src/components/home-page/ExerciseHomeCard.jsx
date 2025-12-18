import React from 'react';

const ExerciseHomeCard = () => {
  return (
    <div className="flex flex-col p-1">
      <h3 className="font-bold text-xl text-[#03045E]">Exercise</h3>
      <p className="text-sm text-[#03045E]/80 mt-0">Soft Skill 1</p>
      
      <div className="flex items-center gap-2 mt-3">
        <p className="text-[13px] text-[#03045E]/70 font-medium italic">In Progress</p>
        <span className="text-sm">⏳</span>
      </div>

      <button className="text-xs text-[#03045E]/60 hover:underline self-start mt-3">
        See More...
      </button>
    </div>
  );
};

export default ExerciseHomeCard;
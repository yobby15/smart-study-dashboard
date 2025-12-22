import React from 'react';

const ScheduleCard = ({ title, time }) => {
  const timeParts = time ? time.split(' - ') : ["", ""];

  return (
    <div className="flex flex-col w-28 bg-[#90E0EF] rounded-xl border-[1.5px] border-[#03045E] overflow-hidden shadow-sm shrink-0 h-full">
      <div className="h-12 p-1.5 border-b-[1.5px] border-[#03045E] flex items-center justify-center bg-[#90E0EF]">
        <h4 className="text-[10px] font-bold text-[#03045E] text-center line-clamp-2">
          {title}
        </h4>
      </div>

      <div className="py-2 flex flex-col items-center justify-center bg-[#CAF0F8]/50 min-h-12.5">
        <p className="text-[12px] font-semibold text-[#03045E]">
            {timeParts[0]}
        </p>
      
        {timeParts[1] && (
            <>
                <div className="w-3 h-[1.5px] bg-[#03045E] my-0.5 opacity-50"></div>
                <p className="text-[12px] font-semibold text-[#03045E]">
                    {timeParts[1]}
                </p>
            </>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
import React, { useState } from 'react';

const AddScheduleSection = ({ onBack, initialData }) => {
  const [task, setTask] = useState(initialData?.title || "");
  const [time, setTime] = useState(initialData?.time || "");

  return (
    <div className="pt-2">
      <button 
        onClick={onBack}
        className="mb-4 text-[#03045E] text-xs font-bold underline hover:text-blue-700 flex items-center"
      >
        ← Back to Schedule
      </button>

      <div className="border-t border-[#03045E]/20 pt-4">
        <div className="space-y-4">
          <div>
            <label className="text-[#03045E] text-xs font-bold ml-2">Time</label>
            <input 
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="00:00 - 00:00"
              className="w-full p-3 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4]"
            />
          </div>

          <div>
            <label className="text-[#03045E] text-xs font-bold ml-2">Activity</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What's your activity?"
              className="w-full h-24 p-3 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4] resize-none"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="bg-[#CAF0F8] border border-[#03045E] px-8 py-2 rounded-xl text-[#03045E] text-sm font-bold shadow-md hover:bg-[#48CAE4]">
            {initialData ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleSection;
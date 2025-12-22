import React, { useState } from 'react';

const AddScheduleSection = ({ onBack, initialData, onSave }) => {
  const [task, setTask] = useState(initialData?.title || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");

  const handleSubmit = () => {
    // Validasi sederhana
    if (!task) return alert("Activity cannot be empty!");
    if (!startTime && startTime !== "All Day") return alert("Start time required!");

    const newItem = {
      title: task,
      startTime: startTime,
      endTime: endTime
    };

    onSave(newItem);
  };

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
            <label className="text-[#03045E] text-xs font-bold ml-2">Time (Start - End)</label>
            <div className="flex items-center gap-2">
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4]"
              />
              <span className="text-[#03045E] font-bold">-</span>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#48CAE4]"
              />
            </div>
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
          <button 
            onClick={handleSubmit}
            className="bg-[#CAF0F8] border border-[#03045E] px-8 py-2 rounded-xl text-[#03045E] text-sm font-bold shadow-md hover:bg-[#48CAE4]"
          >
            {initialData ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleSection;
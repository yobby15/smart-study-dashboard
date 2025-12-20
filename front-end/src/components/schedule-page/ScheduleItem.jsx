import React from 'react';

const ScheduleItem = ({ title, time, onDelete, onEdit }) => (
  <div className="group bg-[#CAF0F8]/50 border border-[#03045E]/30 rounded-xl p-4 flex justify-between items-center shadow-md transition-all hover:bg-[#CAF0F8]">
    <div className="flex flex-col">
      <span className="font-bold text-[#03045E] text-sm">{title}</span>
      <span className="text-[#03045E] text-xs font-semibold">{time}</span>
    </div>
    
    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onClick={onEdit}
        className="p-2 text-[#03045E] hover:bg-[#90E0EF] rounded-lg transition-colors"
        title="Edit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      
      <button 
        onClick={onDelete}
        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
        title="Hapus"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
);

export default ScheduleItem;
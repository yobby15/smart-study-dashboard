import React from 'react';

const CalendarHeader = ({ currentMonthYear, onToday, onPrev, onNext }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-[#CAF0F8] font-bold text-lg md:text-xl uppercase tracking-widest">
      {currentMonthYear}
    </h3>
    <div className="flex gap-2">
      <button onClick={onToday} className="bg-[#CAF0F8] hover:bg-white text-[#03045E] px-3 py-1 rounded-md text-[10px] font-bold border border-[#03045E] transition-all active:scale-95">
        Today
      </button>
      <button onClick={onPrev} className="bg-[#CAF0F8] hover:bg-white text-[#03045E] px-3 py-1 rounded-md font-bold border border-[#03045E] transition-all active:scale-95">
        &lt;
      </button>
      <button onClick={onNext} className="bg-[#CAF0F8] hover:bg-white text-[#03045E] px-3 py-1 rounded-md font-bold border border-[#03045E] transition-all active:scale-95">
        &gt;
      </button>
    </div>
  </div>
);

export default CalendarHeader;
import React, { useState } from 'react';
import DetailModal from './DetailModal'; 

const CalendarGrid = ({ year, month, firstDay, daysInMonth, prevDaysMax, user, schedules, onAddSchedule, onDeleteSchedule, onUpdateUser, onEditSchedule, attendances, onSaveAttendance }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const boxes = [];
  const totalSlots = 42;

  for (let i = firstDay - 1; i >= 0; i--) {
    boxes.push(
      <div key={`prev-${i}`} className="h-20 md:h-24 p-2 border-r border-b border-[#03045E] bg-[#90E0EF]/10 opacity-30 flex flex-col justify-between">
        <span className="font-bold text-[#03045E] text-xs md:text-sm self-end">{prevDaysMax - i}</span>
      </div>
    );
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    boxes.push(
      <div 
        key={`curr-${d}`} 
        onClick={() => setSelectedDay(d)} 
        className={`h-20 md:h-24 p-2 border-r border-b border-[#03045E] flex flex-col justify-between hover:bg-[#48CAE4]/30 transition-all cursor-pointer ${isToday ? 'bg-[#CAF0F8]' : 'bg-[#90E0EF]'}`}
      >
        <span className="font-bold text-[#03045E] text-xs md:text-sm self-end">{d}</span>
        
        <span className="text-[8px] md:text-[10px] text-[#03045E]/60 italic line-clamp-1">
          See Detail...
        </span>
      </div>
    );
  }

  const remaining = totalSlots - boxes.length;
  for (let j = 1; j <= remaining; j++) {
    boxes.push(
      <div key={`next-${j}`} className="h-20 md:h-24 p-2 border-r border-b border-[#03045E] bg-[#90E0EF]/10 opacity-30 flex flex-col justify-between">
        <span className="font-bold text-[#03045E] text-xs md:text-sm self-end">{j}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 border-l border-t border-[#03045E]">
        {boxes}
      </div>

      <DetailModal 
        isOpen={selectedDay !== null} 
        onClose={() => setSelectedDay(null)} 
        day={selectedDay}
        year={year}
        month={month}
        user={user}
        schedules={schedules} 
        attendances={attendances}
        onAddSchedule={onAddSchedule}
        onDeleteSchedule={onDeleteSchedule}
        onUpdateUser={onUpdateUser}
        onEditSchedule={onEditSchedule}
        onSaveAttendance={onSaveAttendance}
      />
    </div>
  );
};

export default CalendarGrid;
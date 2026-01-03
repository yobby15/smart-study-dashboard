import React, { useState, useContext } from 'react';
import DetailModal from './DetailModal'; 
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';

const CalendarGrid = ({ year, month, firstDay, daysInMonth, prevDaysMax, user, schedules, onAddSchedule, onDeleteSchedule, onUpdateUser, onEditSchedule, attendances, onSaveAttendance }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  
  const isDarkMode = theme === 'dark';

  const detailText = locale === 'id' ? 'Lihat Detail...' : 'See Detail...';

  const borderColor = isDarkMode ? "border-gray-600" : "border-[#03045E]";
  const textColor = isDarkMode ? "text-gray-200" : "text-[#03045E]";
  const disabledBg = isDarkMode ? "bg-gray-900/50 opacity-50" : "bg-[#90E0EF]/10 opacity-30";
  
  const activeBg = isDarkMode ? "bg-gray-800" : "bg-[#90E0EF]";
  const todayBg = isDarkMode ? "bg-blue-900/40" : "bg-[#CAF0F8]";
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#48CAE4]/30";

  const boxes = [];
  const totalSlots = 42;

  for (let i = firstDay - 1; i >= 0; i--) {
    boxes.push(
      <div key={`prev-${i}`} className={`h-20 md:h-24 p-2 border-r border-b flex flex-col justify-between ${borderColor} ${disabledBg}`}>
        <span className={`font-bold text-xs md:text-sm self-end ${textColor}`}>{prevDaysMax - i}</span>
      </div>
    );
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEvent = schedules?.some(s => s.date === dateKey);

    boxes.push(
      <div 
        key={`curr-${d}`} 
        onClick={() => setSelectedDay(d)} 
        className={`h-20 md:h-24 p-2 border-r border-b flex flex-col justify-between transition-all cursor-pointer ${borderColor} ${hoverBg} ${isToday ? todayBg : activeBg}`}
      >
        <span className={`font-bold text-xs md:text-sm self-end ${textColor} ${isToday ? 'text-blue-500 scale-110' : ''}`}>{d}</span>
        
        <div className="flex flex-col">
          {hasEvent && <div className={`w-1.5 h-1.5 rounded-full mb-1 self-end ${isDarkMode ? 'bg-blue-400' : 'bg-[#03045E]'}`}></div>}
          <span className={`text-[8px] md:text-[10px] italic line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]/60'}`}>
            {detailText}
          </span>
        </div>
      </div>
    );
  }

  const remaining = totalSlots - boxes.length;
  for (let j = 1; j <= remaining; j++) {
    boxes.push(
      <div key={`next-${j}`} className={`h-20 md:h-24 p-2 border-r border-b flex flex-col justify-between ${borderColor} ${disabledBg}`}>
        <span className={`font-bold text-xs md:text-sm self-end ${textColor}`}>{j}</span>
      </div>
    );
  }

  return (
    <div>
      <div className={`grid grid-cols-7 border-l border-t ${borderColor}`}>
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
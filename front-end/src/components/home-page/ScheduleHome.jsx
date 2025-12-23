import React from 'react';
import SectionContainer from '../global/SectionContainer';
import ScheduleList from './ScheduleList';

const ScheduleHome = ({ user }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const dateSubtitle = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const rawSchedules = Array.isArray(user?.schedules) 
    ? user.schedules.filter(item => item.date === dateKey)
    : [];

  const formattedSchedules = rawSchedules.map(item => {
    let timeString = "";
    
    if (item.startTime === "All Day") {
      timeString = "All Day";
    } else {
      timeString = `${item.startTime} - ${item.endTime}`;
    }

    return {
      id: item.id, 
      title: item.title,
      time: timeString
    };
  });

  return (
    <div>
      <SectionContainer title="My Today's Schedule" subtitle={dateSubtitle}>
        {formattedSchedules.length > 0 ? (
          <ScheduleList data={formattedSchedules}/>
        ) : (
          <div className="p-4 text-center text-[#03045E]/50 text-sm italic border-2 border-dashed border-[#03045E]/20 rounded-xl bg-[#CAF0F8]/50">
            No schedule for today. Rest well! 😴
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default ScheduleHome;
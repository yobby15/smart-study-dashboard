import React, { useState, useEffect } from 'react';
import SectionContainer from '../global/SectionContainer';
import ScheduleList from './ScheduleList';
import { getSchedules } from '../../utils/api';

const ScheduleHome = () => {
  const [todaysSchedules, setTodaysSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const dateSubtitle = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const dateKey = today.toLocaleDateString('sv-SE');

  useEffect(() => {
    async function fetchData() {
      try {
        const { error, data } = await getSchedules();
        
        if (!error) {
          const filtered = data.filter(item => {
            const itemDate = new Date(item.date).toLocaleDateString('sv-SE');
            return itemDate === dateKey;
          });

          const formatted = filtered.map(item => {
            let timeString = "";
            if (item.start_time === "All Day" || item.start_time === "All Day") {
               timeString = "All Day";
            } else {
               timeString = `${item.start_time} - ${item.end_time}`;
            }

            return {
              id: item.id, 
              title: item.title,
              time: timeString
            };
          });

          setTodaysSchedules(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dateKey]);

  return (
    <div>
      <SectionContainer title="My Today's Schedule" subtitle={dateSubtitle}>
        {isLoading ? (
           <div className="p-4 text-center text-[#03045E]/50 text-sm">Loading...</div>
        ) : todaysSchedules.length > 0 ? (
          <ScheduleList data={todaysSchedules}/>
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
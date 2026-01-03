import React, { useState, useEffect, useContext } from 'react';
import SectionContainer from '../global/SectionContainer';
import ScheduleList from './ScheduleList';
import { getSchedules } from '../../utils/api';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const ScheduleHome = () => {
  const [todaysSchedules, setTodaysSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const today = new Date();
  const dateSubtitle = today.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const content = {
    id: {
      title: 'Jadwal Hari Ini',
      loading: 'Memuat jadwal...',
      empty: 'Tidak ada jadwal hari ini. Istirahatlah yang cukup! 😴'
    },
    en: {
      title: "My Today's Schedule",
      loading: 'Loading...',
      empty: 'No schedule for today. Rest well! 😴'
    }
  };

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
            if (item.start_time === "All Day") {
               timeString = locale === 'id' ? "Sepanjang Hari" : "All Day";
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
  }, [dateKey, locale]);

  const emptyStateStyle = isDarkMode
    ? "text-gray-400 border-gray-600 bg-gray-800/50"
    : "text-[#03045E]/50 border-[#03045E]/20 bg-[#CAF0F8]/50";

  return (
    <div>
      <SectionContainer title={content[locale].title} subtitle={dateSubtitle}>
        {isLoading ? (
           <div className={`p-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]/50'}`}>
             {content[locale].loading}
           </div>
        ) : todaysSchedules.length > 0 ? (
          <ScheduleList data={todaysSchedules}/>
        ) : (
          <div className={`p-4 text-center text-sm italic border-2 border-dashed rounded-xl ${emptyStateStyle}`}>
            {content[locale].empty}
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default ScheduleHome;
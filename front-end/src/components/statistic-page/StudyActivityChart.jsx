import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ContentCard from "../global/ContentCard";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const EMPTY_SCHEDULES = [];

const calculateHours = (start, end) => {
    if (!start || !end) return 0;
    if (start === "All Day") return 8; 

    const cleanStart = typeof start === 'string' ? start.split('T').pop() : '';
    const cleanEnd = typeof end === 'string' ? end.split('T').pop() : '';

    if (!cleanStart || !cleanEnd) return 0;

    const [startH, startM] = cleanStart.split(':').map(Number);
    const [endH, endM] = cleanEnd.split(':').map(Number);
    
    if (isNaN(startH) || isNaN(endH)) return 0;

    const startDate = new Date(0, 0, 0, startH, startM || 0);
    const endDate = new Date(0, 0, 0, endH, endM || 0);
    
    let diff = (endDate - startDate) / 1000 / 60 / 60; 
    
    return diff > 0 ? diff : 0;
};

const normalizeDate = (dateInput) => {
    if (!dateInput) return '';
    
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

const StudyActivityChart = ({ user }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const schedules = Array.isArray(user?.schedules) ? user.schedules : EMPTY_SCHEDULES;

  const daysId = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const data = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      
      const dateKey = normalizeDate(d);
      const dayName = locale === 'id' ? daysId[d.getDay()] : daysEn[d.getDay()];

      const dailySchedule = schedules.filter(item => {
          const rawDate = item.date || item.schedule_date || item.created_at;
          // Normalisasi kedua sisi agar perbandingannya akurat
          return normalizeDate(rawDate) === dateKey;
      });
      
      const totalHours = dailySchedule.reduce((acc, item) => {
          const sTime = item.startTime || item.start_time; 
          const eTime = item.endTime || item.end_time;
          
          return acc + calculateHours(sTime, eTime);
      }, 0);

      data.push({
          day: dayName,
          fullDate: dateKey,
          hours: Math.round(totalHours * 10) / 10 
      });
  }

  const content = {
    id: { title: 'Aktivitas Belajar (Jam)', tag: '7 Hari Terakhir' },
    en: { title: 'Study Activity (Hours)', tag: 'Last 7 Days' }
  };
  const text = content[locale];

  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-[#023E8A]';
  const tagBg = theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500';
  const axisColor = theme === 'dark' ? '#9CA3AF' : '#0077B6';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  const tooltipText = theme === 'dark' ? '#F3F4F6' : '#000000';

  return (
    <ContentCard className={`p-4 rounded-xl shadow-sm mb-4 h-full flex flex-col ${cardBg}`}>
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className={`text-xl font-bold ${titleColor}`}>{text.title}</h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${tagBg}`}>
          {text.tag}
        </span>
      </div>

      {/* PERBAIKAN UTAMA: 
         Menambahkan style={{ width: '100%', height: 300 }} 
         Ini memaksa container memiliki dimensi sebelum Recharts dirender.
      */}
      <div style={{ width: '100%', height: 300, minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
                dataKey="day" 
                tick={{fill: axisColor}} 
                axisLine={false} 
                tickLine={false} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  backgroundColor: tooltipBg, 
                  color: tooltipText, 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }} 
              itemStyle={{ color: tooltipText }}
              labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) return payload[0].payload.fullDate;
                  return label;
              }}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 6 ? '#0077B6' : '#90E0EF'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ContentCard>
  );
};

export default StudyActivityChart;
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ContentCard from "../global/ContentCard";

const calculateHours = (start, end) => {
    if (!start || !end) return 0;
    if (start === "All Day") return 8; 

    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    const startDate = new Date(0, 0, 0, startH, startM);
    const endDate = new Date(0, 0, 0, endH, endM);
    
    let diff = (endDate - startDate) / 1000 / 60 / 60; 
    return diff > 0 ? diff : 0;
};

const StudyActivityChart = ({ user }) => {
  const schedules = user?.schedules || {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const data = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      
      const dateKey = d.toISOString().split('T')[0]; 
      const dayName = days[d.getDay()];

      const dailySchedule = schedules[dateKey] || [];
      
      const totalHours = dailySchedule.reduce((acc, item) => {
          return acc + calculateHours(item.startTime, item.endTime);
      }, 0);

      data.push({
          day: dayName,
          fullDate: dateKey,
          hours: Math.round(totalHours * 10) / 10 
      });
  }

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#023E8A]">Study Activity (Hours)</h3>

        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Last 7 Days
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" tick={{fill: '#0077B6'}} axisLine={false} tickLine={false} />

            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
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
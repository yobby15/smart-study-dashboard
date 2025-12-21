import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ContentCard from "../global/ContentCard";

const data = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 1 },
];

const StudyActivityChart = () => {
  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#023E8A]">Study Activity (hours)</h3>

        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          01 - 07 Jan 2026
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" tick={{fill: '#0077B6'}} axisLine={false} tickLine={false} />

            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
            />

            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 5 ? '#0077B6' : '#90E0EF'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ContentCard>
  );
};

export default StudyActivityChart;
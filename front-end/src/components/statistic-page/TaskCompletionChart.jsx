import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ContentCard from "../global/ContentCard";

const data = [
  { name: 'Completed', value: 8 },
  { name: 'In Progress', value: 3 },
  { name: 'Overdue', value: 1 },
];

const COLORS = ['#00B4D8', '#90E0EF', '#03045E'];

const TaskCompletionChart = () => {
  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4">
      <h3 className="text-xl font-bold text-[#023E8A] mb-2">Task and Exercise Status</h3>
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
            <p className="text-2xl font-bold text-[#023E8A]">12</p>
            <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </ContentCard>
  );
};

export default TaskCompletionChart;
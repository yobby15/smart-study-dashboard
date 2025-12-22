import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ContentCard from "../global/ContentCard";

const COLORS = ['#00B4D8', '#90E0EF', '#03045E']; 

const TaskCompletionChart = ({ user }) => {
  const tasks = user?.tasks || [];
  const completedCount = tasks.filter(t => t.status === 'Completed' || t.status === 'Done').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const overdueCount = tasks.filter(t => t.status === 'Overdue').length;

  const data = [
    { name: 'Completed', value: completedCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Overdue', value: overdueCount },
  ];

  const activeData = data.filter(item => item.value > 0);
  const totalTasks = tasks.length;

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4 h-full">
      <h3 className="text-xl font-bold text-[#023E8A] mb-2">Task Status</h3>
      
      {totalTasks === 0 ? (
         <div className="h-64 flex items-center justify-center text-gray-400 italic">
             No tasks available.
         </div>
      ) : (
        <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={activeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                >
                {activeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                        entry.name === 'Completed' ? COLORS[0] :
                        entry.name === 'In Progress' ? COLORS[1] : COLORS[2]
                    } />
                ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                <p className="text-2xl font-bold text-[#023E8A]">{totalTasks}</p>
                <p className="text-xs text-gray-500">Total</p>
            </div>
        </div>
      )}
    </ContentCard>
  );
};

export default TaskCompletionChart;
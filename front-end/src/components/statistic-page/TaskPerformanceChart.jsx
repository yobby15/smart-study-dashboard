import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ContentCard from "../global/ContentCard";

const TaskPerformanceChart = ({ user }) => {
  const tasks = user?.tasks || [];
  const scoredTasks = tasks.filter(t => t.score !== undefined && t.score !== null);

  const chartData = scoredTasks.map((task) => {
    const realScore = task.score;
    
    const shortName = task.title.length > 7 
      ? task.title.substring(0, 7) + ".." 
      : task.title;

    return {
        name: shortName,
        fullName: task.title,
        score: realScore, 
    };
  });

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#023E8A]">Task Scores</h3>
      </div>
      
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 italic">
            No scored tasks found.
        </div>
      ) : (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData} 
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                <XAxis 
                    dataKey="name" 
                    tick={{fill: '#6b7280', fontSize: 10}} 
                    axisLine={false} 
                    tickLine={false}
                    dy={10}
                />

                <YAxis 
                    domain={[0, 100]} 
                    tick={{fill: '#6b7280', fontSize: 12}} 
                    axisLine={false} 
                    tickLine={false} 
                />

                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                            return payload[0].payload.fullName;
                        }
                        return label;
                    }}
                    formatter={(value) => [`${value} pts`, "Score"]}
                />

                <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#0077B6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#023E8A', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#00B4D8' }}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
      )}
    </ContentCard>
  );
};

export default TaskPerformanceChart;
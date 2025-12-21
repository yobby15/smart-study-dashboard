import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ContentCard from "../global/ContentCard";

const data = [
  { quiz: 'Quiz 1', score: 65 },
  { quiz: 'Quiz 2', score: 78 },
  { quiz: 'Quiz 3', score: 75 },
  { quiz: 'Quiz 4', score: 85 },
  { quiz: 'Quiz 5', score: 90 },
  { quiz: 'Quiz 6', score: 88 },
  { quiz: 'Quiz 7', score: 65 },
  { quiz: 'Quiz 8', score: 78 },
  { quiz: 'Quiz 9', score: 75 },
  { quiz: 'Quiz 10', score: 85 },
  { quiz: 'Quiz 11', score: 90 },
  { quiz: 'Quiz 12', score: 88 },
];

const QuizPerformanceChart = () => {
  const recentData = data.slice(-5); 

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#023E8A]">Latest Quiz</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 5 Quiz</span>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={recentData} 
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

            <XAxis 
                dataKey="quiz" 
                tick={{fill: '#6b7280', fontSize: 12}} 
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
    </ContentCard>
  );
};

export default QuizPerformanceChart;
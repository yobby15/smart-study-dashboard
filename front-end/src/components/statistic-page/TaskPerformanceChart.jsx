import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ContentCard from "../global/ContentCard";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const TaskPerformanceChart = ({ user }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

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

  const content = {
    id: { title: 'Nilai Tugas', empty: 'Belum ada tugas yang dinilai.', scoreLabel: 'Nilai' },
    en: { title: 'Task Scores', empty: 'No scored tasks found.', scoreLabel: 'Score' }
  };
  const text = content[locale];

  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-[#023E8A]';
  const emptyColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6b7280';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  const tooltipText = theme === 'dark' ? '#F3F4F6' : '#000000';

  return (
    <ContentCard className={`p-4 rounded-xl shadow-sm mb-4 h-full ${cardBg}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${titleColor}`}>{text.title}</h3>
      </div>
      
      {chartData.length === 0 ? (
        <div className={`h-64 flex items-center justify-center italic ${emptyColor}`}>
            {text.empty}
        </div>
      ) : (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData} 
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />

                <XAxis 
                    dataKey="name" 
                    tick={{fill: axisColor, fontSize: 10}} 
                    axisLine={false} 
                    tickLine={false}
                    dy={10}
                />

                <YAxis 
                    domain={[0, 100]} 
                    tick={{fill: axisColor, fontSize: 12}} 
                    axisLine={false} 
                    tickLine={false} 
                />

                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: tooltipBg, color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: tooltipText }}
                    labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                            return payload[0].payload.fullName;
                        }
                        return label;
                    }}
                    formatter={(value) => [`${value} pts`, text.scoreLabel]}
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
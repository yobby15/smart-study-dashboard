import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ContentCard from "../global/ContentCard";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const COLORS = ['#00B4D8', '#90E0EF', '#03045E']; 

const TaskCompletionChart = ({ user }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const tasks = user?.tasks || [];
  const completedCount = tasks.filter(t => t.status === 'Completed' || t.status === 'Done').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const overdueCount = tasks.filter(t => t.status === 'Overdue').length;

  const data = [
    { name: locale === 'id' ? 'Selesai' : 'Completed', value: completedCount },
    { name: locale === 'id' ? 'Proses' : 'In Progress', value: inProgressCount },
    { name: locale === 'id' ? 'Terlambat' : 'Overdue', value: overdueCount },
  ];

  const activeData = data.filter(item => item.value > 0);
  const totalTasks = tasks.length;

  const content = {
    id: { title: 'Status Tugas', empty: 'Tidak ada tugas tersedia.' },
    en: { title: 'Task Status', empty: 'No tasks available.' }
  };
  const text = content[locale];

  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-[#023E8A]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#023E8A]';
  const emptyColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#FFFFFF';

  return (
    <ContentCard className={`p-4 rounded-xl shadow-sm mb-4 h-full ${cardBg}`}>
      <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{text.title}</h3>
      
      {totalTasks === 0 ? (
         <div className={`h-64 flex items-center justify-center italic ${emptyColor}`}>
             {text.empty}
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px' }} itemStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}/>
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                <p className={`text-2xl font-bold ${textColor}`}>{totalTasks}</p>
                <p className="text-xs text-gray-500">Total</p>
            </div>
        </div>
      )}
    </ContentCard>
  );
};

export default TaskCompletionChart;
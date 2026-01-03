import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const ExerciseHomeCard = ({ data }) => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-[#03045E]/80";

  const content = {
    id: {
      title: 'Tugas Saat Ini',
      empty: 'Tidak ada tugas aktif.',
      details: 'Lihat Detail...',
      status: {
        completed: 'Selesai',
        overdue: 'Terlambat',
        inprogress: 'Sedang Berjalan'
      }
    },
    en: {
      title: 'Current Task',
      empty: 'No active tasks.',
      details: 'See Details...',
      status: {
        completed: 'Completed',
        overdue: 'Overdue',
        inprogress: 'In Progress'
      }
    }
  };

  if (!data) {
    return (
      <div className={`p-2 text-center text-sm italic ${subTextColor}`}>
        {content[locale].empty}
      </div>
    );
  }

  const taskTitle = data.title;
  const rawStatus = data.status || "";
  
  const isDone = rawStatus === "Completed" || rawStatus === "Done";
  const isOverdue = rawStatus === "Overdue";

  let displayStatus = rawStatus;
  if (isDone) displayStatus = content[locale].status.completed;
  else if (isOverdue) displayStatus = content[locale].status.overdue;
  else displayStatus = content[locale].status.inprogress;

  let statusColor = subTextColor; 
  if (isDone) statusColor = "text-green-500";
  if (isOverdue) statusColor = "text-red-500";

  return (
    <div className="flex flex-col p-1">
      <h3 className={`font-bold text-xl ${textColor}`}>{content[locale].title}</h3>

      <p className={`text-sm mt-0 line-clamp-2 min-h-10 ${subTextColor}`}>
        {taskTitle}
      </p>
      
      <div className="flex items-center gap-2 mt-2">
        <p className={`text-[13px] font-medium italic ${statusColor}`}>
          {displayStatus}
        </p>
        <span className="text-sm">
          {isDone ? '✅' : isOverdue ? '⚠️' : '⏳'}
        </span>
      </div>

      <button onClick={() => navigate('/task')} className={`text-xs hover:underline self-start mt-3 ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]/60'}`}>
        {content[locale].details}
      </button>
    </div>
  );
};

export default ExerciseHomeCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExerciseHomeCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="p-2 text-center text-[#03045E]/50 text-sm italic">
        No active tasks.
      </div>
    );
  }

  const taskTitle = data.title;
  const status = data.status;
  
  const isDone = status === "Completed" || status === "Done";
  const isOverdue = status === "Overdue";

  let statusColor = "text-[#03045E]/70"; 
  if (isDone) statusColor = "text-green-600";
  if (isOverdue) statusColor = "text-red-500";

  return (
    <div className="flex flex-col p-1">
      <h3 className="font-bold text-xl text-[#03045E]">Current Task</h3>

      <p className="text-sm text-[#03045E]/80 mt-0 line-clamp-2 min-h-10">
        {taskTitle}
      </p>
      
      <div className="flex items-center gap-2 mt-2">
        <p className={`text-[13px] font-medium italic ${statusColor}`}>
          {status}
        </p>
        <span className="text-sm">
          {isDone ? '✅' : isOverdue ? '⚠️' : '⏳'}
        </span>
      </div>

      <button onClick={() => navigate('/task')} className="text-xs text-[#03045E]/60 hover:underline self-start mt-3">
        See Details...
      </button>
    </div>
  );
};

export default ExerciseHomeCard;
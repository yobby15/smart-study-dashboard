import React from 'react';

const NotesHomeCard = ({ user }) => {
  if (!user) return null;

  const today = new Date();
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`; 

  const notes = [];

  const todayAttendance = Array.isArray(user.attendance)
    ? user.attendance.find(item => item.date === dateKey)
    : null;
  
  if (todayAttendance) {
    notes.push({
      text: `Today's Note: "${todayAttendance.note}"`,
      type: "success" 
    });
  } else {
    notes.push({
      text: "⚠️ You haven't filled attendance today yet!",
      type: "warning" 
    });
  }

  const overdueTasks = user.tasks?.filter(t => t.status === "Overdue");
  if (overdueTasks?.length > 0) {
    notes.push({
      text: `Urgent: You have ${overdueTasks.length} overdue task(s).`,
      type: "danger"
    });
  }

  const inProgressTasks = user.tasks?.filter(t => t.status === "In Progress");
  if ((!overdueTasks || overdueTasks.length === 0) && inProgressTasks?.length > 0) {
    notes.push({
      text: `Reminder: Focus on "${inProgressTasks[0].title}".`,
      type: "info"
    });
  }

  if (notes.length === 0) {
    notes.push({ text: "No pending notifications. Have a great day!", type: "success" });
  }

  return (
    <div className="flex flex-col p-1">
      <ul className="space-y-3">
        {notes.map((note, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[#03045E]">
            <span 
              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                note.type === 'warning' || note.type === 'danger' ? 'bg-red-500' : 'bg-[#03045E]'
              }`} 
            />

            <p className={`leading-tight ${
                 note.type === 'danger' ? 'font-bold text-red-600' : ''
            }`}>
              {note.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesHomeCard;
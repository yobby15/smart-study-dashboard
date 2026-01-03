import React from 'react';

const NotesHomeCard = ({ tasks = [], attendances = [] }) => {
  const today = new Date();
  const dateKey = today.toLocaleDateString('sv-SE');

  const notes = [];

  const todayAttendance = attendances.find(item => {
    const itemDate = new Date(item.date).toLocaleDateString('sv-SE');
    return itemDate === dateKey;
  });
  
  if (todayAttendance) {
    notes.push({
      text: `Today's Note: "${todayAttendance.note || todayAttendance.description || '-'}"`,
      type: "success" 
    });
  } else {
    notes.push({
      text: "⚠️ You haven't filled attendance today yet!",
      type: "warning" 
    });
  }

  const overdueTasks = tasks.filter(t => t.status === "Overdue" || t.status === "overdue");
  if (overdueTasks.length > 0) {
    notes.push({
      text: `Urgent: You have ${overdueTasks.length} overdue task(s).`,
      type: "danger"
    });
  }

  const inProgressTasks = tasks.filter(t => t.status === "In Progress" || t.status === "in progress");
  if ((overdueTasks.length === 0) && inProgressTasks.length > 0) {
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
import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const NotesHomeCard = ({ tasks = [], attendances = [] }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? "text-gray-200" : "text-[#03045E]";

  const today = new Date();
  const dateKey = today.toLocaleDateString('sv-SE');

  const notes = [];

  const todayAttendance = attendances.find(item => {
    const itemDate = new Date(item.date).toLocaleDateString('sv-SE');
    return itemDate === dateKey;
  });

  if (todayAttendance) {
    const noteText = locale === 'id' 
      ? `Catatan Hari Ini: "${todayAttendance.note || todayAttendance.description || '-'}"`
      : `Today's Note: "${todayAttendance.note || todayAttendance.description || '-'}"`;
    
    notes.push({ text: noteText, type: "success" });
  } else {
    const warnText = locale === 'id'
      ? "⚠️ Anda belum mengisi absensi hari ini!"
      : "⚠️ You haven't filled attendance today yet!";
    
    notes.push({ text: warnText, type: "warning" });
  }

  const overdueTasks = tasks.filter(t => t.status === "Overdue" || t.status === "overdue");
  if (overdueTasks.length > 0) {
    const urgentText = locale === 'id'
      ? `Penting: Anda memiliki ${overdueTasks.length} tugas terlambat.`
      : `Urgent: You have ${overdueTasks.length} overdue task(s).`;
      
    notes.push({ text: urgentText, type: "danger" });
  }

  const inProgressTasks = tasks.filter(t => t.status === "In Progress" || t.status === "in progress");
  if ((overdueTasks.length === 0) && inProgressTasks.length > 0) {
    const remindText = locale === 'id'
      ? `Pengingat: Fokus pada "${inProgressTasks[0].title}".`
      : `Reminder: Focus on "${inProgressTasks[0].title}".`;

    notes.push({ text: remindText, type: "info" });
  }

  if (notes.length === 0) {
    const safeText = locale === 'id'
      ? "Tidak ada notifikasi tertunda. Semoga harimu menyenangkan!"
      : "No pending notifications. Have a great day!";
    notes.push({ text: safeText, type: "success" });
  }

  return (
    <div className="flex flex-col p-1">
      <ul className="space-y-3">
        {notes.map((note, index) => (
          <li key={index} className={`flex items-start gap-2 text-sm ${textColor}`}>
            <span 
              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                note.type === 'warning' || note.type === 'danger' ? 'bg-red-500' : (isDarkMode ? 'bg-blue-400' : 'bg-[#03045E]')
              }`} 
            />

            <p className={`leading-tight ${
                 note.type === 'danger' ? 'font-bold text-red-500' : ''
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
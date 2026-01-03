import React, { useState, useEffect, useContext } from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import CalendarTab from '../components/schedule-page/Calendar';
import Title from '../components/global/Title';
import { Calendar } from 'lucide-react';
import { getSchedules, addSchedule, deleteSchedule, updateSchedule, getAttendances, addAttendance } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

const SchedulePage = ({ user }) => {
  const [schedulesList, setSchedulesList] = useState([]);
  const [attendancesList, setAttendancesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const content = {
    id: {
      title: 'Jadwal dan Absensi',
      subtitle: 'Jadwal dan kehadiran Anda selama program',
      loading: 'Memuat kalender...',
      successAdd: 'Jadwal berhasil ditambahkan!',
      failAdd: 'Gagal menambahkan jadwal.',
      successEdit: 'Jadwal berhasil diperbarui!',
      failEdit: 'Gagal memperbarui jadwal.',
      successDel: 'Jadwal berhasil dihapus!',
      failDel: 'Gagal menghapus jadwal.',
      successAtt: 'Absensi berhasil disimpan!',
      failAtt: 'Gagal menyimpan absensi.'
    },
    en: {
      title: 'Schedule and Presence',
      subtitle: 'Your schedule and presence during the program',
      loading: 'Loading calendar...',
      successAdd: 'Schedule added successfully!',
      failAdd: 'Failed to add schedule.',
      successEdit: 'Schedule updated successfully!',
      failEdit: 'Failed to update schedule.',
      successDel: 'Schedule deleted successfully!',
      failDel: 'Failed to delete schedule.',
      successAtt: 'Attendance saved successfully!',
      failAtt: 'Failed to save attendance.'
    }
  };

  async function fetchAllData() {
    try {
      const { error: errSch, data: dataSch } = await getSchedules();
      if (!errSch) {
        const formattedSch = dataSch.map(item => ({
          ...item,
          startTime: item.start_time, 
          endTime: item.end_time,
          date: new Date(item.date).toLocaleDateString('sv-SE')
        }));
        setSchedulesList(formattedSch);
      }

      const { error: errAtt, data: dataAtt } = await getAttendances();
      if (!errAtt) {
        const formattedAtt = dataAtt.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('sv-SE')
        }));
        setAttendancesList(formattedAtt);
      }

    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddSchedule = async (newScheduleData) => {
    const payload = {
      title: newScheduleData.title,
      date: newScheduleData.date, 
      start_time: newScheduleData.startTime, 
      end_time: newScheduleData.endTime      
    };

    const { error } = await addSchedule(payload);

    if (!error) {
      alert(content[locale].successAdd);
      await fetchAllData(); 
      return true;
    } else {
      alert(content[locale].failAdd);
      return false;
    }
  };

  const handleEditSchedule = async (id, updatedData) => {
    const payload = {
      title: updatedData.title,
      date: updatedData.date,
      start_time: updatedData.startTime, 
      end_time: updatedData.endTime
    };

    const { error } = await updateSchedule(id, payload);

    if (!error) {
      alert(content[locale].successEdit);
      await fetchAllData(); 
      return true;
    } else {
      alert(content[locale].failEdit);
      return false;
    }
  };

  const handleDeleteSchedule = async (id) => {
    const { error } = await deleteSchedule(id);

    if (!error) {
      alert(content[locale].successDel);
      await fetchAllData();
    } else {
      alert(content[locale].failDel);
    }
  };

  const handleSaveAttendance = async (attendanceData) => {
    const payload = {
      date: attendanceData.date,
      emoji: attendanceData.emoji,
      note: attendanceData.note,
      timestamp: attendanceData.timestamp
    };

    const { error } = await addAttendance(payload);

    if (!error) {
      alert(content[locale].successAtt);
      await fetchAllData();
      return true;
    } else {
      alert(content[locale].failAtt);
      return false;
    }
  };

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-[#CAF0F8]';

  return (
    <div className={`w-full min-h-screen flex flex-col pb-24 transition-colors duration-300 ${bgClass}`}>
      <NavigationUp user={user} />
      <Title 
        Title={content[locale].title}
        SubTitle={content[locale].subtitle}
        Icon={Calendar}
      />
      <SectionContainer>
        {isLoading ? (
          <div className={`text-center py-10 ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]'}`}>
            {content[locale].loading}
          </div>
        ) : (
          <CalendarTab 
            user={user}
            schedules={schedulesList} 
            attendances={attendancesList}
            onAddSchedule={handleAddSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onEditSchedule={handleEditSchedule} 
            onSaveAttendance={handleSaveAttendance}
          />
        )}
      </SectionContainer>
      <NavigationDown/>
    </div>
  );
};

export default SchedulePage;
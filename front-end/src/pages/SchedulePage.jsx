import React, { useState, useEffect } from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import CalendarTab from '../components/schedule-page/Calendar';
import Title from '../components/global/Title';
import { Calendar } from 'lucide-react';
import { getSchedules, addSchedule, deleteSchedule, updateSchedule, getAttendances, addAttendance } from '../utils/api';

const SchedulePage = ({ user }) => {
  const [schedulesList, setSchedulesList] = useState([]);
  const [attendancesList, setAttendancesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      alert("Jadwal berhasil ditambahkan!");
      await fetchAllData(); 
      return true;
    } else {
      alert("Gagal menambahkan jadwal.");
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
      alert("Jadwal berhasil diperbarui!");
      await fetchAllData(); // Refresh data
      return true;
    } else {
      alert("Gagal memperbarui jadwal.");
      return false;
    }
  };

  const handleDeleteSchedule = async (id) => {
    const { error } = await deleteSchedule(id);

    if (!error) {
      alert("Jadwal berhasil dihapus!");
      await fetchAllData();
    } else {
      alert("Gagal menghapus jadwal.");
    }
  };

  const handleSaveAttendance = async (attendanceData) => {
    const payload = {
      date: attendanceData.date,
      emoji: attendanceData.emoji,
      note: attendanceData.note,
      timestamp: attendanceData.timestamp
    };

    console.log("Mengirim data absensi:", payload);

    const { error } = await addAttendance(payload);

    if (!error) {
      alert("Absensi berhasil disimpan!");
      await fetchAllData();
      return true;
    } else {
      alert("Gagal menyimpan absensi.");
      return false;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user} />
      <Title 
        Title={"Schedule and Presence"}
        SubTitle={"Your schedule and presence during the program"}
        Icon={Calendar}
      />
      <SectionContainer>
        {isLoading ? (
          <div className="text-center py-10 text-[#03045E]">Loading calendar...</div>
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
import React, { useState, useEffect, useContext } from 'react';
import SectionContainer from '../global/SectionContainer';
import ContentCard from '../global/ContentCard';
import ClassHomeCard from './ClassHomeCard';
import ExerciseHomeCard from './ExerciseHomeCard';
import NotesHomeCard from './NotesHomeCard';
import { getClasses, getModules, getTasks, getAttendances } from '../../utils/api';
import LocaleContext from '../../contexts/LocaleContext';

const ProgressHome = () => {
  const [activeClass, setActiveClass] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const [attendancesList, setAttendancesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { locale } = useContext(LocaleContext);

  const content = {
    id: { progress: 'Progres Saya', notes: 'Catatan Saya', loading: 'Memuat dasbor...' },
    en: { progress: 'My Progress', notes: 'My Notes', loading: 'Loading dashboard...' }
  };

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [classRes, moduleRes, taskRes, attRes] = await Promise.all([
          getClasses(),
          getModules(),
          getTasks(),
          getAttendances()
        ]);

        // Logic pengambilan data (sama seperti sebelumnya)
        if (!classRes.error) {
          const classes = classRes.data;
          const modules = !moduleRes.error ? moduleRes.data : [];
          const classesWithModules = classes.map(cls => ({
            ...cls,
            modules: modules.filter(m => m.class_id === cls.id)
          }));
          const foundClass = classesWithModules.find(c => c.percentage < 100) || classesWithModules[0];
          setActiveClass(foundClass);
        }

        if (!taskRes.error) {
          const tasks = taskRes.data;
          setTasksList(tasks);
          const foundTask = tasks.find(t => t.status === "In Progress" || t.status === "in progress") || tasks[0];
          setActiveTask(foundTask);
        }

        if (!attRes.error) {
          setAttendancesList(attRes.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 opacity-50">{content[locale].loading}</div>;
  }

  return (
    <div>
      <SectionContainer title={content[locale].progress}>
        <ContentCard>
          <ClassHomeCard data={activeClass} />
        </ContentCard>

        <ContentCard>
          <ExerciseHomeCard data={activeTask} />
        </ContentCard>
      </SectionContainer>

      <SectionContainer title={content[locale].notes}>
        <ContentCard>
          <NotesHomeCard tasks={tasksList} attendances={attendancesList} />
        </ContentCard>
      </SectionContainer>
    </div>
  );
};

export default ProgressHome;
import React, { useState, useEffect } from 'react';
import SectionContainer from '../global/SectionContainer';
import ContentCard from '../global/ContentCard';
import ClassHomeCard from './ClassHomeCard';
import ExerciseHomeCard from './ExerciseHomeCard';
import NotesHomeCard from './NotesHomeCard';
import { getClasses, getModules, getTasks, getAttendances } from '../../utils/api';

const ProgressHome = () => {
  const [activeClass, setActiveClass] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const [attendancesList, setAttendancesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [classRes, moduleRes, taskRes, attRes] = await Promise.all([
          getClasses(),
          getModules(),
          getTasks(),
          getAttendances()
        ]);

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
    return <div className="text-center py-10 text-[#03045E]">Loading dashboard...</div>;
  }

  return (
    <div>
      <SectionContainer title="My Progress">
        <ContentCard>
          <ClassHomeCard data={activeClass} />
        </ContentCard>

        <ContentCard>
          <ExerciseHomeCard data={activeTask} />
        </ContentCard>
      </SectionContainer>

      <SectionContainer title="My Notes">
        <ContentCard>
          <NotesHomeCard tasks={tasksList} attendances={attendancesList} />
        </ContentCard>
      </SectionContainer>
    </div>
  );
};

export default ProgressHome;
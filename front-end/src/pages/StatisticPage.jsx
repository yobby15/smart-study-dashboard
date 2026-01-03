import React, { useState, useEffect } from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import Title from "../components/global/Title";
import SectionContainer from "../components/global/SectionContainer";
import StudyActivityChart from "../components/statistic-page/StudyActivityChart";
import TaskCompletionChart from "../components/statistic-page/TaskCompletionChart";
import OverallProgress from "../components/statistic-page/OverallProgress";
import TaskPerformanceChart from "../components/statistic-page/TaskPerformanceChart";
import { BarChart2 } from 'lucide-react';
import { getUserLogged, getTasks, getClasses, getAttendances } from '../utils/api';

const StatisticPage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStatisticData() {
      try {
        const [userRes, taskRes, classRes, attRes] = await Promise.all([
          getUserLogged(),
          getTasks(),
          getClasses(),
          getAttendances()
        ]);

        const combinedData = {
          name: !userRes.error ? userRes.data.name : 'User',
          tasks: !taskRes.error ? taskRes.data : [],
          classes: !classRes.error ? classRes.data : [],
          attendance: !attRes.error ? attRes.data : [],
        };

        setUserData(combinedData);

      } catch (err) {
        console.error("Gagal mengambil data statistik:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatisticData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
        <NavigationUp user={{ name: 'Loading...' }} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#03045E] animate-pulse">Loading statistics...</p>
        </div>
        <NavigationDown/>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={userData} />

      <Title 
        Title={"Statistic"}
        SubTitle={`Progress for ${userData?.name || 'User'}`}
        Icon={BarChart2}
      />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <div className="col-span-1 md:col-span-2">
            <SectionContainer>
              <StudyActivityChart user={userData} />
            </SectionContainer>
          </div>

          <div className="col-span-1">
            <SectionContainer>
              <TaskCompletionChart user={userData} />
            </SectionContainer>
          </div>

          <div className="col-span-1">
            <SectionContainer>
              <OverallProgress user={userData} />
            </SectionContainer>
          </div>

          <div className="col-span-1 md:col-span-2">
            <SectionContainer>
              <TaskPerformanceChart user={userData} />
            </SectionContainer>
          </div>
          
        </div>

      <NavigationDown/>
    </div>
  );
};

export default StatisticPage;
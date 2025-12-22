import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import Title from "../components/global/Title";
import SectionContainer from "../components/global/SectionContainer";
import StudyActivityChart from "../components/statistic-page/StudyActivityChart";
import TaskCompletionChart from "../components/statistic-page/TaskCompletionChart";
import OverallProgress from "../components/statistic-page/OverallProgress";
import TaskPerformanceChart from "../components/statistic-page/TaskPerformanceChart";
import { BarChart2 } from 'lucide-react';

const StatisticPage = ({ user }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user} />

      <Title 
        Title={"Statistic"}
        SubTitle={`Progress for ${user?.name || 'User'}`}
        Icon={BarChart2}
      />
        <div className="grid grid-cols-2 gap-4">
          <SectionContainer>
            <div className="col-span-1 md:col-span-2">
              <StudyActivityChart user={user} />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <TaskCompletionChart user={user} />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <OverallProgress user={user} />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <TaskPerformanceChart user={user} />
            </div>
          </SectionContainer>
        </div>
      <NavigationDown/>
    </div>
  );
};

export default StatisticPage;
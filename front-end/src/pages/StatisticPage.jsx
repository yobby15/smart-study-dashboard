import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import Title from "../components/global/Title";
import SectionContainer from "../components/global/SectionContainer";
import StudyActivityChart from "../components/statistic-page/StudyActivityChart";
import TaskCompletionChart from "../components/statistic-page/TaskCompletionChart";
import OverallProgress from "../components/statistic-page/OverallProgress";
import QuizPerformanceChart from "../components/statistic-page/QuizPerformanceChart";
import { BarChart2 } from 'lucide-react';

const StatisticPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp/>

      <Title 
        Title={"Statistic"}
        SubTitle={"Your statistic during the program"}
        Icon={BarChart2}
      />


        <div className="grid grid-cols-2 gap-4">
          <SectionContainer>
            <div className="col-span-1 md:col-span-2">
              <StudyActivityChart />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <TaskCompletionChart />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <OverallProgress />
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="col-span-1">
              <QuizPerformanceChart />
            </div>
          </SectionContainer>
        </div>
      
      <NavigationDown/>
    </div>
  );
};

export default StatisticPage;
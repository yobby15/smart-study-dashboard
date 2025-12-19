import React from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";  
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import ActivityTabs from '../components/task-page/ActivityTabs';
import { Notebook } from 'lucide-react';
import TaskCardContent from "../components/task-page/TaskCardContent";

const TaskPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp/>
      <Title 
        Title={"Task and Exercise"}
        SubTitle={"Your task and exercise during the program"}
        Icon={Notebook}
      />
      <ActivityTabs/>
      <SectionContainer>
        <ContentCard>
          <TaskCardContent title="Submission 1 Starting Basic AI" status="In Progress" />
        </ContentCard>

        <ContentCard>
          <TaskCardContent title="Quiz 1: Logic Gate" status="Completed" />
        </ContentCard>

        <ContentCard>
          <TaskCardContent title="Final Project" status="Overdue" />
        </ContentCard>
      </SectionContainer>
      <NavigationDown/>
    </div>
  );
};

export default TaskPage;
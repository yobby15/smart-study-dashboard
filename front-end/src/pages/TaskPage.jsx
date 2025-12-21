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
  const taskList = [
    { id: 1, title: "Submission 1 Starting Basic AI", status: "In Progress" },
    { id: 2, title: "Quiz 1: Logic Gate", status: "Completed" },
    { id: 3, title: "Final Project", status: "Overdue" },
  ];

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
        {taskList.map((item) => (
          <ContentCard key={item.id}>
            <TaskCardContent 
              title={item.title} 
              status={item.status} 
            />
          </ContentCard>
        ))}
      </SectionContainer>
      <NavigationDown/>
    </div>
  );
};

export default TaskPage;
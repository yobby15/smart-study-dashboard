import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";  
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { Notebook } from 'lucide-react';
import TaskCardContent from "../components/task-page/TaskCardContent";
import ActivityTabs from '../components/task-page/ActivityTabs'; 

const TaskPage = ({ user }) => {
  const taskList = user?.tasks || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredTasks = taskList.filter((task) => {
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user}/>

      <Title 
        Title={"Task and Exercise"}
        SubTitle={"Your task and exercise during the program"}
        Icon={Notebook}
      />

      <ActivityTabs 
        currentFilter={filterStatus}
        onFilterChange={setFilterStatus}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <SectionContainer>
        {taskList.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No tasks available for this user.
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No tasks match your search or filter.
          </div>
        ) : (
          filteredTasks.map((item) => (
            <ContentCard key={item.id}>
              <TaskCardContent 
                title={item.title} 
                status={item.status} 
              />
            </ContentCard>
          ))
        )}
      </SectionContainer>
      
      <NavigationDown/>
    </div>
  );
};

TaskPage.propTypes = {
  user: PropTypes.shape({
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        status: PropTypes.string
      })
    )
  })
};

export default TaskPage;
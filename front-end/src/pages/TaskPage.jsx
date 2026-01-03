import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";  
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { Notebook } from 'lucide-react';
import TaskCardContent from "../components/task-page/TaskCardContent";
import ActivityTabs from '../components/task-page/ActivityTabs'; 
import { getTasks } from '../utils/api';

const TaskPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    async function fetchTasksData() {
      try {
        const { error, data } = await getTasks();
        if (!error) {
          setTasks(data);
        }
      } catch (err) {
        console.error("Gagal mengambil tasks:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasksData();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const taskStatus = task.status ? task.status.toLowerCase() : "";
    const filter = filterStatus.toLowerCase();

    const matchesStatus = filter === "all" || taskStatus === filter;
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
        {isLoading ? (
           <div className="text-center text-[#03045E] mt-10">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-[#03045E] mt-10">
            No tasks available.
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-[#03045E] mt-10">
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
  user: PropTypes.object,
};

export default TaskPage;
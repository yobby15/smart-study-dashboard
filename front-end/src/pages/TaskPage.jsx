import React, { useState, useEffect, useContext } from 'react';
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
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

const TaskPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const content = {
    id: {
      title: 'Tugas dan Latihan',
      subtitle: 'Tugas dan latihan Anda selama program berlangsung',
      loading: 'Memuat tugas...',
      empty: 'Tidak ada tugas tersedia.',
      noMatch: 'Tidak ada tugas yang cocok dengan pencarian atau filter.',
    },
    en: {
      title: 'Task and Exercise',
      subtitle: 'Your task and exercise during the program',
      loading: 'Loading tasks...',
      empty: 'No tasks available.',
      noMatch: 'No tasks match your search or filter.',
    }
  };

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

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-[#CAF0F8]';
  const textInfoClass = isDarkMode ? 'text-gray-400' : 'text-[#03045E]';

  return (
    <div className={`w-full min-h-screen flex flex-col pb-24 transition-colors duration-300 ${bgClass}`}>
      <NavigationUp user={user}/>

      <Title 
        Title={content[locale].title}
        SubTitle={content[locale].subtitle}
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
           <div className={`text-center mt-10 ${textInfoClass}`}>{content[locale].loading}</div>
        ) : tasks.length === 0 ? (
          <div className={`text-center mt-10 ${textInfoClass}`}>
            {content[locale].empty}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className={`text-center mt-10 ${textInfoClass}`}>
            {content[locale].noMatch}
          </div>
        ) : (
          filteredTasks.map((item) => (
            <ContentCard key={item.id}>
              <TaskCardContent 
                title={item.title} 
                status={item.status} 
                url={item.url || "https://www.dicoding.com"}
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
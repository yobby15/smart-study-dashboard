import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { BookOpen } from 'lucide-react';
import ClassCard from '../components/class-page/ClassCard'; 
import DetailClass from "../components/class-page/DetailClass";
import { getClasses } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

const ClassPage = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const content = {
    id: {
      title: 'Kelas',
      subtitle: 'Kelas Anda selama program berlangsung',
      loading: 'Memuat kelas...',
      empty: 'Tidak ada kelas yang tersedia.'
    },
    en: {
      title: 'Class',
      subtitle: 'Your class during the program',
      loading: 'Loading classes...',
      empty: 'No classes available.'
    }
  };

  useEffect(() => {
    async function fetchClassesData() {
      try {
        const { error, data } = await getClasses();

        if (!error) {
          setClasses(data); 
        }
      } catch (error) {
        console.error("Gagal mengambil data kelas:", error);
      } finally {
        setIsLoading(false); 
      }
    }

    fetchClassesData();
  }, []);

  const handleClassClick = (item) => {
    setSelectedClass(item);
  };

  const handleCloseDetail = () => { 
    setSelectedClass(null);
  };

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-[#CAF0F8]';
  const textInfoClass = isDarkMode ? 'text-gray-400' : 'text-[#03045E]/70';

  return (
    <div className={`w-full min-h-screen flex flex-col pb-24 transition-colors duration-300 ${bgClass}`}>
      <NavigationUp user={user} />

      <Title 
        Title={content[locale].title}
        SubTitle={content[locale].subtitle}
        Icon={BookOpen}
      />

      <SectionContainer>
        {isLoading ? (
          <div className={`text-center mt-10 ${textInfoClass}`}>{content[locale].loading}</div>
        ) : classes.length === 0 ? (
          <div className={`text-center mt-10 ${textInfoClass}`}>
            {content[locale].empty}
          </div>
        ) : (
          classes.map((item) => (
            <ContentCard key={item.id}>
              <div onClick={() => handleClassClick(item)}>
                <ClassCard 
                  title={item.title} 
                  percentage={item.percentage} 
                />
              </div>
            </ContentCard>
          ))
        )}
      </SectionContainer>

      <DetailClass 
        isOpen={selectedClass !== null} 
        onClose={handleCloseDetail}
        data={selectedClass} 
      />

      <NavigationDown />
    </div>
  );
};

ClassPage.propTypes = {
  user: PropTypes.object,
};

export default ClassPage;
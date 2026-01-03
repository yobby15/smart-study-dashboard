import React, { useState, useEffect } from 'react';
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

const ClassPage = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

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

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp user={user} />

      <Title 
        Title={"Class"}
        SubTitle={"Your class during the program"}
        Icon={BookOpen}
      />

      <SectionContainer>
        {isLoading ? (
          <div className="text-center text-[#CAF0F8] mt-10">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="text-center text-[#CAF0F8] mt-10">
            No classes available.
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
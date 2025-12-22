import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { BookOpen } from 'lucide-react';
import ClassCard from '../components/class-page/ClassCard'; 
import DetailClass from "../components/class-page/DetailClass";

const ClassPage = ({ user }) => {
  const classList = user?.classes || [];

  const [selectedClass, setSelectedClass] = useState(null);

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
        {classList.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No classes available for this user.
          </div>
        ) : (
          classList.map((item) => (
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
  user: PropTypes.shape({
    classes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        percentage: PropTypes.number.isRequired,
        modules: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            status: PropTypes.string
          })
        )
      })
    )
  })
};

export default ClassPage;
import React, { useState } from 'react';
import NavigationUp from "../components/global/NavigationUp";
import NavigationDown from "../components/global/NavigationDown";
import SectionContainer from "../components/global/SectionContainer";
import ContentCard from "../components/global/ContentCard";
import Title from '../components/global/Title';
import { BookOpen } from 'lucide-react';
import ClassCard from '../components/class-page/ClassCard'; 
import DetailClass from "../components/class-page/DetailClass";
import { CLASS_LIST } from '../data/users';

const ClassPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (item) => {
    setSelectedClass(item);
  };

  const handleCloseDetail = () => { 
    setSelectedClass(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#CAF0F8] pb-24">
      <NavigationUp />
      <Title 
        Title={"Class"}
        SubTitle={"Your class during the program"}
        Icon={BookOpen}
      />
      <SectionContainer>
        {CLASS_LIST.map((item) => (
          <ContentCard key={item.id}>
            <div onClick={() => handleClassClick(item)}>
              <ClassCard 
              title={item.title} 
              percentage={item.percentage} 
              />
            </div>
            
          </ContentCard>
        ))}
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

export default ClassPage;
import React from 'react';
import SectionContainer from '../global/SectionContainer';
import ContentCard from '../global/ContentCard';
import ClassHomeCard from './ClassHomeCard';
import ExerciseHomeCard from './ExerciseHomeCard';
import NotesHomeCard from './NotesHomeCard';

const ProgressHome = () => {

  return (
    <div>
      <SectionContainer title="My Progress">
        <ContentCard>
          <ClassHomeCard/>
        </ContentCard>

        <ContentCard>
          <ExerciseHomeCard/>
        </ContentCard>
      </SectionContainer>

      <SectionContainer title="My Notes">
        <ContentCard>
          <NotesHomeCard/>
        </ContentCard>
      </SectionContainer>
    </div>
  );
};

export default ProgressHome;
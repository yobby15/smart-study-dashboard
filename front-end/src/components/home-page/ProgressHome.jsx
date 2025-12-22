import React from 'react';
import SectionContainer from '../global/SectionContainer';
import ContentCard from '../global/ContentCard';
import ClassHomeCard from './ClassHomeCard';
import ExerciseHomeCard from './ExerciseHomeCard';
import NotesHomeCard from './NotesHomeCard';

const ProgressHome = ({ user }) => {
  const activeClass = user?.classes?.find(c => c.percentage < 100) || user?.classes?.[0];
  const activeTask = user?.tasks?.find(t => t.status === "In Progress") || user?.tasks?.[0];

  return (
    <div>
      <SectionContainer title="My Progress">
        <ContentCard>
          <ClassHomeCard data={activeClass} />
        </ContentCard>

        <ContentCard>
          <ExerciseHomeCard data={activeTask} />
        </ContentCard>
      </SectionContainer>

      <SectionContainer title="My Notes">
        <ContentCard>
          <NotesHomeCard user={user} />
        </ContentCard>
      </SectionContainer>
    </div>
  );
};

export default ProgressHome;
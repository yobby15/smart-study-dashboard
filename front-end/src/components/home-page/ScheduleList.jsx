import ScheduleCard from './ScheduleCard';

const ScheduleList = ({ data }) => {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
      {data.map((item, index) => (
        <ScheduleCard 
          key={index} 
          title={item.title} 
          time={item.time} 
        />
      ))}
    </div>
  );
};

export default ScheduleList;
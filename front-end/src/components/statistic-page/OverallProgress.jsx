import React from 'react';
import ContentCard from "../global/ContentCard";

const COLORS = ["bg-[#03045E]", "bg-[#0077B6]", "bg-[#00B4D8]", "bg-[#90E0EF]"];

const OverallProgress = ({ user }) => {
  const classes = user?.classes || [];
  const limitedClasses = classes.slice(0, 5);

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm h-full">
      <h3 className="text-xl font-bold text-[#023E8A] mb-4">Class Progress</h3>
      
      {classes.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-10">No classes enrolled.</p>
      ) : (
        <div className="space-y-4">
          {limitedClasses.map((item, index) => (
              <div key={index}>
                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                      <span className="truncate w-3/4">{item.title}</span>
                      <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#CAF0F8] rounded-full h-3">
                      <div 
                          className={`${COLORS[index % COLORS.length]} h-3 rounded-full transition-all duration-500`} 
                          style={{ width: `${item.percentage}%` }}
                      ></div>
                  </div>
              </div>
          ))}
        </div>
      )}

      {classes.length > 5 && (
          <p className="text-xs text-center text-gray-500 mt-4 italic">
              And {classes.length - 5} more classes...
          </p>
      )}
    </ContentCard>
  );
};

export default OverallProgress;
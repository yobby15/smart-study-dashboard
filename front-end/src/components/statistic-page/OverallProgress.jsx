import React from 'react';
import ContentCard from "../global/ContentCard";

const subjects = [
    { name: "React Basics", progress: 80, color: "bg-[#03045E]" },
    { name: "JS Advanced", progress: 45, color: "bg-[#0077B6]" },
    { name: "UI/UX", progress: 100, color: "bg-[#00B4D8]" },
    { name: "Backend Node.js", progress: 20, color: "bg-[#03045E]" }, 
    { name: "Database SQL", progress: 60, color: "bg-[#0077B6]" }, 
    { name: "DevOps Basics", progress: 10, color: "bg-[#00B4D8]" },
    { name: "Cyber Security", progress: 5, color: "bg-[#03045E]" },
];

const OverallProgress = () => {
  const limitedSubjects = subjects.slice(0, 5);

  return (
    <ContentCard className="p-4 bg-white rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-[#023E8A] mb-4">Class Progress Summary</h3>
      <div className="space-y-4">
        {limitedSubjects.map((sub, index) => (
            <div key={index}>
                <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>{sub.name}</span>
                    <span>{sub.progress}%</span>
                </div>
                <div className="w-full bg-[#CAF0F8] rounded-full h-3">
                    <div 
                        className={`${sub.color} h-3 rounded-full transition-all duration-500`} 
                        style={{ width: `${sub.progress}%` }}
                    ></div>
                </div>
            </div>
        ))}
      </div>
      {subjects.length > 5 && (
          <p className="text-xs text-center text-gray-500 mt-4 italic">
              And {subjects.length - 5} more classes...
          </p>
      )}
    </ContentCard>
  );
};

export default OverallProgress;
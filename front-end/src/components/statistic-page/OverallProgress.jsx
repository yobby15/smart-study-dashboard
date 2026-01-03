import React, { useContext } from 'react';
import ContentCard from "../global/ContentCard";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const COLORS = ["bg-[#03045E]", "bg-[#0077B6]", "bg-[#00B4D8]", "bg-[#90E0EF]"];

const OverallProgress = ({ user }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  
  const classes = user?.classes || [];
  const limitedClasses = classes.slice(0, 5);

  const content = {
    id: {
      title: 'Progres Kelas',
      empty: 'Belum ada kelas yang diikuti.',
      more: 'Dan',
      moreSuffix: 'kelas lainnya...'
    },
    en: {
      title: 'Class Progress',
      empty: 'No classes enrolled.',
      more: 'And',
      moreSuffix: 'more classes...'
    }
  };

  const text = content[locale];

  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-[#023E8A]';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const emptyColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const barBg = theme === 'dark' ? 'bg-gray-700' : 'bg-[#CAF0F8]';

  return (
    <ContentCard className={`p-4 rounded-xl shadow-sm h-full ${cardBg}`}>
      <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>{text.title}</h3>
      
      {classes.length === 0 ? (
        <p className={`text-sm italic text-center py-10 ${emptyColor}`}>{text.empty}</p>
      ) : (
        <div className="space-y-4">
          {limitedClasses.map((item, index) => (
              <div key={index}>
                  <div className={`flex justify-between text-sm font-semibold mb-1 ${textColor}`}>
                      <span className="truncate w-3/4">{item.title}</span>
                      <span>{item.percentage}%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${barBg}`}>
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
          <p className={`text-xs text-center mt-4 italic ${emptyColor}`}>
              {text.more} {classes.length - 5} {text.moreSuffix}
          </p>
      )}
    </ContentCard>
  );
};

export default OverallProgress;
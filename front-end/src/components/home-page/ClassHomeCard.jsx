import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const ClassHomeCard = ({ data }) => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? "text-gray-100" : "text-[#03045E]";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-[#03045E]/80";

  const content = {
    id: {
      empty: 'Belum ada kelas aktif.',
      unknown: 'Kelas Tidak Diketahui',
      completed: 'Semua Modul Selesai',
      details: 'Lihat Detail...'
    },
    en: {
      empty: 'No active class enrolled.',
      unknown: 'Unknown Class',
      completed: 'All Modules Completed',
      details: 'See Details...'
    }
  };

  if (!data) {
    return (
      <div className={`p-2 text-center text-sm italic ${subTextColor}`}>
        {content[locale].empty}
      </div>
    );
  }

  const className = data.title || content[locale].unknown; 
  const progress = data.percentage || 0; 
  const currentModule = data.modules?.find(m => m.status === "uncompleted");
  const topic = currentModule ? currentModule.title : content[locale].completed;

  return (
    <div className="flex flex-col p-1">
      <h3 className={`font-bold text-xl line-clamp-1 ${textColor}`}>
        {className}
      </h3>

      <p className={`text-sm mt-0 line-clamp-1 ${subTextColor}`}>
        {topic}
      </p>

      <div className="relative mt-7 mb-2">
        <div 
          className="absolute -top-7 bg-white text-[#03045E] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-gray-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-white"
          style={{ left: `calc(${progress}% - 18px)` }}
        >
          {progress}%
        </div>

        <div className={`w-full h-3 rounded-full overflow-hidden border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-[#CAF0F8] border-[#03045E]/10'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${isDarkMode ? 'bg-[#0096C7]' : 'bg-[#03045E]'}`}
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      
      <button onClick={() => navigate('/class')} className={`text-xs hover:underline self-start mt-2 ${isDarkMode ? 'text-gray-400' : 'text-[#03045E]/60'}`}>
        {content[locale].details}
      </button>
    </div>
  );
};

export default ClassHomeCard;
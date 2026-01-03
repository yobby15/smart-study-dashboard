import React, { useState, useEffect, useContext } from 'react';
import ClassCard from "./ClassCard";
import ModuleItem from "./ModuleItem";
import { getModules } from "../../utils/api";
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';

const DetailClass = ({ isOpen, onClose, data }) => {
  const [modulesList, setModulesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const content = {
    id: { loading: 'Memuat modul...', empty: 'Tidak ada modul tersedia.', loadingData: 'Memuat data kelas...' },
    en: { loading: 'Loading modules...', empty: 'No modules available.', loadingData: 'Loading class data...' }
  };

  useEffect(() => {
    async function fetchModules() {
      if (isOpen && data) {
        setIsLoading(true);
        const { error, data: allModules } = await getModules();

        if (!error) {
          const filteredModules = allModules.filter(
            (modul) => modul.class_id === String(data.id) || modul.class_id === data.id
          );
          setModulesList(filteredModules);
        } else {
          setModulesList([]);
        }
        setIsLoading(false);
      }
    }

    fetchModules();
  }, [isOpen, data]); 

  const handleClose = () => {
    onClose();
    setModulesList([]); 
  }

  const modalBg = isDarkMode 
    ? "bg-gray-800 border-gray-600 shadow-black/50" 
    : "bg-[#90E0EF] border-[#03045E] shadow-2xl";
  
  const textColor = isDarkMode ? "text-gray-300" : "text-[#03045E]";

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible bg-black/60 backdrop-blur-sm' : 'opacity-0 invisible'}`} 
      onClick={handleClose}
    >
      <div 
        className={`rounded-[20px] p-6 w-full max-w-4xl border-2 relative flex flex-col max-h-[90vh] transition-all duration-300 transform ${modalBg} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div className="flex flex-col h-full">
            <div className="mb-6 shrink-0">
               <ClassCard 
                  title={data.title} 
                  percentage={data.percentage} 
               />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col gap-2">
                {isLoading ? (
                   <p className={`text-center py-4 ${textColor}`}>{content[locale].loading}</p>
                ) : modulesList.length > 0 ? (
                  modulesList.map((modul) => (
                    <ModuleItem 
                      key={modul.id}
                      title={modul.title}
                      status={modul.status}
                    />
                  ))
                ) : (
                  <p className={`text-center ${textColor}`}>{content[locale].empty}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={`text-center py-10 ${textColor}`}>{content[locale].loadingData}</div>
        )}

      </div>
    </div>
  );
};

export default DetailClass;
import React from 'react';
import ClassCard from "./ClassCard";
import ModuleItem from "./ModuleItem";

const DetailClass = ({ isOpen, onClose, data }) => {
  const handleClose = () => {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible bg-black/40 backdrop-blur-sm' : 'opacity-0 invisible'}`} 
      onClick={handleClose}
    >
      <div 
        className={`bg-[#90E0EF] rounded-[20px] shadow-2xl p-6 w-full max-w-4xl border-2 border-[#03045E] relative flex flex-col max-h-[90vh] transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div>
            <div className="mb-6">
               <ClassCard 
                  title={data.title} 
                  percentage={data.percentage} 
               />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col gap-2">
                {data.modules && data.modules.length > 0 ? (
                  data.modules.map((modul) => (
                    <ModuleItem 
                      key={modul.id}
                      title={modul.title}
                      status={modul.status}
                    />
                  ))
                ) : (
                  <p className="text-center text-[#03045E]">No modules available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-[#03045E]">Loading data...</div>
        )}

      </div>
    </div>
  );
};

export default DetailClass;
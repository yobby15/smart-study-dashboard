import React from 'react';
import { Plus, X } from 'lucide-react'; 

const ModalHeader = ({ monthName, year, day, dayName, onClose, onAddClick }) => (
  <div className="relative">
    <button 
      onClick={onAddClick}
      className="absolute -top-2 right-10 p-2 text-[#03045E] hover:bg-[#CAF0F8] rounded-full transition-all active:scale-90 z-10"
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>

    <button 
      onClick={onClose} 
      className="absolute -top-2 -right-2 p-2 text-[#03045E] hover:text-red-500 transition-all active:scale-90 z-10"
    >
      <X size={24} strokeWidth={2.5} />
    </button>

    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-[#03045E] uppercase tracking-wide">{monthName} {year}</h2>
      <p className="text-5xl font-black my-1 text-[#03045E]">{day}</p>
      <p className="text-xl font-medium text-[#03045E]/80">{dayName}</p>
    </div>
  </div>
);

export default ModalHeader;
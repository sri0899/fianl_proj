
import React from 'react';
import { Scheme, Language } from '../types';

interface SchemeCardProps {
  scheme: Scheme;
  language: Language;
  onClick: () => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, language, onClick }) => {
  // Fix: Added support for Hindi (hi) language selection for name and description
  const name = language === 'en' ? scheme.nameEn : language === 'ta' ? scheme.nameTa : scheme.nameHi;
  const description = language === 'en' ? scheme.descriptionEn : language === 'ta' ? scheme.descriptionTa : scheme.descriptionHi;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full">
          {scheme.category}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
        {name}
      </h3>
      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default SchemeCard;

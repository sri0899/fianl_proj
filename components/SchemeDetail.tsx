
import React from 'react';
import { Scheme, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface SchemeDetailProps {
  scheme: Scheme;
  language: Language;
  onBack: () => void;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ scheme, language, onBack }) => {
  const strings = UI_STRINGS[language];
  
  // Fix: Added support for Hindi (hi) language selection for name, description, and list fields
  const content = {
    name: language === 'en' ? scheme.nameEn : language === 'ta' ? scheme.nameTa : scheme.nameHi,
    description: language === 'en' ? scheme.descriptionEn : language === 'ta' ? scheme.descriptionTa : scheme.descriptionHi,
    benefits: language === 'en' ? scheme.benefitsEn : language === 'ta' ? scheme.benefitsTa : scheme.benefitsHi,
    eligibility: language === 'en' ? scheme.eligibilityEn : language === 'ta' ? scheme.eligibilityTa : scheme.eligibilityHi,
    documents: language === 'en' ? scheme.documentsEn : language === 'ta' ? scheme.documentsTa : scheme.documentsHi,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-orange-600 font-medium mb-6 hover:gap-3 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {/* Fix: Added localized Back button text for Hindi */}
        {language === 'en' ? 'Back' : language === 'ta' ? 'பின்செல்' : 'पीछे'}
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-white">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full mb-4">
            {scheme.category}
          </span>
          <h1 className="text-3xl font-bold mb-4">{content.name}</h1>
          <p className="text-lg text-orange-50 opacity-90">{content.description}</p>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">1</span>
              {/* Fix: Using strings.benefits from updated constants.ts */}
              {strings.benefits}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.benefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
              {/* Fix: Using strings.eligibility from updated constants.ts */}
              {strings.eligibility}
            </h2>
            <ul className="space-y-3">
              {content.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm">3</span>
              {/* Fix: Using strings.documents from updated constants.ts */}
              {strings.documents}
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.documents.map((item, idx) => (
                <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium border border-gray-200">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 italic">{strings.disclaimer}</p>
            <a 
              href={scheme.officialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-md inline-flex items-center gap-2 shrink-0"
            >
              {/* Fix: Using strings.visitOfficial from updated constants.ts */}
              {strings.visitOfficial}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;

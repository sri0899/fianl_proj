
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onHome: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onHome, userName }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onHome}>
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-100">A</div>
          <div className="hidden sm:block">
            <span className="block text-lg font-black text-gray-900 leading-tight">AI Civil Assistant</span>
            <span className="text-xs font-bold text-orange-600 tracking-widest uppercase">Government of India</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
            {['en', 'ta', 'hi'].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l as Language)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                  language === l ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {userName && (
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {userName.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

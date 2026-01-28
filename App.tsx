
import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, Language, Scheme } from './types';
import { UI_STRINGS, CURATED_SCHEMES, INDIAN_STATES } from './constants';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ProfileSetup from './components/ProfileSetup';
import SchemeCard from './components/SchemeCard';
import SchemeDetail from './components/SchemeDetail';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('civil_assistant_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [language, setLanguage] = useState<Language>(user?.language || 'en');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [showChat, setShowChat] = useState(false);

  const strings = UI_STRINGS[language];

  const recommendedSchemes = useMemo(() => {
    if (!user) return [];
    return CURATED_SCHEMES.filter(s => {
      const ageMatch = user.age >= s.minAge && (!s.maxAge || user.age <= s.maxAge);
      const catMatch = s.eligibleCategories.includes(user.category);
      return ageMatch && catMatch;
    });
  }, [user]);

  const handleLogin = () => {
    // Simulate Google Login
    setIsLoggedIn(true);
  };

  const handleProfileSave = (profile: UserProfile) => {
    setUser(profile);
    setLanguage(profile.language);
    localStorage.setItem('civil_assistant_profile', JSON.stringify(profile));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">A</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Civil Assistant</h1>
          <p className="text-gray-500 mb-8">Empowering Indian citizens with personalized scheme guidance.</p>
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
            {strings.login}
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ProfileSetup onSave={handleProfileSave} currentLang={language} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${language !== 'en' ? 'tamil-font' : ''}`}>
      <Header 
        language={language} 
        setLanguage={(l) => { setLanguage(l); setUser({...user, language: l}); }} 
        onHome={() => setSelectedScheme(null)}
        userName={user.name}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {!selectedScheme ? (
          <>
            <div className="mb-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Namaste, {user.name}</h2>
                <p className="opacity-90 max-w-xl">
                  As a {user.age} year old {user.category} from {user.state}, here are some schemes curated just for you.
                </p>
                <button 
                  onClick={() => setShowChat(true)}
                  className="mt-6 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Ask AI Assistant
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>

            {recommendedSchemes.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-green-600 rounded-full"></span>
                  {strings.recommended}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedSchemes.map(s => (
                    <SchemeCard key={s.id} scheme={s} language={language} onClick={() => setSelectedScheme(s)} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                {strings.allSchemes}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CURATED_SCHEMES.map(s => (
                  <SchemeCard key={s.id} scheme={s} language={language} onClick={() => setSelectedScheme(s)} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <SchemeDetail scheme={selectedScheme} language={language} onBack={() => setSelectedScheme(null)} />
        )}
      </main>

      <footer className="bg-white border-t p-6 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">Security & Trust</p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">{strings.disclaimer}</p>
      </footer>

      {showChat && <ChatBox user={user} language={language} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default App;

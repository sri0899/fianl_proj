
import React, { useState } from 'react';
import { UserProfile, Language, UserCategory } from '../types';
import { INDIAN_STATES, UI_STRINGS } from '../constants';

interface Props {
  onSave: (p: UserProfile) => void;
  currentLang: Language;
}

const ProfileSetup: React.FC<Props> = ({ onSave, currentLang }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    language: currentLang,
    state: 'Tamil Nadu',
    category: 'Student',
    incomeRange: 'Below 1 Lakh'
  });

  const strings = UI_STRINGS[currentLang];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full overflow-hidden">
        <div className="bg-orange-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">{strings.setupProfile}</h2>
          <p className="opacity-80">Help us tailor government benefits for you.</p>
        </div>
        
        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => {
          e.preventDefault();
          onSave(formData as UserProfile);
        }}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input required type="text" className="w-full p-3 rounded-xl border" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
            <input required type="number" className="w-full p-3 rounded-xl border" onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
            <select className="w-full p-3 rounded-xl border" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{strings.category}</label>
            <select className="w-full p-3 rounded-xl border" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as UserCategory})}>
              <option value="Student">Student</option>
              <option value="Farmer">Farmer</option>
              <option value="Working">Working</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors">
              {strings.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;

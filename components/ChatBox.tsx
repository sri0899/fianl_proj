
import React, { useState, useRef, useEffect } from 'react';
import { Message, Language, UserProfile } from '../types';
import { UI_STRINGS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

interface Props {
  user: UserProfile;
  language: Language;
  onClose: () => void;
}

const ChatBox: React.FC<Props> = ({ user, language, onClose }) => {
  const strings = UI_STRINGS[language];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: `Namaste ${user.name}! I am your Civil Assistant. How can I help you with government schemes today?`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<{data: string, mimeType: string, name: string} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = (ev.target?.result as string).split(',')[1];
        setAttachment({ data: base64, mimeType: file.type, name: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachment) || loading) return;
    
    const userMsg: Message = { 
      role: 'user', 
      content: input, 
      timestamp: new Date(), 
      attachments: attachment ? [attachment] : undefined 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachment(null);
    setLoading(true);

    const response = await getGeminiResponse(
      input || "Analyze this document for me.", 
      language, 
      user, 
      userMsg.attachments
    );

    setMessages(prev => [...prev, { role: 'model', content: response, timestamp: new Date() }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-[450px] sm:bottom-6 sm:right-6 h-full sm:h-[700px] bg-white z-[100] sm:rounded-3xl shadow-2xl flex flex-col border border-gray-200">
      <div className="bg-navy-900 bg-gray-900 p-5 text-white flex items-center justify-between sm:rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">AI</div>
          <div>
            <h4 className="font-bold text-sm">Citizen Assistant</h4>
            <p className="text-[10px] text-green-400 uppercase tracking-tighter font-bold">Active Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
              {m.attachments?.map((a, j) => (
                <div key={j} className="mb-2 p-2 bg-black/10 rounded-lg flex items-center gap-2 text-xs">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                  {a.name}
                </div>
              ))}
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && <div className="animate-pulse bg-white p-4 rounded-xl border w-24">Thinking...</div>}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t bg-white sm:rounded-b-3xl">
        {attachment && (
          <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between text-xs">
            <span className="truncate flex items-center gap-1 font-bold">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
              {attachment.name}
            </span>
            <button onClick={() => setAttachment(null)} className="text-red-500">Remove</button>
          </div>
        )}
        <div className="flex gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
            title="Upload Document"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </button>
          <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*,.pdf" />
          <input 
            className="flex-grow p-3 rounded-xl border-2 focus:border-orange-500 outline-none transition-all"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder={strings.chatPrompt}
          />
          <button onClick={handleSend} className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

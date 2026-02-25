'use client';

import { useState, useRef, useEffect } from 'react';
import { Character, api } from '@/lib/api';
import { Locale } from '@/lib/i18n';
import CharacterAnimation from './CharacterAnimation';
import LanguageSwitcher from './LanguageSwitcher';

interface Message {
  id: string;
  role: 'user' | 'character';
  content: string;
}

interface ChatInterfaceProps {
  character: Character;
  locale: Locale;
  onToggleLocale: () => void;
  t: (key: string) => string;
}

export default function ChatInterface({ character, locale, onToggleLocale, t }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load initial greeting
    const greeting = locale === 'ja'
      ? `こんにちは♡ ${character.name}よ。今日はどうしたの？`
      : `Hi♡ I'm ${character.name}. What brings you here today?`;

    setMessages([{
      id: '0',
      role: 'character',
      content: greeting,
    }]);
  }, [character.name, locale]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTalking(true);

    // Get response
    setTimeout(() => {
      const response = api.getResponse(character.id, input, locale);
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'character',
        content: response,
      };
      setMessages(prev => [...prev, characterMessage]);

      // Speak if voice is enabled
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = locale === 'ja' ? 'ja-JP' : 'en-US';
        utterance.rate = 0.9;
        utterance.onend = () => setIsTalking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsTalking(false), 1000);
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
      {/* Character Display */}
      <div className="lg:w-1/2 h-48 lg:h-full p-4">
        <CharacterAnimation
          imageUrl={character.imageUrl}
          name={character.name}
          isTalking={isTalking}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">{character.name}</h2>
          <LanguageSwitcher locale={locale} onToggle={onToggleLocale} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-secondary text-white rounded-tr-md'
                    : 'bg-white border border-gray-100 shadow-sm rounded-tl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('user.chat.placeholder')}
              className="flex-1 input-field"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="btn-gradient px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('user.chat.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

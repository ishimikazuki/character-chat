'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { api, Character } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function CreatorDashboard() {
  const { locale, toggleLocale, t } = useI18n();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getAllCharacters();
      setCharacters(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('本当に削除しますか？')) {
      await api.deleteCharacter(id);
      setCharacters(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{t('creator.dashboard')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/creator/upload">
              <button className="btn-gradient">
                + {t('creator.newCharacter')}
              </button>
            </Link>
            <LanguageSwitcher locale={locale} onToggle={toggleLocale} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">{t('common.noCharacters')}</p>
            <Link href="/creator/upload">
              <button className="btn-gradient">
                + {t('creator.newCharacter')}
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                mode="creator"
                onDelete={() => handleDelete(character.id)}
                t={t}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

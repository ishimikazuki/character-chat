'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { api, Character } from '@/lib/api';
import ChatInterface from '@/components/ChatInterface';

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const { locale, toggleLocale, t } = useI18n();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getCharacter(id);
      setCharacter(data || null);
      setLoading(false);
    };
    load();
  }, [id]);

  const handlePublish = async () => {
    await api.publishCharacter(id);
    router.push('/creator');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Character not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/creator" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{t('creator.preview.title')}: {character.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/creator/edit/${id}`}>
              <button className="btn-outline">
                {t('creator.preview.backToEdit')}
              </button>
            </Link>
            <button onClick={handlePublish} className="btn-gradient">
              {t('creator.preview.publish')}
            </button>
          </div>
        </div>
      </header>

      <ChatInterface
        character={character}
        locale={locale}
        onToggleLocale={toggleLocale}
        t={t}
      />
    </div>
  );
}

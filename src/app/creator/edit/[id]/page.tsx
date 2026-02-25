'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { api, Character } from '@/lib/api';
import CreatorForm from '@/components/CreatorForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function EditPage() {
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

  const handleSubmit = async (data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => {
    await api.updateCharacter(id, data);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/creator" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{character.name} - {t('creator.edit')}</h1>
          </div>
          <LanguageSwitcher locale={locale} onToggle={toggleLocale} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-8">
          <CreatorForm
            initialData={character}
            onSubmit={handleSubmit}
            t={t}
            submitLabel={t('creator.upload.save')}
          />
        </div>
      </main>
    </div>
  );
}

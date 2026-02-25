'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { api, Character } from '@/lib/api';
import CreatorForm from '@/components/CreatorForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function UploadPage() {
  const router = useRouter();
  const { locale, toggleLocale, t } = useI18n();

  const handleSubmit = async (data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => {
    await api.createCharacter(data);
    router.push('/creator');
  };

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
            <h1 className="text-xl font-bold text-gray-900">{t('creator.upload.title')}</h1>
          </div>
          <LanguageSwitcher locale={locale} onToggle={toggleLocale} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-8">
          <CreatorForm onSubmit={handleSubmit} t={t} />
        </div>
      </main>
    </div>
  );
}

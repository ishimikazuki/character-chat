'use client';

import { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  onToggle: () => void;
}

export default function LanguageSwitcher({ locale, onToggle }: LanguageSwitcherProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
    >
      {locale === 'ja' ? '🇯🇵 日本語' : '🇬🇧 English'}
    </button>
  );
}

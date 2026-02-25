'use client';

import { useState, useCallback } from 'react';

export type Locale = 'ja' | 'en';

const translations = {
  ja: {
    landing: {
      title: 'キャラクターチャット',
      subtitle: 'あなただけのAIキャラクターと会話しよう',
      creator: 'Creator',
      creatorDesc: 'キャラクターを作る',
      user: 'User',
      userDesc: 'チャットを始める',
    },
    creator: {
      dashboard: 'マイキャラクター',
      newCharacter: '新規作成',
      edit: '編集',
      delete: '削除',
      previewBtn: 'プレビュー',
      upload: {
        title: '新規キャラクター作成',
        name: 'キャラクター名',
        profile: 'プロフィール',
        profileHint: '最大500文字',
        personality: '性格設定',
        voice: 'ボイス設定',
        voiceMale: '男性',
        voiceFemale: '女性',
        voiceNeutral: '中性',
        extended: '拡張設定（任意）',
        image: '画像アップロード',
        imageHint: 'PNG, JPG, GIF (5MB以下)',
        submit: '作成する',
        save: '保存する',
      },
      previewPage: {
        title: 'プレビュー',
        publish: 'パブリッシュ',
        backToEdit: '編集に戻る',
      },
    },
    user: {
      select: 'キャラクターを選ぶ',
      startChat: 'チャット開始',
      chat: {
        placeholder: 'メッセージを入力...',
        send: '送信',
        voice: '音声再生',
      },
    },
    common: {
      loading: '読み込み中...',
      noCharacters: 'キャラクターがいません',
    },
  },
  en: {
    landing: {
      title: 'Character Chat',
      subtitle: 'Talk with your own AI characters',
      creator: 'Creator',
      creatorDesc: 'Create characters',
      user: 'User',
      userDesc: 'Start chatting',
    },
    creator: {
      dashboard: 'My Characters',
      newCharacter: 'New Character',
      edit: 'Edit',
      delete: 'Delete',
      previewBtn: 'Preview',
      upload: {
        title: 'Create New Character',
        name: 'Character Name',
        profile: 'Profile',
        profileHint: 'Max 500 characters',
        personality: 'Personality',
        voice: 'Voice Setting',
        voiceMale: 'Male',
        voiceFemale: 'Female',
        voiceNeutral: 'Neutral',
        extended: 'Extended Settings (optional)',
        image: 'Image Upload',
        imageHint: 'PNG, JPG, GIF (Max 5MB)',
        submit: 'Create',
        save: 'Save',
      },
      previewPage: {
        title: 'Preview',
        publish: 'Publish',
        backToEdit: 'Back to Edit',
      },
    },
    user: {
      select: 'Choose a Character',
      startChat: 'Start Chat',
      chat: {
        placeholder: 'Type a message...',
        send: 'Send',
        voice: 'Play Voice',
      },
    },
    common: {
      loading: 'Loading...',
      noCharacters: 'No characters yet',
    },
  },
};

type TranslationValue = string | Record<string, unknown>;

export function useI18n() {
  const [locale, setLocale] = useState<Locale>('ja');

  const toggleLocale = useCallback(() => {
    setLocale(prev => prev === 'ja' ? 'en' : 'ja');
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [locale]);

  return { locale, setLocale, toggleLocale, t };
}

'use client';

import { useState } from 'react';
import { Character } from '@/lib/api';

interface CreatorFormProps {
  initialData?: Character;
  onSubmit: (data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
  t: (key: string) => string;
  submitLabel?: string;
}

export default function CreatorForm({ initialData, onSubmit, t, submitLabel }: CreatorFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    profile: initialData?.profile || '',
    personality: initialData?.personality || '',
    voiceSetting: initialData?.voiceSetting || 'female' as const,
    extendedSettings: initialData?.extendedSettings || '',
    imageUrl: initialData?.imageUrl || '/characters/sample1.gif',
    isPublished: initialData?.isPublished || false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ファイルサイズは5MB以下にしてください');
        return;
      }
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Character Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.name')} *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-field"
          required
        />
      </div>

      {/* Profile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.profile')}
          <span className="text-gray-400 ml-2">({t('creator.upload.profileHint')})</span>
        </label>
        <textarea
          value={formData.profile}
          onChange={(e) => setFormData(prev => ({ ...prev, profile: e.target.value.slice(0, 500) }))}
          className="textarea-field"
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-gray-400 mt-1">{formData.profile.length}/500</p>
      </div>

      {/* Personality */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.personality')}
        </label>
        <textarea
          value={formData.personality}
          onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
          className="textarea-field"
          rows={3}
        />
      </div>

      {/* Voice Setting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.voice')}
        </label>
        <select
          value={formData.voiceSetting}
          onChange={(e) => setFormData(prev => ({ ...prev, voiceSetting: e.target.value as 'male' | 'female' | 'neutral' }))}
          className="input-field"
        >
          <option value="female">{t('creator.upload.voiceFemale')}</option>
          <option value="male">{t('creator.upload.voiceMale')}</option>
          <option value="neutral">{t('creator.upload.voiceNeutral')}</option>
        </select>
      </div>

      {/* Extended Settings */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.extended')}
        </label>
        <textarea
          value={formData.extendedSettings}
          onChange={(e) => setFormData(prev => ({ ...prev, extendedSettings: e.target.value }))}
          className="textarea-field"
          rows={2}
          placeholder="好きなもの: ... / 苦手なもの: ..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('creator.upload.image')}
          <span className="text-gray-400 ml-2">({t('creator.upload.imageHint')})</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors">
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <div className="relative w-32 h-48 mx-auto">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="py-8">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-gray-600">クリックして画像を選択</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <button type="submit" className="w-full btn-gradient py-4 text-lg">
        {submitLabel || t('creator.upload.submit')}
      </button>
    </form>
  );
}

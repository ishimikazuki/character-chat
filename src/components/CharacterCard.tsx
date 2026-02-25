'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/lib/api';

interface CharacterCardProps {
  character: Character;
  mode: 'creator' | 'user';
  onDelete?: () => void;
  t: (key: string) => string;
}

export default function CharacterCard({ character, mode, onDelete, t }: CharacterCardProps) {
  return (
    <div className="card group">
      <div className="relative h-64 card-gradient">
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          className="object-cover character-container"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{character.name}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{character.profile}</p>

        {mode === 'user' ? (
          <Link href={`/user/chat/${character.id}`}>
            <button className="mt-4 w-full btn-gradient">
              {t('user.startChat')}
            </button>
          </Link>
        ) : (
          <div className="mt-4 flex gap-2">
            <Link href={`/creator/edit/${character.id}`} className="flex-1">
              <button className="w-full btn-outline text-sm py-2">
                {t('creator.edit')}
              </button>
            </Link>
            <Link href={`/creator/preview/${character.id}`} className="flex-1">
              <button className="w-full btn-gradient text-sm py-2">
                {t('creator.preview')}
              </button>
            </Link>
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

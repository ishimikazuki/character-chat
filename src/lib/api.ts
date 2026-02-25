const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Character {
  id: number;
  name: string;
  profile: string;
  personality: string;
  voiceSetting: 'male' | 'female' | 'neutral';
  extendedSettings?: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  user: string;
  character: string;
}

// Initial character data for mock
const initialCharacters: Character[] = [
  {
    id: 1,
    name: '美咲（Misaki）',
    profile: '学園のアイドル的存在。明るく社交的だが、親しい人には甘えたがる一面も。',
    personality: '積極的で情熱的。少し大胆な発言もするが、基本的には優しい性格。',
    voiceSetting: 'female',
    extendedSettings: '好きなもの: スイーツ、恋愛話 / 苦手なもの: 早起き',
    imageUrl: '/characters/sample1.gif',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'リナ（Rina）',
    profile: 'クールな雰囲気のお姉さん。でも優しくてちょっとドジなところも。',
    personality: '落ち着いていて知的。でも好きな人の前では素直になれない。',
    voiceSetting: 'female',
    extendedSettings: '好きなもの: 読書、コーヒー / 苦手なもの: 虫',
    imageUrl: '/characters/sample2.gif',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// In-memory store
let characters: Character[] = [...initialCharacters];

// Conversations data
const conversations: Record<number, { ja: Conversation[]; en: Conversation[] }> = {
  1: {
    ja: [
      { user: 'こんにちは', character: 'あら、いらっしゃい♡ 今日は何して遊ぶ？' },
      { user: '美咲ちゃん、今日も可愛いね', character: 'えへへ♡ そんなこと言われたら...ドキドキしちゃう♡' },
      { user: '一緒にゲームしない？', character: 'いいわよ♡ でも負けたら...罰ゲームね？ふふっ' },
      { user: 'どんな罰ゲームかな', character: 'それは...勝ってからのお楽しみよ♡ ドキドキする？' },
      { user: '一緒にお風呂入らない？', character: 'もう、大胆なんだから♡ でも...嫌いじゃないわよ？ふふっ' },
    ],
    en: [
      { user: 'Hello', character: 'Oh, welcome♡ What do you want to do today?' },
      { user: 'Misaki, you\'re cute today too', character: 'Hehe♡ If you say that... I\'ll get nervous♡' },
      { user: 'Want to play a game?', character: 'Sure♡ But if you lose... there\'s a penalty, you know? Hehe' },
      { user: 'What kind of penalty?', character: 'That\'s... a surprise for the winner♡ Are you nervous?' },
      { user: 'Want to take a bath together?', character: 'Geez, you\'re bold♡ But... I don\'t dislike it, you know? Hehe' },
    ],
  },
  2: {
    ja: [
      { user: 'やあ', character: '...あ、来てくれたの。ちょっと嬉しいかも。' },
      { user: 'リナさん綺麗だね', character: '...っ！急にそんなこと言わないで。...でも、ありがとう♡' },
      { user: '一緒に本読まない？', character: 'いいわね。...隣に座って？近くがいいの。' },
      { user: '好きだよ', character: '...バカ。そういうこと簡単に言わないの。...私も、だけど♡' },
    ],
    en: [
      { user: 'Hey', character: '...Oh, you came. I\'m a little happy, maybe.' },
      { user: 'Rina, you\'re beautiful', character: '...! Don\'t say things like that suddenly. ...But, thank you♡' },
      { user: 'Want to read together?', character: 'That sounds nice. ...Sit next to me? I want you close.' },
      { user: 'I like you', character: '...Idiot. Don\'t say things like that so easily. ...Me too, though♡' },
    ],
  },
};

export const api = {
  async getCharacters(): Promise<Character[]> {
    try {
      const res = await fetch(`${API_URL}/api/characters`);
      if (res.ok) return res.json();
    } catch {
      // Fallback to mock
    }
    return characters.filter(c => c.isPublished);
  },

  async getAllCharacters(): Promise<Character[]> {
    try {
      const res = await fetch(`${API_URL}/api/characters/all`);
      if (res.ok) return res.json();
    } catch {
      // Fallback to mock
    }
    return characters;
  },

  async getCharacter(id: number): Promise<Character | undefined> {
    try {
      const res = await fetch(`${API_URL}/api/characters/${id}`);
      if (res.ok) return res.json();
    } catch {
      // Fallback to mock
    }
    return characters.find(c => c.id === id);
  },

  async createCharacter(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>): Promise<Character> {
    const newChar: Character = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    characters.push(newChar);
    return newChar;
  },

  async updateCharacter(id: number, data: Partial<Character>): Promise<Character | undefined> {
    const index = characters.findIndex(c => c.id === id);
    if (index !== -1) {
      characters[index] = {
        ...characters[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return characters[index];
    }
    return undefined;
  },

  async deleteCharacter(id: number): Promise<boolean> {
    characters = characters.filter(c => c.id !== id);
    return true;
  },

  async publishCharacter(id: number): Promise<Character | undefined> {
    return this.updateCharacter(id, { isPublished: true });
  },

  getConversations(characterId: number, locale: 'ja' | 'en'): Conversation[] {
    return conversations[characterId]?.[locale] || [
      { user: locale === 'ja' ? 'こんにちは' : 'Hello', character: locale === 'ja' ? 'やあ♡' : 'Hey there♡' },
    ];
  },

  getResponse(characterId: number, userMessage: string, locale: 'ja' | 'en'): string {
    const convs = conversations[characterId]?.[locale] || [];
    const match = convs.find(c =>
      c.user.toLowerCase().includes(userMessage.toLowerCase()) ||
      userMessage.toLowerCase().includes(c.user.toLowerCase())
    );

    if (match) return match.character;

    // Default responses
    const defaults = locale === 'ja'
      ? ['ふふ、そうなの？♡', 'もっと教えて♡', 'うん、聞いてるよ♡', 'それで？続きが気になる♡']
      : ['Hehe, really?♡', 'Tell me more♡', 'Yeah, I\'m listening♡', 'And then? I\'m curious♡'];

    return defaults[Math.floor(Math.random() * defaults.length)];
  },
};

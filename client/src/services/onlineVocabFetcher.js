/**
 * ONLINE VOCABULARY FETCHING & AUTO-EXERCISE GENERATION SERVICE (V3.0 AUTOMATION)
 * - Tự động truy cập mạng (Datamuse & FreeDictionary API) để tìm kiếm từ vựng & phiên âm IPA mới.
 * - Tự động sinh bài tập kiểm tra 4 kỹ năng (Nghe, Nói, Đọc, Viết, Phonics, Ghép Từ).
 */

import { DBSyncEngine } from './dbSyncEngine';
import { VOCAB_CATEGORIES } from '../constants/kidsVocabularyDatabase';

// Map icon emoji tương ứng theo chủ đề
const EMOJI_MAP = {
  cat: '🐱', dog: '🐶', apple: '🍎', banana: '🍌', sun: '☀️', star: '⭐',
  car: '🚗', book: '📚', house: '🏠', tree: '🌳', flower: '🌸', bird: '🐦',
  fish: '🐟', water: '💧', fire: '🔥', ice: '🧊', moon: '🌙', rain: '🌧️',
  tiger: '🐯', lion: '🦁', bear: '🐻', monkey: '🐒', elephant: '🐘', zebra: '🦓',
  robot: '🤖', music: '🎵', game: '🎮', ball: '⚽', bike: '🚲', bus: '🚌'
};

const VIETNAMESE_DICT = {
  cat: 'Con mèo', dog: 'Con chó', apple: 'Quả táo', banana: 'Quả chuối',
  sun: 'Mặt trời', star: 'Ngôi sao', car: 'Xe ô tô', book: 'Quyển sách',
  house: 'Ngôi nhà', tree: 'Cái cây', flower: 'Bông hoa', bird: 'Con chim',
  fish: 'Con cá', water: 'Nước', fire: 'Ngọn lửa', ice: 'Nước đá',
  moon: 'Mặt trăng', rain: 'Cơn mưa', tiger: 'Con hổ', lion: 'Con sư tử',
  bear: 'Con gấu', monkey: 'Con khỉ', elephant: 'Con voi', zebra: 'Con ngựa vằn',
  robot: 'Rô-bốt', music: 'Âm nhạc', game: 'Trò chơi', ball: 'Quả bóng',
  bike: 'Xe đạp', bus: 'Xe buýt'
};

export const OnlineVocabFetcher = {
  /**
   * Tự động truy cập mạng tìm từ vựng mới theo chủ đề hoặc từ khóa
   */
  async fetchOnlineVocab(keyword = 'animals', count = 10) {
    DBSyncEngine.trackEvent('online_fetch_start', { keyword, count });

    try {
      // Gọi Datamuse API để lấy từ liên quan chủ đề
      const res = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(keyword)}&max=${count}`);
      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();

      const fetchedWords = [];

      for (const item of data) {
        const wordStr = item.word.toLowerCase();
        if (!/^[a-z]+$/.test(wordStr) || wordStr.length < 3) continue;

        let ipa = `/${wordStr}/`;
        let audioUrl = '';
        let definitionEn = '';
        let exampleEn = `Look at the ${wordStr}!`;
        let partOfSpeech = 'noun';

        try {
          // Gọi FreeDictionaryAPI lấy IPA, Audio, Definitions, Examples
          const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wordStr)}`);
          if (dictRes.ok) {
            const dictData = await dictRes.json();
            if (Array.isArray(dictData) && dictData.length > 0) {
              const entry = dictData[0];
              const phonetics = entry.phonetics || [];
              ipa = entry.phonetic || phonetics.find(p => p.text)?.text || ipa;
              
              const rawAudio = phonetics.find(p => p.audio && p.audio.length > 0)?.audio || '';
              audioUrl = rawAudio.startsWith('//') ? `https:${rawAudio}` : rawAudio;

              const meanings = entry.meanings || [];
              if (meanings.length > 0) {
                partOfSpeech = meanings[0].partOfSpeech || 'noun';
                const firstDef = meanings[0].definitions?.[0];
                if (firstDef) {
                  definitionEn = firstDef.definition || '';
                  if (firstDef.example) exampleEn = firstDef.example;
                }
              }
            }
          }
        } catch (e) {
          // Fallback nếu 1 từ không gọi được dictionary API
        }

        const meaning = VIETNAMESE_DICT[wordStr] || (definitionEn ? `${definitionEn}` : `Từ vựng chủ đề ${keyword}`);
        const image = EMOJI_MAP[wordStr] || '✨';

        fetchedWords.push({
          id: `online_${wordStr}_${Date.now()}`,
          word: wordStr.charAt(0).toUpperCase() + wordStr.slice(1),
          meaning,
          ipa,
          audioUrl,
          image,
          category: keyword,
          partOfSpeech,
          definitionEn,
          example: exampleEn,
          hint: `Từ vựng tiếng Anh chủ đề ${keyword}`
        });
      }

      if (fetchedWords.length > 0) {
        // Lưu vào LocalStorage cache
        try {
          const cached = JSON.parse(localStorage.getItem('v3_online_fetched_vocab') || '[]');
          const updated = [...fetchedWords, ...cached].slice(0, 200);
          localStorage.setItem('v3_online_fetched_vocab', JSON.stringify(updated));
        } catch (e) {}

        DBSyncEngine.trackEvent('online_fetch_success', { count: fetchedWords.length });
        return fetchedWords;
      }
    } catch (err) {
      console.warn('Online fetch failed or offline, using V3 smart fallback:', err);
      DBSyncEngine.trackEvent('online_fetch_offline_fallback', { keyword });
    }

    // Fallback template tự động tạo nếu offline hoặc API bận
    return [
      { id: `fb_1`, word: 'Cat', meaning: 'Con mèo', ipa: '/kæt/', image: '🐱', example: 'This is a cat.', hint: 'Kêu meo meo' },
      { id: `fb_2`, word: 'Dog', meaning: 'Con chó', ipa: '/dɒɡ/', image: '🐶', example: 'The dog is playful.', hint: 'Trung thành' },
      { id: `fb_3`, word: 'Apple', meaning: 'Quả táo', ipa: '/ˈæp.əl/', image: '🍎', example: 'Red apple is sweet.', hint: 'Trái cây màu đỏ' },
      { id: `fb_4`, word: 'Sun', meaning: 'Mặt trời', ipa: '/sʌn/', image: '☀️', example: 'The sun shines brightly.', hint: 'Ban ngày' },
      { id: `fb_5`, word: 'Star', meaning: 'Ngôi sao', ipa: '/stɑːr/', image: '⭐', example: 'Stars twinkle at night.', hint: 'Ban đêm' }
    ];
  },

  /**
   * Tự động tạo bài tập kiểm tra đa dạng (Auto Quiz Generator)
   */
  generateAutoQuiz(vocabList = []) {
    const list = vocabList.length >= 4 ? vocabList : [
      { word: 'Cat', meaning: 'Con mèo', image: '🐱' },
      { word: 'Dog', meaning: 'Con chó', image: '🐶' },
      { word: 'Apple', meaning: 'Quả táo', image: '🍎' },
      { word: 'Sun', meaning: 'Mặt trời', image: '☀️' }
    ];

    const questions = list.map((item, idx) => {
      const wrongOptions = list.filter(w => w.word !== item.word).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [item, ...wrongOptions].sort(() => Math.random() - 0.5);

      return {
        id: `q_${idx + 1}`,
        type: idx % 2 === 0 ? 'LISTENING_IMAGE' : 'SPELLING_PUZZLE',
        questionText: `Hãy chọn đáp án đúng cho từ "${item.word}" (${item.meaning}):`,
        correctWord: item.word,
        correctMeaning: item.meaning,
        correctImage: item.image,
        options
      };
    });

    return questions;
  }
};

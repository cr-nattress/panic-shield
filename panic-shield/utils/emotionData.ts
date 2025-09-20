export const EMOTION_CORES = ['anger', 'disgust', 'sad', 'happy', 'surprise', 'fear'];

export interface Emotion {
  id: string;
  core: string;
  primary: string;
  intensity: number;
  hue: string;
}

export const EMOTIONS: Emotion[] = [
  // ANGER
  { id: 'anger_frustrated_1', core: 'anger', primary: 'frustrated', intensity: 1, hue: '#FFB3B3' },
  { id: 'anger_irritated_2', core: 'anger', primary: 'irritated', intensity: 2, hue: '#FF9999' },
  { id: 'anger_enraged_3', core: 'anger', primary: 'enraged', intensity: 3, hue: '#FF6666' },
  { id: 'anger_critical_1', core: 'anger', primary: 'critical', intensity: 1, hue: '#FFB3B3' },

  // DISGUST
  { id: 'disgust_disappointed_1', core: 'disgust', primary: 'disappointed', intensity: 1, hue: '#C8B6E2' },
  { id: 'disgust_repulsed_2', core: 'disgust', primary: 'repulsed', intensity: 2, hue: '#B19CD9' },
  { id: 'disgust_loathing_3', core: 'disgust', primary: 'loathing', intensity: 3, hue: '#9B84C9' },

  // SAD
  { id: 'sad_lonely_1', core: 'sad', primary: 'lonely', intensity: 1, hue: '#B8E6FF' },
  { id: 'sad_depressed_2', core: 'sad', primary: 'depressed', intensity: 2, hue: '#87CEEB' },
  { id: 'sad_despair_3', core: 'sad', primary: 'despair', intensity: 3, hue: '#6BB6D8' },
  { id: 'sad_guilty_1', core: 'sad', primary: 'guilty', intensity: 1, hue: '#B8E6FF' },

  // HAPPY
  { id: 'happy_content_1', core: 'happy', primary: 'content', intensity: 1, hue: '#FFF4CC' },
  { id: 'happy_joyful_2', core: 'happy', primary: 'joyful', intensity: 2, hue: '#FFEB9C' },
  { id: 'happy_ecstatic_3', core: 'happy', primary: 'ecstatic', intensity: 3, hue: '#FFE066' },
  { id: 'happy_proud_2', core: 'happy', primary: 'proud', intensity: 2, hue: '#FFEB9C' },
  { id: 'happy_peaceful_1', core: 'happy', primary: 'peaceful', intensity: 1, hue: '#FFF4CC' },

  // SURPRISE
  { id: 'surprise_confused_1', core: 'surprise', primary: 'confused', intensity: 1, hue: '#C3F0DC' },
  { id: 'surprise_amazed_2', core: 'surprise', primary: 'amazed', intensity: 2, hue: '#9FE2BF' },
  { id: 'surprise_shocked_3', core: 'surprise', primary: 'shocked', intensity: 3, hue: '#7CD5A2' },

  // FEAR
  { id: 'fear_anxious_1', core: 'fear', primary: 'anxious', intensity: 1, hue: '#B8F5B8' },
  { id: 'fear_scared_2', core: 'fear', primary: 'scared', intensity: 2, hue: '#90EE90' },
  { id: 'fear_terrified_3', core: 'fear', primary: 'terrified', intensity: 3, hue: '#6FE36F' },
  { id: 'fear_insecure_1', core: 'fear', primary: 'insecure', intensity: 1, hue: '#B8F5B8' },
];

export const COMMON_TRIGGERS = ['work', 'social', 'family', 'health', 'money', 'news', 'weather', 'sleep', 'conflict', 'alone'];

export interface Suggestion {
  text: string;
  type: string;
  duration?: string;
}

export const SUGGESTIONS_BY_CORE: Record<string, Suggestion[]> = {
  anger: [
    { text: 'Take 3 slow breaths. Count to 4 as you inhale, hold for 4, exhale for 4.', type: 'breathing', duration: '1 min' },
    { text: 'Name 5 things you can see right now. This grounds you in the present.', type: 'grounding', duration: '30 sec' },
    { text: 'Walk for 2 minutes, even if just around the room.', type: 'movement', duration: '2 min' },
  ],
  disgust: [
    { text: 'Notice where you feel tension in your body. Breathe into that area.', type: 'breathing', duration: '1 min' },
    { text: 'Consider: "What boundary might need setting here?"', type: 'reframing', duration: '30 sec' },
  ],
  sad: [
    { text: 'Place your hand on your heart. Feel the warmth and steady rhythm.', type: 'grounding', duration: '30 sec' },
    { text: 'Text someone you trust: "Thinking of you." Connection helps.', type: 'social', duration: '1 min' },
  ],
  happy: [
    { text: 'Savor this moment. What specifically feels good right now?', type: 'grounding', duration: '30 sec' },
    { text: 'Share this feeling! Tell someone what made you smile.', type: 'social', duration: '1 min' },
  ],
  surprise: [
    { text: 'Orient yourself: Where am I? What day is it? This helps process the unexpected.', type: 'grounding', duration: '30 sec' },
    { text: 'Take a moment before reacting. Breathe deeply once.', type: 'breathing', duration: '10 sec' },
  ],
  fear: [
    { text: 'Try the 4-7-8 breath: Inhale for 4, hold for 7, exhale for 8. Activates calm.', type: 'breathing', duration: '1 min' },
    { text: 'Name what you fear out loud. Speaking it reduces its power.', type: 'reframing', duration: '30 sec' },
  ],
};

export const getEmotionsByCore = (core: string) => EMOTIONS.filter(e => e.core === core);
export const getEmotionById = (id: string) => EMOTIONS.find(e => e.id === id);

export const getContrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000' : '#FFF';
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date));
};

export const getSuggestion = (core: string, intensity: number) => {
  const suggestions = SUGGESTIONS_BY_CORE[core] || [];
  if (suggestions.length === 0) {
    return { text: 'Take a moment to breathe and notice how you feel.', type: 'breathing' };
  }
  const index = Math.min(intensity - 1, suggestions.length - 1);
  return suggestions[index];
};
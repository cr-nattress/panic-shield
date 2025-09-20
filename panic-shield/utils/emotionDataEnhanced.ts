// Enhanced emotion data with sub-emotions for refinement

export interface EmotionCore {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description: string;
}

export interface SubEmotion {
  id: string;
  coreId: string;
  name: string;
  intensity: 1 | 2 | 3;
  color: string;
  description?: string;
  commonTriggers?: string[];
}

export const EMOTION_CORES: EmotionCore[] = [
  {
    id: 'anger',
    name: 'Anger',
    color: '#FF6B6B',
    description: 'Feelings of frustration, irritation, or rage'
  },
  {
    id: 'disgust',
    name: 'Disgust',
    color: '#B19CD9',
    description: 'Feelings of aversion, disappointment, or revulsion'
  },
  {
    id: 'sad',
    name: 'Sadness',
    color: '#87CEEB',
    description: 'Feelings of loss, loneliness, or grief'
  },
  {
    id: 'happy',
    name: 'Happy',
    color: '#FFE066',
    description: 'Feelings of joy, contentment, or satisfaction'
  },
  {
    id: 'surprise',
    name: 'Surprise',
    color: '#9FE2BF',
    description: 'Feelings of amazement, confusion, or shock'
  },
  {
    id: 'fear',
    name: 'Fear',
    color: '#90EE90',
    description: 'Feelings of anxiety, worry, or terror'
  }
];

export const SUB_EMOTIONS: SubEmotion[] = [
  // ANGER Sub-emotions
  { id: 'anger_frustrated', coreId: 'anger', name: 'Frustrated', intensity: 1, color: '#FFB3B3', description: 'Blocked from achieving something' },
  { id: 'anger_annoyed', coreId: 'anger', name: 'Annoyed', intensity: 1, color: '#FFA8A8', description: 'Mildly irritated' },
  { id: 'anger_irritated', coreId: 'anger', name: 'Irritated', intensity: 2, color: '#FF9999', description: 'Persistently bothered' },
  { id: 'anger_angry', coreId: 'anger', name: 'Angry', intensity: 2, color: '#FF8080', description: 'Strong displeasure' },
  { id: 'anger_enraged', coreId: 'anger', name: 'Enraged', intensity: 3, color: '#FF6666', description: 'Extreme anger' },
  { id: 'anger_furious', coreId: 'anger', name: 'Furious', intensity: 3, color: '#FF4D4D', description: 'Uncontrolled anger' },

  // DISGUST Sub-emotions
  { id: 'disgust_disappointed', coreId: 'disgust', name: 'Disappointed', intensity: 1, color: '#C8B6E2', description: 'Expectations not met' },
  { id: 'disgust_disapproving', coreId: 'disgust', name: 'Disapproving', intensity: 1, color: '#C0A9DD', description: 'Not agreeing with something' },
  { id: 'disgust_offended', coreId: 'disgust', name: 'Offended', intensity: 2, color: '#B19CD9', description: 'Personally insulted' },
  { id: 'disgust_repulsed', coreId: 'disgust', name: 'Repulsed', intensity: 2, color: '#A38FD4', description: 'Strong aversion' },
  { id: 'disgust_revolted', coreId: 'disgust', name: 'Revolted', intensity: 3, color: '#9B84C9', description: 'Extreme disgust' },
  { id: 'disgust_loathing', coreId: 'disgust', name: 'Loathing', intensity: 3, color: '#8D77C4', description: 'Intense hatred' },

  // SAD Sub-emotions
  { id: 'sad_lonely', coreId: 'sad', name: 'Lonely', intensity: 1, color: '#B8E6FF', description: 'Feeling alone' },
  { id: 'sad_gloomy', coreId: 'sad', name: 'Gloomy', intensity: 1, color: '#A8DFFF', description: 'Generally down' },
  { id: 'sad_depressed', coreId: 'sad', name: 'Depressed', intensity: 2, color: '#87CEEB', description: 'Persistent sadness' },
  { id: 'sad_heartbroken', coreId: 'sad', name: 'Heartbroken', intensity: 2, color: '#7AC5E8', description: 'Deep emotional pain' },
  { id: 'sad_hopeless', coreId: 'sad', name: 'Hopeless', intensity: 3, color: '#6BB6D8', description: 'Without hope' },
  { id: 'sad_despair', coreId: 'sad', name: 'Despair', intensity: 3, color: '#5CA7C8', description: 'Complete loss of hope' },

  // HAPPY Sub-emotions
  { id: 'happy_content', coreId: 'happy', name: 'Content', intensity: 1, color: '#FFF4CC', description: 'Satisfied and peaceful' },
  { id: 'happy_pleased', coreId: 'happy', name: 'Pleased', intensity: 1, color: '#FFF0B8', description: 'Mildly happy' },
  { id: 'happy_joyful', coreId: 'happy', name: 'Joyful', intensity: 2, color: '#FFEB9C', description: 'Full of joy' },
  { id: 'happy_excited', coreId: 'happy', name: 'Excited', intensity: 2, color: '#FFE580', description: 'Eager and energetic' },
  { id: 'happy_ecstatic', coreId: 'happy', name: 'Ecstatic', intensity: 3, color: '#FFE066', description: 'Overwhelming joy' },
  { id: 'happy_elated', coreId: 'happy', name: 'Elated', intensity: 3, color: '#FFDA4D', description: 'Extremely happy' },

  // SURPRISE Sub-emotions
  { id: 'surprise_confused', coreId: 'surprise', name: 'Confused', intensity: 1, color: '#C3F0DC', description: 'Unable to understand' },
  { id: 'surprise_startled', coreId: 'surprise', name: 'Startled', intensity: 1, color: '#B8EDD6', description: 'Suddenly surprised' },
  { id: 'surprise_amazed', coreId: 'surprise', name: 'Amazed', intensity: 2, color: '#9FE2BF', description: 'Wonderfully surprised' },
  { id: 'surprise_astonished', coreId: 'surprise', name: 'Astonished', intensity: 2, color: '#8DDBB3', description: 'Greatly surprised' },
  { id: 'surprise_shocked', coreId: 'surprise', name: 'Shocked', intensity: 3, color: '#7CD5A2', description: 'Deeply disturbed surprise' },
  { id: 'surprise_stunned', coreId: 'surprise', name: 'Stunned', intensity: 3, color: '#6ACF91', description: 'Completely overwhelmed' },

  // FEAR Sub-emotions
  { id: 'fear_anxious', coreId: 'fear', name: 'Anxious', intensity: 1, color: '#B8F5B8', description: 'Worried about future' },
  { id: 'fear_worried', coreId: 'fear', name: 'Worried', intensity: 1, color: '#AAFFAA', description: 'Concerned about something' },
  { id: 'fear_scared', coreId: 'fear', name: 'Scared', intensity: 2, color: '#90EE90', description: 'Afraid of something' },
  { id: 'fear_frightened', coreId: 'fear', name: 'Frightened', intensity: 2, color: '#7FE37F', description: 'Sudden fear' },
  { id: 'fear_terrified', coreId: 'fear', name: 'Terrified', intensity: 3, color: '#6FE36F', description: 'Extreme fear' },
  { id: 'fear_panicked', coreId: 'fear', name: 'Panicked', intensity: 3, color: '#5FD85F', description: 'Overwhelming fear with loss of control' }
];

// Helper functions
export const getEmotionCore = (id: string): EmotionCore | undefined => {
  return EMOTION_CORES.find(core => core.id === id);
};

export const getSubEmotionsByCore = (coreId: string): SubEmotion[] => {
  return SUB_EMOTIONS.filter(emotion => emotion.coreId === coreId);
};

export const getSubEmotionById = (id: string): SubEmotion | undefined => {
  return SUB_EMOTIONS.find(emotion => emotion.id === id);
};

// Enhanced trigger categories with more options
export const TRIGGER_CATEGORIES = {
  personal: ['work', 'school', 'money', 'health', 'sleep', 'exercise', 'diet'],
  social: ['family', 'friends', 'partner', 'conflict', 'alone', 'rejection', 'criticism'],
  environmental: ['weather', 'news', 'social media', 'noise', 'crowds', 'traffic', 'home'],
  internal: ['thoughts', 'memories', 'physical pain', 'fatigue', 'hunger', 'hormones'],
  achievement: ['success', 'failure', 'progress', 'goals', 'deadlines', 'competition']
};

export const ALL_TRIGGERS = Object.values(TRIGGER_CATEGORIES).flat();

// Quick suggestions based on emotion and intensity
export const getQuickSuggestion = (coreId: string, intensity: number): string => {
  const suggestions: Record<string, string[]> = {
    anger: [
      'Take 3 deep breaths. Count to 4 as you inhale.',
      'Step away from the situation for 5 minutes.',
      'Try intense exercise for 2 minutes to release energy.'
    ],
    disgust: [
      'Notice what boundary might need setting.',
      'Focus on your values - what matters to you?',
      'Consider if this reaction is protecting you.'
    ],
    sad: [
      'Place your hand on your heart and feel its rhythm.',
      'Reach out to someone you trust.',
      'Allow yourself to feel this - it will pass.'
    ],
    happy: [
      'Savor this moment - what specifically feels good?',
      'Share this feeling with someone.',
      'Take a mental snapshot to remember this.'
    ],
    surprise: [
      'Ground yourself - name 5 things you can see.',
      'Take a moment before reacting.',
      'Ask yourself: Is action needed right now?'
    ],
    fear: [
      'Try 4-7-8 breathing to activate calm.',
      'Name your fear out loud to reduce its power.',
      'Focus on what you can control right now.'
    ]
  };

  const coreSuggestions = suggestions[coreId] || ['Take a moment to breathe and observe.'];
  const index = Math.min(intensity - 1, coreSuggestions.length - 1);
  return coreSuggestions[index];
};
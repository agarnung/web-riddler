export type Lang = 'en' | 'es';

const EN = {
  heading: "I'm giving you a riddle, try to guess it...",
  nextRiddle: 'Next riddle',
  dailyRiddle: 'Daily riddle',
  showSolution: 'Show solution',
  hideSolution: 'Hide solution',
  solution: 'Solution',
  placeholder: 'Type your answer...',
  analyzing: 'Analyzing',
  closeness: 'Closeness',
  correct: '🎉 Correct! 🎉',
  error: 'Error',
  offline: 'Local closeness (embedding API unavailable)',
  language: 'ES',
  languageLabel: 'Switch to Spanish',
} as const;

export type UiKey = keyof typeof EN;

const ES: Record<UiKey, string> = {
  heading: 'Te voy a plantear un acertijo, intenta adivinarlo...',
  nextRiddle: 'Otro acertijo',
  dailyRiddle: 'Acertijo del día',
  showSolution: 'Ver solución',
  hideSolution: 'Ocultar solución',
  solution: 'Solución',
  placeholder: 'Escribe tu respuesta...',
  analyzing: 'Analizando',
  closeness: 'Cercanía',
  correct: '🎉 ¡Correcto! 🎉',
  error: 'Error',
  offline: 'Cercanía local (API de embeddings no disponible)',
  language: 'EN',
  languageLabel: 'Cambiar a inglés',
};

export const UI: Record<Lang, Record<UiKey, string>> = { en: EN, es: ES };

export const t = (lang: Lang, key: UiKey): string => UI[lang][key];

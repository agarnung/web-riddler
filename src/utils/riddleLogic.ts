import { riddles } from './riddles';
import { riddlesEs } from './riddles.es';
import type { Lang } from './i18n';

export type Riddle = {
  question: string;
  solution: string;
  source?: string;
};

const DAY_MS = 86_400_000;
const EPOCH_MS = Date.UTC(2026, 0, 1);

export const normalizeAnswer = (text: string): string =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripArticle = (text: string): string =>
  text.replace(/^(a|an|the)\s+/, '').trim();

const variants = (text: string): string[] => {
  const base = normalizeAnswer(text);
  const noArticle = stripArticle(base);
  return [...new Set([base, noArticle].filter(Boolean))];
};

const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        (current[j - 1] ?? 0) + 1,
        (previous[j] ?? 0) + 1,
        (previous[j - 1] ?? 0) + cost
      );
    }
    previous = current;
  }
  return previous[b.length] ?? Math.max(a.length, b.length);
};

const jaccard = (a: string, b: string): number => {
  const left = new Set(a.split(' ').filter(Boolean));
  const right = new Set(b.split(' ').filter(Boolean));
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
};

/**
 * Local fallback for the HuggingFace embedding endpoint used by the Astro API.
 * Returns 0..100, with exact/synonymous answers at 100 and small typos high.
 * It is lexical, not semantic: the production path still uses embeddings.
 */
export const closeness = (input: string, solution: string): number => {
  const user = normalizeAnswer(input);
  if (!user) return 0;
  const userNoArticle = stripArticle(user);
  const targets = solution
    .split(/\s*\/\s*|\s+or\s+/i)
    .flatMap(variants);
  let best = 0;

  for (const target of targets) {
    if (!target) continue;
    const targetNoArticle = stripArticle(target);
    if (user === target || userNoArticle === targetNoArticle) return 100;

    const maxLength = Math.max(user.length, target.length, 1);
    const lev = 1 - levenshtein(user, target) / maxLength;
    const maxNoArticle = Math.max(userNoArticle.length, targetNoArticle.length, 1);
    const levNoArticle =
      1 - levenshtein(userNoArticle, targetNoArticle) / maxNoArticle;
    const overlap = jaccard(user, target);
    const contained =
      target.includes(user) || user.includes(target) ? 0.85 : 0;

    best = Math.max(best, lev, levNoArticle, overlap, contained);
  }

  return Math.round(Math.max(0, Math.min(1, best)) * 100);
};

export const bankFor = (lang: Lang = 'en'): Riddle[] =>
  lang === 'es' ? riddlesEs : riddles;

export const riddleIndexForDate = (date: string, lang: Lang = 'en'): number => {
  const ms = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(ms)) return 0;
  return Math.abs(Math.floor((ms - EPOCH_MS) / DAY_MS)) % bankFor(lang).length;
};

export const getDailyRiddle = (
  lang: Lang = 'en',
  now: Date = new Date()
): Riddle => {
  const date = now.toISOString().slice(0, 10);
  const bank = bankFor(lang);
  return bank[riddleIndexForDate(date, lang)] ?? bank[0]!;
};

export const getRiddleCount = (lang: Lang = 'en'): number => bankFor(lang).length;

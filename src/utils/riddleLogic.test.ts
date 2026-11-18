import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  closeness,
  getDailyRiddle,
  getRiddleCount,
  normalizeAnswer,
  riddleIndexForDate,
} from './riddleLogic.ts';
import { riddlesEs } from './riddles.es.ts';
import { riddles } from './riddles.ts';

test('the riddle bank is not empty', () => {
  assert.ok(getRiddleCount() > 0);
});

test('normalisation ignores case, accents, punctuation and articles', () => {
  assert.equal(normalizeAnswer('  The  Clock! '), 'the clock');
  assert.equal(normalizeAnswer('Órono'), 'orono');
  assert.equal(normalizeAnswer('a  clock'), 'a clock');
});

test('exact and article variants score 100', () => {
  assert.equal(closeness('clock', 'a clock'), 100);
  assert.equal(closeness('A Clock!', 'a clock'), 100);
  assert.equal(closeness('the clock', 'a clock'), 100);
});

test('accepted slash alternatives score 100', () => {
  assert.equal(closeness('footsteps', 'your feet / footsteps'), 100);
});

test('a small typo still scores high', () => {
  const score = closeness('clok', 'clock');
  assert.ok(score >= 80 && score < 100, `unexpected score ${score}`);
});

test('unrelated answers score low', () => {
  assert.ok(closeness('banana', 'clock') < 35);
  assert.equal(closeness('', 'clock'), 0);
});

test('the daily riddle is deterministic for a date', () => {
  const date = new Date('2026-12-08T12:00:00Z');
  assert.deepEqual(getDailyRiddle('en', date), getDailyRiddle('en', date));
});

test('consecutive dates map to consecutive riddle indexes', () => {
  assert.equal(riddleIndexForDate('2026-01-01'), 0);
  assert.equal(riddleIndexForDate('2026-01-02'), 1);
  assert.equal(riddleIndexForDate('2026-01-03'), 2);
});


test('the Spanish bank has exactly 366 riddles', () => {
  assert.equal(riddlesEs.length, 366);
});

test('every Spanish riddle documents a source', () => {
  for (const riddle of riddlesEs) {
    assert.ok(riddle.source && riddle.source.length > 0, `missing source: ${riddle.question}`);
  }
});

test('no trivially short Spanish riddle', () => {
  for (const riddle of riddlesEs) {
    assert.ok(riddle.question.length >= 12, `too short: ${riddle.question}`);
    assert.ok(
      riddle.question.trim().split(/\s+/).length >= 3,
      `too few words: ${riddle.question}`
    );
  }
});

test('the Spanish bank has no duplicate questions', () => {
  const seen = new Set<string>();
  for (const riddle of riddlesEs) {
    const key = riddle.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    assert.ok(!seen.has(key), `duplicate Spanish question: ${riddle.question}`);
    seen.add(key);
  }
  assert.ok(riddlesEs.length > 0);
});

test('the daily riddle works in Spanish', () => {
  const date = new Date('2026-12-08T12:00:00Z');
  assert.deepEqual(
    getDailyRiddle('es', date),
    getDailyRiddle('es', date)
  );
});

test('the English bank has exactly 228 riddles', () => {
  assert.equal(riddles.length, 228);
});

test('the English bank has no duplicate questions', () => {
  const seen = new Set<string>();
  for (const riddle of riddles) {
    const key = riddle.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    assert.ok(!seen.has(key), `duplicate English question: ${riddle.question}`);
    seen.add(key);
  }
});

test('the English bank has no Spanish leftovers', () => {
  for (const riddle of riddles) {
    assert.ok(!/[¿¡]|\bqué\b|\bsoy\b/i.test(riddle.question), `Spanish leftover: ${riddle.question}`);
  }
});

test('every English solution is non-empty and clean', () => {
  for (const riddle of riddles) {
    assert.ok(riddle.solution.trim().length > 0);
    assert.ok(!/\.$/.test(riddle.solution), `trailing period: ${riddle.solution}`);
    assert.ok(!/lolz|olbiously|Got milk/i.test(riddle.solution), `bad solution: ${riddle.solution}`);
  }
});

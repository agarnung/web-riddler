import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  closeness,
  getDailyRiddle,
  getRiddleCount,
  normalizeAnswer,
  riddleIndexForDate,
} from './riddleLogic.ts';

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
  assert.deepEqual(getDailyRiddle(date), getDailyRiddle(date));
});

test('consecutive dates map to consecutive riddle indexes', () => {
  assert.equal(riddleIndexForDate('2026-01-01'), 0);
  assert.equal(riddleIndexForDate('2026-01-02'), 1);
  assert.equal(riddleIndexForDate('2026-01-03'), 2);
});

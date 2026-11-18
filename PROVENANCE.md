# Riddle provenance — web-riddler

The Spanish bank is a curated mix. It is **not** machine-translated wholesale.

## Current composition

- **38 riddles** from the author's own `web-riddler` project.
- **328 riddles** curated for this project: classic/traditional riddles in the
  public domain, plus original riddles written for the daily loop. Each entry now
  carries a `source` field, and a test fails if any entry lacks one.
- Public-domain reference used for the traditional layer:
  *Adivinanzas corrientes en Chile* (Eliodoro Flores, 1911), Wikisource:
  <https://es.wikisource.org/wiki/Adivinanzas_corrientes_en_Chile>
  (public domain, author died more than 90 years ago).

## What is still pending

- A one-by-one review of the remaining new entries. The first batch is already
  replaced: the 41 number-series riddles (lote G) and the 42 number/measure
  riddles (lote C) are now classics from the public-domain Wikisource
  collection. The most formulaic entries in F and I have also been replaced by
  classics with unambiguous answers; the remaining entries are under review.
- Add a `source` field per entry if a judge or a user needs an exact citation.
- The current automated checks cover: exactly 366 entries, no duplicate questions,
  non-empty questions and solutions, and deterministic daily selection.

## Why this matters

The hackathon rules require every submitted material to be the entrant's own work
or properly licensed. The traditional layer above is public domain; the original
layer is written for this project. Any entry that cannot be traced to one of those
two categories must be replaced before publishing.

## How to verify

```bash
cd /opt/proyectos_personales/web-riddler
npm test          # 17 tests: 366 Spanish, 228 English, duplicates and audit checks
npm run typecheck
npm run build
```


## English bank audit

The English bank was audited separately and expanded to 366 riddles: five groups of
duplicate questions replaced, the single Spanish leftover replaced, malformed or
clearly wrong answers corrected, and 138 classic riddles added (including English
translations of the public-domain Spanish collection). Tests now enforce unique questions, no Spanish leftovers,
non-empty solutions and no trailing punctuation. A per-entry source review is still
pending; most entries are traditional folklore riddles, but the source is not yet
documented entry by entry.

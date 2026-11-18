# Riddle provenance — web-riddler

The Spanish bank is a curated mix. It is **not** machine-translated wholesale.

## Current composition

- **38 riddles** from the author's own `web-riddler` project.
- **328 riddles** curated for this project: classic/traditional riddles in the
  public domain, plus original riddles written for the daily loop.
- Public-domain reference used for the traditional layer:
  *Adivinanzas corrientes en Chile* (Eliodoro Flores, 1911), Wikisource:
  <https://es.wikisource.org/wiki/Adivinanzas_corrientes_en_Chile>
  (public domain, author died more than 90 years ago).

## What is still pending

- A one-by-one review of the 328 new entries to replace any riddle that is too
  trivial, too close to a translation, or not clearly traditional/original.
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
npm test          # 10 tests, including 366 + no duplicate questions
npm run typecheck
npm run build
```

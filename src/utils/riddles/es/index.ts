import type { Riddle } from "../../riddleLogic";
import { riddlesEsA } from "./a";
import { riddlesEsB } from "./b";
import { riddlesEsC } from "./c";
import { riddlesEsD } from "./d";
import { riddlesEsE } from "./e";
import { riddlesEsF } from "./f";
import { riddlesEsG } from "./g";
import { riddlesEsH } from "./h";
import { riddlesEsI } from "./i";

const withSource = (list: Riddle[], source: string): Riddle[] =>
  list.map((riddle) => ({ ...riddle, source }));

export const riddlesEs: Riddle[] = [
  ...withSource(riddlesEsA, 'web-riddler (propio)'),
  ...withSource(riddlesEsB, 'tradicional / adaptado'),
  ...withSource(riddlesEsC, 'tradicional / Wikisource'),
  ...withSource(riddlesEsD, 'tradicional / lógica'),
  ...withSource(riddlesEsE, 'original'),
  ...withSource(riddlesEsF, 'tradicional / clásicos'),
  ...withSource(riddlesEsG, 'tradicional / Wikisource'),
  ...withSource(riddlesEsH, 'tradicional / cultura general'),
  ...withSource(riddlesEsI, 'original'),
];

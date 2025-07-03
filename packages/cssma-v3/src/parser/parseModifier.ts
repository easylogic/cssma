import type { CssmaContext } from '../types';
// 단일 Tailwind modifier를 구조화된 객체로 파싱
import { parseModifier as parseModifierBase } from './modifiers';
import { ParsedClassToken } from './utils';

const modifierParsers = [
  parseModifierBase,
];

export function parseModifier(mod: string, context?: CssmaContext): ParsedClassToken | { type: 'unknown'; raw: string } {
  for (const parser of modifierParsers) {
    const result = parser(mod, context);
    if (result) return result;
  }
  return { type: 'unknown', raw: mod };
} 
// Tailwind CSS class string 파서 엔트리포인트

import { tokenize } from './tokenizer';
import { parseModifier } from './parseModifier';
import { parseUtility } from './parseUtility';
import type { ParsedModifier, ParsedUtility, ParsedClass, CssmaContext } from '../types';

export function parseClassName(input: string, context?: CssmaContext): ParsedClass {
  const tokens = tokenize(input);
  const modifiers: ParsedModifier[] = [];
  let utility: ParsedUtility | null = null;

  tokens.forEach((token) => {
    if (token.type === 'modifier') {
      const parsed = parseModifier(token.value, context);
      if (parsed && parsed.type !== 'unknown') {
        modifiers.push(parsed);
      }
    } else if (token.type === 'utility') {
      utility = parseUtility(token.value, context);
    }
  });

  return {
    original: input,
    modifiers,
    utility,
  };
}

export function parseClassList(input: string, context?: CssmaContext): ParsedClass[] {
  return input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cls) => parseClassName(cls, context));
} 
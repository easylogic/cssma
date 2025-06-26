// Tailwind CSS class string 파서 엔트리포인트

import { tokenize } from './tokenizer';
import { parseModifier } from './parseModifier';
import { ParsedModifiersImpl } from '../types';

export function parseClassName(input: string) {
  const tokens = tokenize(input);
  const modifiersImpl = new ParsedModifiersImpl();
  let utility: string | null = null;

  tokens.forEach((token) => {
    if (token.type === 'modifier') {
      const parsed = parseModifier(token.value);
      if (parsed && parsed.type !== 'unknown') {
        modifiersImpl.addModifier({ ...parsed, raw: token.value, priority: 0 });
      }
    } else if (token.type === 'utility') {
      utility = token.value;
    }
  });

  return {
    original: input,
    modifiers: modifiersImpl,
    utility,
  };
} 
import type { CssmaContext } from '../../types';

const directions = {
  '': 'all',
  'x': 'inline',
  'y': 'block',
  's': 'inline-start',
  'e': 'inline-end',
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
};

export interface ContextSpacingResult {
  type: string;
  value?: string | number;
  direction: string;
  raw: string;
  arbitrary: boolean;
  negative?: boolean;
  preset?: string;
}

/**
 * Context-based spacing preset parser (margin, padding 등)
 * @param token - m-4, mx-2, -mb-8 등 theme.spacing preset만 처리
 * @param prefix - 'm' | 'p' 등
 * @param type - 'margin' | 'padding' 등
 * @param context - CssmaContext (theme.spacing lookup)
 */
export function parseContextSpacingUtility({
  token,
  prefix,
  type,
  context
}: {
  token: string;
  prefix: string;
  type: string;
  context?: CssmaContext;
}): ContextSpacingResult | null {
  // 음수 처리
  const negative = token.startsWith('-');
  const t = negative ? token.slice(1) : token;
  // m-*, mx-*, my-*, ms-*, me-*, mt-*, mr-*, mb-*, ml-* (숫자 preset만)
  const regex = new RegExp(`^${prefix}([xysetrbl]?)-(\\d+)$`);
  const match = t.match(regex);
  if (!match) return null;
  const [, dir, val] = match;
  const direction = directions[dir] || 'all';
  // theme.spacing lookup (context 기반)
  if (context?.theme) {
    const themePath = `spacing.${val}`;
    const themeValue = context.theme(themePath);
    if (typeof themeValue === 'string' || typeof themeValue === 'number') {
      return {
        type,
        value: themeValue,
        direction,
        raw: token,
        arbitrary: false,
        negative,
        preset: themePath
      };
    }
  }
  return null;
} 
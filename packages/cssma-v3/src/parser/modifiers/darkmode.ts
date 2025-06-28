// darkmode modifier 파서 (예: dark, light)

import type { CssmaContext, DarkModeModifier } from '../../types';

export function parseDarkmodeModifier(token: string, context?: CssmaContext): DarkModeModifier | null {
  if (token === 'dark' || token === 'light') {
    return { type: 'darkmode', mode: token };
  }
  return null;
} 
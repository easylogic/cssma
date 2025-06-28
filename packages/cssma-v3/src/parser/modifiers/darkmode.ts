// darkmode modifier 파서 (예: dark, light)

import type { DarkmodeModifier } from '../../types';

export function parseDarkmodeModifier(token: string): DarkmodeModifier | null {
  if (token === 'dark' || token === 'light') {
    return { type: 'darkmode', mode: token };
  }
  return null;
} 
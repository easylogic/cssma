import type { DirectionModifier, CssmaContext } from '../../types';

export function parseDirectionModifier(mod: string, context?: CssmaContext): DirectionModifier | null {
  if (mod === 'rtl' || mod === 'ltr') {
    return { type: 'direction', value: mod };
  }
  return null;
} 
import type { DirectionModifier } from '../../types';

export function parseDirectionModifier(mod: string): DirectionModifier | null {
  if (mod === 'rtl' || mod === 'ltr') {
    return { type: 'direction', value: mod };
  }
  return null;
} 
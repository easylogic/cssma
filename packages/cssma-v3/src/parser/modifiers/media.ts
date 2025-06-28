import type { MediaModifier, CssmaContext } from '../../types';

export function parseMediaModifier(mod: string, context?: CssmaContext): MediaModifier | null {
  if (mod === 'motion-safe' || mod === 'motion-reduce' || mod === 'print') {
    return { type: 'media', name: mod };
  }
  return null;
} 
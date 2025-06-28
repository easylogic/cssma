import type { MediaModifier } from '../../types';

export function parseMediaModifier(mod: string): MediaModifier | null {
  if (mod === 'motion-safe' || mod === 'motion-reduce' || mod === 'print') {
    return { type: 'media', name: mod };
  }
  return null;
} 
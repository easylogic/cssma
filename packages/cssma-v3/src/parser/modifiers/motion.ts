// motion modifier 파서 (예: motion-safe, motion-reduce)

import type { MotionModifier, CssmaContext } from '../../types';

export function parseMotionModifier(mod: string, context?: CssmaContext): MotionModifier | null {
  if (mod === 'motion-safe') {
    return { type: 'motion', mode: 'safe' };
  }
  if (mod === 'motion-reduce') {
    return { type: 'motion', mode: 'reduce' };
  }
  return null;
} 
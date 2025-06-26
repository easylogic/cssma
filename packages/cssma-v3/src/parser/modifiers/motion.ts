// motion modifier 파서 (예: motion-safe, motion-reduce)

export function parseMotionModifier(token: string) {
  if (token === 'motion-safe') {
    return { type: 'motion', mode: 'safe' };
  }
  if (token === 'motion-reduce') {
    return { type: 'motion', mode: 'reduce' };
  }
  return null;
} 
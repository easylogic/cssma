export function parseMediaModifier(mod: string): any | null {
  if (mod === 'dark' || mod === 'motion-safe' || mod === 'motion-reduce' || mod === 'print') {
    return { type: 'media', name: mod };
  }
  return null;
} 
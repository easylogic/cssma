export function parseDirectionModifier(mod: string): any | null {
  if (mod === 'rtl' || mod === 'ltr') {
    return { type: 'direction', value: mod };
  }
  return null;
} 
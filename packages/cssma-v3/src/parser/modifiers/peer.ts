export function parsePeerModifier(mod: string): any | null {
  if (mod.startsWith('peer-')) {
    const state = mod.slice(5);
    if (!state) return null;
    return { type: 'peer', state };
  }
  return null;
} 
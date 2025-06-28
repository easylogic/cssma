import type { PeerModifier, CssmaContext } from '../../types';

export function parsePeerModifier(mod: string, context?: CssmaContext): PeerModifier | null {
  if (mod.startsWith('peer-')) {
    const state = mod.slice(5);
    if (!state) return null;
    return { type: 'peer', state };
  }
  return null;
} 
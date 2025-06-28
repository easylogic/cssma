import type { PeerModifier } from '../../types';

export function parsePeerModifier(mod: string): PeerModifier | null {
  if (mod.startsWith('peer-')) {
    const state = mod.slice(5);
    if (!state) return null;
    return { type: 'peer', state };
  }
  return null;
} 
import type { ArbitraryModifier } from '../../types';

export function parseArbitraryModifier(mod: string): ArbitraryModifier | null {
  if (mod.startsWith('[') && mod.endsWith(']')) {
    let selector = mod.slice(1, -1);
    return { type: 'arbitrary', selector };
  }
  return null;
} 
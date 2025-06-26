export function parseArbitraryModifier(mod: string): any | null {
  if (mod.startsWith('[') && mod.endsWith(']')) {
    let selector = mod.slice(1, -1);
    return { type: 'arbitrary', selector };
  }
  return null;
} 
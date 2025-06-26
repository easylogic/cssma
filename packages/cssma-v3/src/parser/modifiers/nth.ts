export function parseNthLastOfTypeModifier(mod: string): any | null {
  const prefix = 'nth-last-of-type-';
  if (mod.startsWith(prefix + '[') && mod.endsWith(']')) {
    const m = mod.match(/^nth-last-of-type-\[(.*)\]$/);
    if (m) return { type: 'nth-last-of-type', value: m[1] };
  }
  if (mod.startsWith(prefix)) {
    return { type: 'nth-last-of-type', value: mod.slice(prefix.length) };
  }
  return null;
}

export function parseNthOfTypeModifier(mod: string): any | null {
  const prefix = 'nth-of-type-';
  if (mod.startsWith(prefix + '[') && mod.endsWith(']')) {
    const m = mod.match(/^nth-of-type-\[(.*)\]$/);
    if (m) return { type: 'nth-of-type', value: m[1] };
  }
  if (mod.startsWith(prefix)) {
    return { type: 'nth-of-type', value: mod.slice(prefix.length) };
  }
  return null;
}

export function parseNthModifier(mod: string): any | null {
  const prefix = 'nth-';
  if (mod.startsWith(prefix + '[') && mod.endsWith(']')) {
    const m = mod.match(/^nth-\[(.*)\]$/);
    if (m) return { type: 'nth', value: m[1] };
  }
  if (mod.startsWith(prefix)) {
    return { type: 'nth', value: mod.slice(prefix.length) };
  }
  return null;
} 
// group modifier 파서 (예: group-hover, group-focus 등)

export function parseGroupModifier(mod: string): any | null {
  if (mod.startsWith('group-')) {
    const state = mod.slice(6);
    if (!state) return null;
    return { type: 'group', state };
  }
  return null;
} 
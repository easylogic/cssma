// state modifier 파서 (예: hover, focus, active 등)

export function parseStateModifier(mod: string): any | null {
  // state-[foo=bar] 형태
  if (mod.startsWith('state-[') && mod.endsWith(']')) {
    const m = mod.match(/^state-\[(.+?)=(.+)\]$/);
    if (m) {
      return {
        type: 'state',
        attr: m[1],
        value: m[2],
      };
    }
    return null;
  }
  if (mod === 'open' || mod === 'inert') {
    return { type: 'state', value: mod };
  }
  return null;
} 
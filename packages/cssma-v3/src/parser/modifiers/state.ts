// state modifier 파서 (예: hover, focus, active 등)

import type { StateModifier, CssmaContext } from '../../types';

export function parseStateModifier(mod: string, context?: CssmaContext): StateModifier | null {
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
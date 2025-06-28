import type { LogicalModifier } from '../../types';

export function parseLogicalModifier(mod: string): LogicalModifier | null {
  // has-[foo=bar] 형태
  if (mod.startsWith('has-[') && mod.endsWith(']')) {
    const m = mod.match(/^has-\[(.+?)=(.+)\]$/);
    if (m) {
      return {
        type: 'logical',
        op: 'has',
        value: { attr: m[1], value: m[2] },
      };
    }
    return null;
  }
  // not-[foo=bar] 형태
  if (mod.startsWith('not-[') && mod.endsWith(']')) {
    const m = mod.match(/^not-\[(.+?)=(.+)\]$/);
    if (m) {
      return {
        type: 'logical',
        op: 'not',
        value: { attr: m[1], value: m[2] },
      };
    }
    return null;
  }
  // 기본 형태
  if (mod.startsWith('has-')) {
    return { type: 'logical', op: 'has', value: mod.slice(4) };
  }
  if (mod.startsWith('not-')) {
    return { type: 'logical', op: 'not', value: mod.slice(4) };
  }
  return null;
} 
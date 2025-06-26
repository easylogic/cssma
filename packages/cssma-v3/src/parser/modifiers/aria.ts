export function parseAriaModifier(mod: string): any | null {
  // aria-[foo=bar] 형태
  if (mod.startsWith('aria-[') && mod.endsWith(']')) {
    // 예: aria-[sort=ascending]
    const m = mod.match(/^aria-\[(.+?)=(.+)\]$/);
    if (m) {
      return {
        type: 'aria',
        attr: 'aria-' + m[1],
        value: m[2],
      };
    }
    return null;
  }
  // aria-checked 등 단순 상태
  if (mod.startsWith('aria-')) {
    if (mod.length > 5) {
      return {
        type: 'aria',
        attr: mod.slice(5),
        value: 'true',
      };
    }
    // aria- 만 있을 때
    return { type: 'aria', attr: '', value: undefined };
  }
  return null;
} 
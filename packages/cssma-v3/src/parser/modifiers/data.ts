export function parseDataModifier(mod: string): any | null {
  // data-[foo=bar] 형태
  if (mod.startsWith('data-[') && mod.endsWith(']')) {
    // 예: data-[foo=bar]
    const m = mod.match(/^data-\[(.+?)=(.+)\]$/);
    if (m) {
      return {
        type: 'data',
        attr: 'data-' + m[1],
        value: m[2],
      };
    }
    return null;
  }
  // data-active 등 단순 상태
  if (mod.startsWith('data-')) {
    if (mod.length > 5) {
      return {
        type: 'data',
        attr: mod.slice(5),
        value: 'true',
      };
    }
    // data- 만 있을 때
    return { type: 'data', attr: '', value: undefined };
  }
  return null;
} 
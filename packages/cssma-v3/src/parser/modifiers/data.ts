import type { DataModifier, CssmaContext } from '../../types';

export function parseDataModifier(token: string, context?: CssmaContext): DataModifier | null {
  // data-[foo=bar] 형태
  if (token.startsWith('data-[') && token.endsWith(']')) {
    // 예: data-[foo=bar]
    const m = token.match(/^data-\[(.+?)=(.+)\]$/);
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
  if (token.startsWith('data-')) {
    if (token.length > 5) {
      return {
        type: 'data',
        attr: token.slice(5),
        value: 'true',
      };
    }
    // data- 만 있을 때
    return { type: 'data', attr: '', value: undefined };
  }
  return null;
} 
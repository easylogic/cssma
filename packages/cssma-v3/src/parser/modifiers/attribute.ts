// attribute modifier 파서 (예: [foo=bar], [data-state=open], [foo])

export function parseAttributeModifier(token: string) {
  // [foo=bar] 또는 [foo] 형태
  if (token.startsWith('[') && token.endsWith(']')) {
    const inner = token.slice(1, -1);
    if (!inner) return null;
    const eqIdx = inner.indexOf('=');
    if (eqIdx === -1) {
      // [foo] 형태
      return { type: 'attribute', attr: inner, value: undefined };
    } else {
      // [foo=bar] 형태
      return {
        type: 'attribute',
        attr: inner.slice(0, eqIdx),
        value: inner.slice(eqIdx + 1),
      };
    }
  }
  return null;
} 
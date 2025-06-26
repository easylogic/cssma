export function parseSupportsModifier(mod: string): any | null {
  // supports-[display:grid] 형태
  if (mod.startsWith('supports-[') && mod.endsWith(']')) {
    const m = mod.match(/^supports-\[(.*)\]$/);
    if (m) return { type: 'supports', query: m[1] };
  }
  // supports-hover, supports-focus 등
  if (mod.startsWith('supports-')) {
    const state = mod.slice(9);
    if (state) {
      // pseudo-class나 feature로 분기 가능
      if ([
        'hover', 'focus', 'active', 'visited', 'checked', 'disabled',
        'enabled', 'first', 'last', 'odd', 'even', 'empty', 'required', 'optional',
        'valid', 'invalid', 'user-valid', 'user-invalid', 'in-range', 'out-of-range',
        'default', 'indeterminate', 'placeholder-shown', 'autofill', 'read-only',
        'details-content', 'first-of-type', 'last-of-type', 'only-of-type',
        'nth', 'nth-of-type', 'nth-last-of-type', 'nth-last', 'before', 'after',
        'selection', 'marker', 'first-line', 'first-letter', 'backdrop',
      ].includes(state)) {
        return { type: 'supports', state };
      }
      // 기타 feature
      return { type: 'supports', feature: state };
    }
  }
  return null;
} 
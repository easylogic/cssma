// Pseudo-class modifier 파서
export function parsePseudoModifier(mod: string): any | null {
  const pseudo = [
    'hover', 'focus', 'active', 'visited', 'focus-within', 'focus-visible', 'checked', 'disabled', 'enabled', 'first', 'last', 'odd', 'even', 'empty', 'required', 'optional', 'valid', 'invalid', 'user-valid', 'user-invalid', 'in-range', 'out-of-range', 'default', 'indeterminate', 'placeholder-shown', 'autofill', 'read-only', 'details-content',
  ];
  if (pseudo.includes(mod)) {
    return { type: 'pseudo', name: mod };
  }
  return null;
} 
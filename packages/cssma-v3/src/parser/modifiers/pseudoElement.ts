export function parsePseudoElementModifier(mod: string): any | null {
  const pseudoElements = [
    'before', 'after', 'placeholder', 'selection', 'marker', 'first-line', 'first-letter', 'backdrop',
  ];
  if (pseudoElements.includes(mod)) {
    return { type: 'pseudo-element', name: mod };
  }
  return null;
} 
export function parseBreakpointModifier(mod: string): any | null {
  const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];
  if (breakpoints.includes(mod)) {
    return { type: 'breakpoint', name: mod };
  }
  return null;
} 
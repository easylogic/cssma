import type { BreakpointModifier, CssmaContext } from '../../types';

const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];


export function parseBreakpointModifier(mod: string, context?: CssmaContext): BreakpointModifier | null {
  if (breakpoints.includes(mod)) {
    return { type: 'breakpoint', name: mod };
  }
  return null;
} 
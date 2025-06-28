import type { BreakpointModifier } from '../../types';

const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];


export function parseBreakpointModifier(mod: string): BreakpointModifier | null {
  if (breakpoints.includes(mod)) {
    return { type: 'breakpoint', name: mod };
  }
  return null;
} 
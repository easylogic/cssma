import type { ParsedModifier } from '../types';
// 단일 Tailwind modifier를 구조화된 객체로 파싱
import { parsePseudoModifier } from './modifiers/pseudo';
import { parseDirectionModifier } from './modifiers/direction';
import { parseStateModifier } from './modifiers/state';
import { parseNthLastOfTypeModifier, parseNthOfTypeModifier, parseNthModifier } from './modifiers/nth';
import { parseBreakpointModifier } from './modifiers/breakpoint';
import { parseMediaModifier } from './modifiers/media';
import { parseGroupModifier } from './modifiers/group';
import { parsePeerModifier } from './modifiers/peer';
import { parseSupportsModifier } from './modifiers/supports';
import { parseContainerModifier } from './modifiers/container';
import { parseArbitraryModifier } from './modifiers/arbitrary';
import { parseDataModifier } from './modifiers/data';
import { parseAriaModifier } from './modifiers/aria';
import { parseLogicalModifier } from './modifiers/logical';
import { parsePseudoElementModifier } from './modifiers/pseudoElement';
import { parseMotionModifier } from './modifiers/motion';
import { parseDarkmodeModifier } from './modifiers/darkmode';

const modifierParsers = [
  parsePseudoModifier,
  parseDirectionModifier,
  parseStateModifier,
  parseNthLastOfTypeModifier,
  parseNthOfTypeModifier,
  parseNthModifier,
  parseBreakpointModifier,
  parseMediaModifier,
  parseMotionModifier,
  parseDarkmodeModifier,
  parseGroupModifier,
  parsePeerModifier,
  parseSupportsModifier,
  parseContainerModifier,
  parseArbitraryModifier,
  parseDataModifier,
  parseAriaModifier,
  parseLogicalModifier,
  parsePseudoElementModifier,
];

export function parseModifier(mod: string): ParsedModifier | { type: 'unknown'; raw: string } {
  for (const parser of modifierParsers) {
    const result = parser(mod);
    if (result) return result;
  }
  return { type: 'unknown', raw: mod };
} 
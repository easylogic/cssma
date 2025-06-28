// 파서 공통 유틸리티 함수 (추후 구현) 

import type { ParsedModifier } from '../types';

/**
 * Extracts the value inside [brackets] for a given prefix (e.g. border-t-[2vw] → 2vw)
 */
export function extractArbitraryValue(token: string, prefix: string): string | null {
  const m = token.match(new RegExp(`^${prefix}-\\[(.+)\\]$`));
  return m ? m[1].trim() : null;
}

/**
 * Checks if a value is a valid CSS length (e.g. 2vw, 1.5rem, 10px, 100%)
 */
export function isLengthValue(val: string): boolean {
  return /^\d+(\.\d+)?(px|em|rem|vw|vh|%|ch|ex|cm|mm|in|pt|pc)?$/.test(val);
}

/**
 * Checks if a value is a valid CSS color (hex, rgb, hsl, oklch, okhsl)
 */
export function isColorValue(val: string): boolean {
  return (
    /^(#([0-9a-fA-F]{3,8}))$/.test(val) ||
    /^rgb(a)?\(/.test(val) ||
    /^hsl(a)?\(/.test(val) ||
    /^oklch\(/.test(val) ||
    /^okhsl\(/.test(val)
  );
}

/**
 * Checks if a value is a pure number (integer or float)
 */
export function isNumberValue(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
}

/**
 * Selector 계열 modifier 타입 가드
 * (pseudo, pseudo-element, group, peer, state, logical, nth, nth-of-type, nth-last-of-type, attribute, aria, data)
 */
export function isSelectorModifier(mod: ParsedModifier): boolean {
  switch (mod.type) {
    case 'pseudo':
    case 'pseudo-element':
    case 'group':
    case 'peer':
    case 'state':
    case 'logical':
    case 'nth':
    case 'nth-of-type':
    case 'nth-last-of-type':
    case 'attribute':
    case 'aria':
    case 'data':
      return true;
    default:
      return false;
  }
}

/**
 * Responsive 계열 modifier 타입 가드
 * (responsive, breakpoint, container)
 */
export function isResponsiveModifier(mod: ParsedModifier): boolean {
  return mod.type === 'responsive' || mod.type === 'breakpoint' || mod.type === 'container';
}

/**
 * Media 계열 modifier 타입 가드
 * (media, darkmode, motion)
 */
export function isMediaModifier(mod: ParsedModifier): boolean {
  return mod.type === 'media' || mod.type === 'darkmode' || mod.type === 'motion';
}

/**
 * Arbitrary 계열 modifier 타입 가드
 * (arbitrary, attribute)
 */
export function isArbitraryModifier(mod: ParsedModifier): boolean {
  return mod.type === 'arbitrary' || mod.type === 'attribute';
}

/**
 * Tailwind 스타일 modifier 변환 우선순위 반환 함수
 * 1. Responsive (responsive, breakpoint, container)
 * 2. Media (media, darkmode, motion)
 * 3. Group/Peer (group, peer)
 * 4. State/Pseudo (pseudo, state, logical, nth, nth-of-type, nth-last-of-type, data, aria, attribute)
 * 5. Pseudo-element (pseudo-element)
 * 6. Arbitrary (arbitrary)
 * 기타: 99
 */
export function getModifierPriority(mod: ParsedModifier): number {
  if (isResponsiveModifier(mod)) return 1;
  if (isMediaModifier(mod)) return 2;
  if (mod.type === 'group' || mod.type === 'peer') return 3;
  if (
    mod.type === 'pseudo' ||
    mod.type === 'state' ||
    mod.type === 'logical' ||
    mod.type === 'nth' ||
    mod.type === 'nth-of-type' ||
    mod.type === 'nth-last-of-type' ||
    mod.type === 'data' ||
    mod.type === 'aria' ||
    mod.type === 'attribute'
  ) return 4;
  if (mod.type === 'pseudo-element') return 5;
  if (isArbitraryModifier(mod)) return 6;
  return 99;
}

/**
 * Tailwind 스타일 modifier 정렬 함수
 * (getModifierPriority를 이용해 오름차순 정렬)
 */
export function sortModifiersForSelector(modifiers: ParsedModifier[]): ParsedModifier[] {
  return [...modifiers].sort((a, b) => getModifierPriority(a) - getModifierPriority(b));
} 
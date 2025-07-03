// 파서 공통 유틸리티 함수 (추후 구현) 

import type { CssmaContext, ParsedModifier } from '../types';

/**
 * Extracts the value inside [brackets] for a given prefix (e.g. border-t-[2vw] → 2vw)
 */
export function extractArbitraryValue(token: string, prefix: string): string | null {
  const re = new RegExp(`^${prefix}-\\[(.+)\\]$`);
  const m = token.match(re);
  return m ? m[1].trim() : null;
}

/**
 * Checks if a value is a valid CSS length (e.g. 2vw, 1.5rem, 10px, 100%, -10%, -1.5rem)
 */
export function isLengthValue(val: string): boolean {
  return /^-?\d+(\.\d+)?(px|em|rem|vw|vh|%|ch|ex|cm|mm|in|pt|pc)?$/.test(val);
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
 * Checks if a value is a pure number (integer or float, 음수 포함)
 */
export function isNumberValue(val: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(val);
}

/**
 * Checks if a value is a valid CSS var() function (e.g. var(--foo))
 */
export function isVarFunction(val: string): boolean {
  return /^var\(--[a-zA-Z0-9-_]+\)$/.test(val);
}

/**
 * Checks if a value is a valid CSS calc() function (e.g. calc(100%-4rem), -calc(100%-4rem))
 */
export function isCalcFunction(val: string): boolean {
  return /^-?calc\(.+\)$/.test(val);
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

/**
 * context.theme에서 지정된 네임스페이스와 키로 값을 조회하고, 일관된 구조로 반환하는 범용 preset 유틸리티
 * 예: parseContextPresetUtility({ token: 'animate-spin', prefix: 'animate', type: 'animation', context, namespace: 'animation' })
 * → { type: 'animation', value: 'spin', raw: 'animate-spin', arbitrary: false, customProperty: false, preset: 'animation.spin' }
 */
export function parseContextPresetUtility({
  token,
  prefix,
  type,
  context,
  namespace
}: {
  token: string;
  prefix: string;
  type: string;
  context?: CssmaContext;
  namespace: string;
}): any | null {
  const re = new RegExp(`^${prefix}-([^\\s]+)$`);
  const match = token.match(re);
  if (match && context?.theme) {
    const key = match[1];
    const themePath = `${namespace}.${key}`;
    const themeValue = context.theme(themePath);
    console.log('themeValue', themeValue, themePath);
    if (themeValue !== undefined) {
      return {
        type,
        value: key,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset: themePath,
      };
    }
  }
  return null;
}

/**
 * Extracts a fraction value (e.g. 16/9) from a token with a given prefix (e.g. aspect-16/9, w-3/4).
 * Returns the fraction string if valid, otherwise null.
 *
 * @param token - The input token (e.g. 'aspect-16/9')
 * @param prefix - The prefix to match (e.g. 'aspect')
 * @returns The fraction string (e.g. '16/9') if valid, otherwise null
 */
export function parseFractionValue(token: string, prefix: string): string | null {
  const re = new RegExp(`^${prefix}-(\\d+\/\\d+)$`);
  const match = token.match(re);
  if (match) {
    // Optionally, validate denominator is not zero
    const [numerator, denominator] = match[1].split('/').map(Number);
    if (denominator !== 0) {
      return match[1];
    }
  }
  return null;
} 
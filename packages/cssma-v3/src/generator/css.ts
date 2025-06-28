import type { ParsedModifier, ParsedUtility } from '../types';
import { sortModifiersForSelector, isSelectorModifier } from '../parser/utils';
import { modifierSelectorPatterns, registerModifierSelectorPattern } from './patterns/modifierSelectorPatterns';
import { modifierWrapperPatterns, registerModifierWrapperPattern } from './patterns/modifierWrapperPatterns';
import { utilityPatterns, registerUtilityPattern } from './patterns/utilityPatterns';

// --- Main Generator Functions ---

export function modifierToSelector(mod: ParsedModifier): string {
  const pattern = modifierSelectorPatterns.find(p => p.match(mod));
  return pattern ? pattern.toSelector(mod) : '';
}

export function modifierToWrapper(mod: ParsedModifier): ((css: string) => string) | null {
  const pattern = modifierWrapperPatterns.find(p => p.match(mod));
  return pattern ? pattern.toWrapper(mod) : null;
}

export function utilityToCss(util: ParsedUtility): string {
  const pattern = utilityPatterns.find(p => p.match(util));
  return pattern ? pattern.toCss(util) : '';
}

export function generateCssRule(
  modifiers: ParsedModifier[],
  utility: ParsedUtility,
  baseClass: string
): string {
  // 1. selector 조립
  const selectorMods = sortModifiersForSelector(modifiers).filter(isSelectorModifier);
  const selector = selectorMods.map(modifierToSelector).join('') + `.${baseClass}`;

  // 2. utility → CSS rule
  const rule = utilityToCss(utility);

  // 3. 래퍼 계열 modifier 추출
  const wrappers = sortModifiersForSelector(modifiers)
    .map(modifierToWrapper)
    .filter(Boolean) as ((css: string) => string)[];

  // 4. 최종 CSS 조립
  let css = `${selector} { ${rule} }`;
  for (const wrap of wrappers.reverse()) {
    css = wrap(css);
  }
  return css;
}

// --- 확장/테스트를 위한 export ---
export {
  modifierSelectorPatterns,
  registerModifierSelectorPattern,
  modifierWrapperPatterns,
  registerModifierWrapperPattern,
  utilityPatterns,
  registerUtilityPattern,
}; 
import type { ParsedModifier } from '../../types';

/**
 * Modifier → Selector 패턴 테이블 (확장/프리셋 관리)
 *
 * 패턴은 registerModifierSelectorPattern()으로 등록하세요.
 */
export const modifierSelectorPatterns: Array<{
  match: (mod: ParsedModifier) => boolean;
  toSelector: (mod: ParsedModifier) => string;
}> = [];

/**
 * 패턴 등록 함수 (확장/프리셋에서 사용)
 */
export function registerModifierSelectorPattern(pattern: typeof modifierSelectorPatterns[0]) {
  modifierSelectorPatterns.push(pattern);
}

// --- 기본 패턴 등록 ---

// group modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'group',
  toSelector: mod => `.group:${(mod as any).state}`,
});

// peer modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'peer',
  toSelector: mod => `.peer:${(mod as any).state}`,
});

// pseudo modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'pseudo',
  toSelector: mod => `:${(mod as any).name}`,
});

// pseudo-element modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'pseudo-element',
  toSelector: mod => `::${(mod as any).name}`,
});

// state modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'state',
  toSelector: mod => `:${(mod as any).value}`,
});

// logical modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'logical',
  toSelector: mod => `:${(mod as any).op}(${(mod as any).value})`,
});

// nth modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'nth',
  toSelector: mod => `:nth-child(${(mod as any).value})`,
});

// nth-of-type modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'nth-of-type',
  toSelector: mod => `:nth-of-type(${(mod as any).value})`,
});

// nth-last-of-type modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'nth-last-of-type',
  toSelector: mod => `:nth-last-of-type(${(mod as any).value})`,
});

// attribute modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'attribute',
  toSelector: mod => `[${(mod as any).attr}${(mod as any).value ? `=${(mod as any).value}` : ''}]`,
});

// aria modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'aria',
  toSelector: mod => `[aria-${(mod as any).attr}${(mod as any).value ? `=${(mod as any).value}` : ''}]`,
});

// data modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'data',
  toSelector: mod => `[data-${(mod as any).attr}${(mod as any).value ? `=${(mod as any).value}` : ''}]`,
});

// arbitrary selector modifier
registerModifierSelectorPattern({
  match: mod => mod.type === 'arbitrary',
  toSelector: mod => (mod as any).selector,
}); 
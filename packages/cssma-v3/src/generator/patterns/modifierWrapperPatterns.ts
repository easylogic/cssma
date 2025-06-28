import type { ParsedModifier } from '../../types';

/**
 * Modifier → Wrapper 패턴 테이블 (확장/프리셋 관리)
 *
 * 패턴은 registerModifierWrapperPattern()으로 등록하세요.
 */
export const modifierWrapperPatterns: Array<{
  match: (mod: ParsedModifier) => boolean;
  toWrapper: (mod: ParsedModifier) => (css: string) => string;
}> = [];

/**
 * 패턴 등록 함수 (확장/프리셋에서 사용)
 */
export function registerModifierWrapperPattern(pattern: typeof modifierWrapperPatterns[0]) {
  modifierWrapperPatterns.push(pattern);
}

// --- 기본 패턴 등록 ---

// responsive(sm) modifier
registerModifierWrapperPattern({
  match: mod => mod.type === 'responsive' && (mod as any).variant === 'sm',
  toWrapper: () => css => `@media (min-width: 640px) { ${css} }`,
});

// darkmode(dark) modifier
registerModifierWrapperPattern({
  match: mod => mod.type === 'darkmode' && (mod as any).mode === 'dark',
  toWrapper: () => css => `@media (prefers-color-scheme: dark) { ${css} }`,
});

// media(motion-safe) modifier
registerModifierWrapperPattern({
  match: mod => mod.type === 'media' && (mod as any).name === 'motion-safe',
  toWrapper: () => css => `@media (prefers-reduced-motion: no-preference) { ${css} }`,
}); 
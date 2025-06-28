import type { ParsedUtility } from '../../types';

/**
 * Utility → CSS rule 패턴 테이블 (확장/프리셋 관리)
 *
 * 패턴은 registerUtilityPattern()으로 등록하세요.
 */
export const utilityPatterns: Array<{
  match: (util: ParsedUtility) => boolean;
  toCss: (util: ParsedUtility) => string;
}> = [];

/**
 * 패턴 등록 함수 (확장/프리셋에서 사용)
 */
export function registerUtilityPattern(pattern: typeof utilityPatterns[0]) {
  utilityPatterns.push(pattern);
}

// --- 기본 패턴 등록 ---

// background utility
registerUtilityPattern({
  match: util => util.type === 'background',
  toCss: util => `background-color: ${util.value};`,
});

// (다른 유틸리티 패턴 추가 가능) 
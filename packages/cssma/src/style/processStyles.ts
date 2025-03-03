import { parseStyles } from '../parser';
import { convertStylesToFigma } from '../converter';
import type { FigmaStyleProperties } from '../types';

export interface StyleProcessorOptions {
  parentLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
}

/**
 * Tailwind CSS 클래스 문자열을 Figma 스타일로 변환합니다.
 * 
 * @example
 * ```typescript
 * const figmaStyles = processStyles('w-[100px] h-[200px] bg-[#FF0000] p-[16px]');
 * // 결과:
 * // {
 * //   width: 100,
 * //   height: 200,
 * //   paddingTop: 16,
 * //   paddingRight: 16,
 * //   paddingBottom: 16,
 * //   paddingLeft: 16,
 * //   fills: [{
 * //     type: 'SOLID',
 * //     color: { r: 1, g: 0, b: 0 }
 * //   }]
 * // }
 * ```
 */
export function processStyles(
  classNames?: string,
  options: StyleProcessorOptions = {}
): FigmaStyleProperties {
  if (!classNames) return {};
  
  const parsedStyles = parseStyles(classNames);
  const result = convertStylesToFigma(parsedStyles, options);

  // 임의값이 있는 경우 프리셋 값 무시
  const hasArbitraryWidth = parsedStyles.some(
    style => style.property === 'width' && style.variant === 'arbitrary'
  );

  // width가 설정되어 있고 layoutSizingHorizontal이 없는 경우 FIXED로 설정
  if (result.width !== undefined && result.layoutSizingHorizontal === undefined) {
    result.layoutSizingHorizontal = 'FIXED';
  }

  // 임의값이 있는 경우 FIXED로 강제 설정
  if (hasArbitraryWidth) {
    result.layoutSizingHorizontal = 'FIXED';
  }

  // height가 설정되어 있고 layoutSizingVertical이 없는 경우 FIXED로 설정
  if (result.height !== undefined && result.layoutSizingVertical === undefined) {
    result.layoutSizingVertical = 'FIXED';
  }

  return result;
} 
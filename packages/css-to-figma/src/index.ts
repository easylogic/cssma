import { parseClasses } from './parser';
import { convertStylesToFigma } from './converter';
import type { FigmaStyleProperties } from './types';
export { figmaToTailwind } from './figmaToTailwind';

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
  classNames: string,
  options: StyleProcessorOptions = {}
): FigmaStyleProperties {
  const parsedStyles = parseClasses(classNames);
  return convertStylesToFigma(parsedStyles, options);
}



// 타입 내보내기
export type {
  FigmaStyleProperties,
  FigmaColor,
  FigmaPaint,
  FigmaEffect,
  FigmaLayoutProps,
  FigmaTextProps,
  FigmaGeometryProps
} from './types';

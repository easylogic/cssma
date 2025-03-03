import type { 
  FigmaStyleProperties, 
  FigmaColor, 
  FigmaPaint, 
  FigmaEffect, 
  FigmaLayoutProps, 
  FigmaTextProps, 
  FigmaGeometryProps,
  ParsedStyle
} from './types';

// processStyles 함수 import
export { processStyles, type StyleProcessorOptions } from './style/processStyles';

// 타입 내보내기
export type {
  FigmaColor,
  FigmaPaint,
  FigmaEffect,
  FigmaLayoutProps,
  FigmaTextProps,
  FigmaGeometryProps,
  FigmaStyleProperties,
  ParsedStyle
};

export * from './parser';
export * from './converter';

// apply 디렉토리의 함수들 내보내기
export * from './apply/applyStyles';

// createElement 함수들 내보내기 - 아직 구현되지 않음
// export * from './createElement';

// createNodeForData 함수들 내보내기
export * from './createNodeForData';
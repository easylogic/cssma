/**
 * Layout Parser - 레이아웃 관련 CSS 속성 파서
 * 
 * width, height, display, aspect-ratio, columns, break-after 등의
 * 레이아웃 관련 속성을 처리합니다.
 */

import { ParsedClass, LayoutStyles } from '../../types';

export class LayoutParser {
  /**
   * 레이아웃 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  static applyLayoutStyle(parsedClass: ParsedClass, styles: { layout?: LayoutStyles }): void {
    const { property, value } = parsedClass;
    
    if (!styles.layout) {
      styles.layout = {};
    }
    
    // 디스플레이 속성
    if (['flex', 'grid', 'block', 'inline', 'hidden'].includes(property)) {
      styles.layout.display = property === 'hidden' ? 'none' : property as any;
      return;
    }
    
    // 너비 속성
    if (property === 'w') {
      styles.layout.width = this.convertSizeValue(value);
      return;
    }
    
    // 높이 속성
    if (property === 'h') {
      styles.layout.height = this.convertSizeValue(value, 'height');
      return;
    }
    
    // 최대 너비 속성
    if (property === 'max-w') {
      styles.layout.maxWidth = this.convertSizeValue(value);
      return;
    }
    
    // 최대 높이 속성
    if (property === 'max-h') {
      styles.layout.maxHeight = this.convertSizeValue(value);
      return;
    }
    
    // 최소 너비 속성
    if (property === 'min-w') {
      styles.layout.minWidth = this.convertSizeValue(value);
      return;
    }
    
    // 최소 높이 속성
    if (property === 'min-h') {
      styles.layout.minHeight = this.convertSizeValue(value);
      return;
    }
    
    // 애스펙트 비율 속성
    if (property === 'aspect') {
      styles.layout.aspectRatio = this.convertAspectRatio(value);
      return;
    }
    
    // 컬럼 속성
    if (property === 'columns') {
      styles.layout.columns = this.convertColumnsValue(value);
      return;
    }
    
    // 브레이크 애프터 속성
    if (property === 'break-after') {
      if (['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'].includes(value)) {
        styles.layout.breakAfter = value as any;
      }
      return;
    }
    
    // 브레이크 비포어 속성
    if (property === 'break-before') {
      if (['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'].includes(value)) {
        styles.layout.breakBefore = value as any;
      }
      return;
    }
    
    // 브레이크 인사이드 속성
    if (property === 'break-inside') {
      if (['auto', 'avoid', 'avoid-page', 'avoid-column'].includes(value)) {
        styles.layout.breakInside = value as any;
      }
      return;
    }
    
    // 박스 데코레이션 브레이크 속성
    if (property === 'box-decoration') {
      if (['clone', 'slice'].includes(value)) {
        styles.layout.boxDecorationBreak = value as 'clone' | 'slice';
      }
      return;
    }
    
    // 박스 사이징 속성
    if (property === 'box-border') {
      styles.layout.boxSizing = 'border-box';
      return;
    }
    
    if (property === 'box-content') {
      styles.layout.boxSizing = 'content-box';
      return;
    }
    
    // 플로트 속성
    if (property === 'float') {
      if (['left', 'right', 'none', 'start', 'end'].includes(value)) {
        if (value === 'start') {
          styles.layout.float = 'inline-start';
        } else if (value === 'end') {
          styles.layout.float = 'inline-end';
        } else {
          styles.layout.float = value as 'left' | 'right' | 'none';
        }
      }
      return;
    }
    
    // 클리어 속성
    if (property === 'clear') {
      if (['left', 'right', 'both', 'none', 'start', 'end'].includes(value)) {
        if (value === 'start') {
          styles.layout.clear = 'inline-start';
        } else if (value === 'end') {
          styles.layout.clear = 'inline-end';
        } else {
          styles.layout.clear = value as 'left' | 'right' | 'both' | 'none';
        }
      }
      return;
    }
    
    // 아이솔레이션 속성
    if (property === 'isolate') {
      styles.layout.isolation = 'isolate';
      return;
    }
    
    if (property === 'isolation') {
      if (['auto', 'isolate'].includes(value)) {
        styles.layout.isolation = value as 'auto' | 'isolate';
      }
      return;
    }
  }

  /**
   * 크기 값을 변환합니다.
   * @param value 크기 값
   * @param dimension 차원 (width 또는 height)
   * @returns 변환된 크기 값
   */
  private static convertSizeValue(value: string, dimension: 'width' | 'height' = 'width'): string {
    if (value === 'full') return '100%';
    if (value === 'screen') return dimension === 'height' ? '100vh' : '100vw';
    if (value === 'auto') return 'auto';
    if (value === 'none') return 'none';
    if (value === '0') return '0';
    
    // 숫자만 있는 경우 (예: 4)
    if (/^\d+$/.test(value)) {
      return `${parseInt(value) * 4}px`;
    }
    
    // 소수점이 있는 경우 (예: 1.5)
    if (/^\d+\.\d+$/.test(value)) {
      return `${parseFloat(value) * 4}px`;
    }
    
    // 분수 형태인 경우 (예: 1/2)
    if (/^\d+\/\d+$/.test(value)) {
      const [numerator, denominator] = value.split('/').map(Number);
      return `${(numerator / denominator) * 100}%`;
    }
    
    // 임의 값인 경우 (예: [10px])
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.substring(1, value.length - 1);
    }
    
    return value;
  }

  /**
   * 애스펙트 비율 값을 변환합니다.
   * @param value 애스펙트 비율 값
   * @returns 변환된 애스펙트 비율 값
   */
  private static convertAspectRatio(value: string): string {
    if (value === 'auto') return 'auto';
    if (value === 'square') return '1/1';
    if (value === 'video') return '16/9';
    if (value.startsWith('(') && value.endsWith(')')) {
      // CSS 변수 처리
      return `var${value}`;
    }
    
    // 분수 형태 처리
    return value;
  }

  /**
   * 컬럼 값을 변환합니다.
   * @param value 컬럼 값
   * @returns 변환된 컬럼 값
   */
  private static convertColumnsValue(value: string): string | number {
    if (value === 'auto') return 'auto';
    
    if (/^\d+$/.test(value)) {
      // 숫자 값 처리 (columns-1, columns-2, columns-3 등)
      return parseInt(value);
    }
    
    if (['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].includes(value)) {
      // 크기 기반 값 처리 (columns-sm, columns-md 등)
      return `var(--container-${value})`;
    }
    
    if (value.startsWith('(') && value.endsWith(')')) {
      // CSS 변수 처리 (columns-(--my-columns))
      return `var${value}`;
    }
    
    // 기타 값 처리
    return value;
  }
} 
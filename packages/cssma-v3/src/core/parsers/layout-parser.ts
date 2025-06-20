/**
 * Layout Parser - 레이아웃 관련 CSS 속성 파서
 * 
 * width, height, display, aspect-ratio, columns, break-after 등의
 * 레이아웃 관련 속성을 처리합니다.
 */

import { ParsedClass, LayoutStyles } from '../../types';

export class LayoutParser {
  /**
   * 클래스명이 레이아웃 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 레이아웃 관련 클래스 여부
   */
  static isValidClass(className: string): boolean {
    // display 관련
    if (['flex', 'grid', 'block', 'inline', 'hidden', 'inline-block', 'inline-flex', 'inline-grid', 'table', 'table-cell', 'table-row', 'table-column', 'table-caption', 'list-item', 'contents', 'flow-root'].includes(className)) {
      return true;
    }
    
    // aspect-ratio 관련
    if (className.startsWith('aspect-')) return true;
    
    // columns 관련
    if (className.startsWith('columns-')) return true;
    
    // break-after 관련
    if (className.startsWith('break-after-')) return true;
    
    // break-before 관련
    if (className.startsWith('break-before-')) return true;
    
    // break-inside 관련
    if (className.startsWith('break-inside-')) return true;
    
    // box-decoration-break 관련
    if (className.startsWith('box-decoration-')) return true;
    
    // box-sizing 관련
    if (['box-border', 'box-content'].includes(className)) return true;
    
    // float 관련
    if (className.startsWith('float-')) return true;
    
    // clear 관련
    if (className.startsWith('clear-')) return true;
    
    // isolation 관련
    if (['isolate', 'isolation-auto'].includes(className)) return true;
    if (className.startsWith('isolation-')) return true;
    
    // object-fit 관련
    if (['object-contain', 'object-cover', 'object-fill', 'object-none', 'object-scale-down'].includes(className)) return true;
    
    // object-position 관련
    if (['object-bottom', 'object-center', 'object-left', 'object-left-bottom', 'object-left-top', 
         'object-right', 'object-right-bottom', 'object-right-top', 'object-top', 'object-top-left', 
         'object-bottom-right'].includes(className)) return true;
    
    return false;
  }

  /**
   * 클래스명을 파싱하여 속성과 값을 추출합니다.
   * @param className 클래스명
   * @returns 파싱된 결과
   */
  static parseValue(className: string): { property: string; value: string; isArbitrary: boolean } | null {
    // display 관련
    if (['flex', 'grid', 'block', 'inline', 'hidden', 'inline-block', 'inline-flex', 'inline-grid', 'table', 'table-cell', 'table-row', 'table-column', 'table-caption', 'list-item', 'contents', 'flow-root'].includes(className)) {
      return { property: className, value: '', isArbitrary: false };
    }
    
    // aspect-ratio 관련
    if (className.startsWith('aspect-')) {
      const value = className.slice('aspect-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      const isCssVar = value.startsWith('(') && value.endsWith(')');
      return {
        property: 'aspect',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary: isArbitrary || isCssVar
      };
    }
    
    // columns 관련
    if (className.startsWith('columns-')) {
      const value = className.slice('columns-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      const isCssVar = value.startsWith('(') && value.endsWith(')');
      return {
        property: 'columns',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary: isArbitrary || isCssVar
      };
    }
    
    // break-after 관련
    if (className.startsWith('break-after-')) {
      const value = className.slice('break-after-'.length);
      return {
        property: 'break-after',
        value: value,
        isArbitrary: false
      };
    }
    
    // break-before 관련
    if (className.startsWith('break-before-')) {
      const value = className.slice('break-before-'.length);
      return {
        property: 'break-before',
        value: value,
        isArbitrary: false
      };
    }
    
    // break-inside 관련
    if (className.startsWith('break-inside-')) {
      const value = className.slice('break-inside-'.length);
      return {
        property: 'break-inside',
        value: value,
        isArbitrary: false
      };
    }
    
    // box-decoration-break 관련
    if (className.startsWith('box-decoration-')) {
      const value = className.slice('box-decoration-'.length);
      return {
        property: 'box-decoration',
        value: value,
        isArbitrary: false
      };
    }
    
    // box-sizing 관련
    if (className === 'box-border') {
      return { property: 'box', value: 'border', isArbitrary: false };
    }
    if (className === 'box-content') {
      return { property: 'box', value: 'content', isArbitrary: false };
    }
    
    // float 관련
    if (className.startsWith('float-')) {
      const value = className.slice('float-'.length);
      return {
        property: 'float',
        value: value,
        isArbitrary: false
      };
    }
    
    // clear 관련
    if (className.startsWith('clear-')) {
      const value = className.slice('clear-'.length);
      return {
        property: 'clear',
        value: value,
        isArbitrary: false
      };
    }
    
    // isolation 관련
    if (className === 'isolate') {
      return { property: 'isolate', value: '', isArbitrary: false };
    }
    if (className.startsWith('isolation-')) {
      const value = className.slice('isolation-'.length);
      return {
        property: 'isolation',
        value: value,
        isArbitrary: false
      };
    }
    
    // object-fit 관련
    if (['object-contain', 'object-cover', 'object-fill', 'object-none', 'object-scale-down'].includes(className)) {
      const value = className.slice('object-'.length);
      return {
        property: 'object',
        value: value === 'scale-down' ? 'scale-down' : value,
        isArbitrary: false
      };
    }
    
    // object-position 관련
    if (['object-bottom', 'object-center', 'object-left', 'object-left-bottom', 'object-left-top', 
         'object-right', 'object-right-bottom', 'object-right-top', 'object-top', 'object-top-left', 
         'object-bottom-right'].includes(className)) {
      const value = className.slice('object-'.length);
      let position = value;
      
      // Convert compound positions
      if (value === 'left-bottom') position = 'left bottom';
      else if (value === 'left-top') position = 'left top';
      else if (value === 'right-bottom') position = 'right bottom';
      else if (value === 'right-top') position = 'right top';
      else if (value === 'top-left') position = 'top left';
      else if (value === 'bottom-right') position = 'bottom right';
      
      return {
        property: 'object-position',
        value: position,
        isArbitrary: false
      };
    }
    
    return null;
  }

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
      if (['auto', 'avoid', 'avoid-page', 'avoid-column', 'all', 'page', 'left', 'right', 'column'].includes(value)) {
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
    if (property === 'box') {
      if (value === 'border') {
        styles.layout.boxSizing = 'border-box';
      } else if (value === 'content') {
        styles.layout.boxSizing = 'content-box';
      }
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
    
    // object-fit 속성
    if (property === 'object') {
      if (['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value)) {
        styles.layout.objectFit = value as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
      }
      return;
    }
    
    // object-position 속성
    if (property === 'object-position') {
      styles.layout.objectPosition = value;
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
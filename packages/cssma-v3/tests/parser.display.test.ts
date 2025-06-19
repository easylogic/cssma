import { describe, test, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Display Parser Tests', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Basic Display Values', () => {
    test.each([
      ['inline', 'inline'],
      ['block', 'block'],
      ['inline-block', 'inline-block'],
      ['flow-root', 'flow-root'],
      ['flex', 'flex'],
      ['inline-flex', 'inline-flex'],
      ['grid', 'grid'],
      ['inline-grid', 'inline-grid'],
      ['contents', 'contents'],
      ['hidden', 'none']
    ])('%s should parse and apply display style', (className, expectedValue) => {
      // 1. 파싱 검증
      const result = parser.parseClassName(className);
      expect(result).toBeTruthy();
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('display');

      // 2. 스타일 적용 검증
      const styles = parser.parse(className);
      expect(styles.flexboxGrid).toBeDefined();
      expect(styles.flexboxGrid.display).toBe(expectedValue);
    });
  });

  describe('Table Display Values', () => {
    test.each([
      ['table', 'table'],
      ['inline-table', 'inline-table'],
      ['table-caption', 'table-caption'],
      ['table-cell', 'table-cell'],
      ['table-column', 'table-column'],
      ['table-column-group', 'table-column-group'],
      ['table-footer-group', 'table-footer-group'],
      ['table-header-group', 'table-header-group'],
      ['table-row-group', 'table-row-group'],
      ['table-row', 'table-row']
    ])('%s should parse and apply display style', (className, expectedValue) => {
      // 1. 파싱 검증
      const result = parser.parseClassName(className);
      expect(result).toBeTruthy();
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('display');

      // 2. 스타일 적용 검증
      const styles = parser.parse(className);
      expect(styles.flexboxGrid).toBeDefined();
      expect(styles.flexboxGrid.display).toBe(expectedValue);
    });
  });

  describe('List Item Display', () => {
    test('list-item should parse and apply display style', () => {
      // 1. 파싱 검증
      const result = parser.parseClassName('list-item');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('display');

      // 2. 스타일 적용 검증
      const styles = parser.parse('list-item');
      expect(styles.flexboxGrid).toBeDefined();
      expect(styles.flexboxGrid.display).toBe('list-item');
    });
  });

  describe('Screen Reader Only Classes', () => {
    test('sr-only should apply comprehensive screen reader styles', () => {
      // 1. 파싱 검증
      const result = parser.parseClassName('sr-only');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('srOnly');

      // 2. 스타일 적용 검증 - 모든 sr-only 속성들
      const styles = parser.parse('sr-only');
      expect(styles.flexboxGrid).toBeDefined();
      expect(styles.flexboxGrid.position).toBe('absolute');
      expect(styles.flexboxGrid.width).toBe('1px');
      expect(styles.flexboxGrid.height).toBe('1px');
      expect(styles.flexboxGrid.padding).toBe('0');
      expect(styles.flexboxGrid.margin).toBe('-1px');
      expect(styles.flexboxGrid.overflow).toBe('hidden');
      expect(styles.flexboxGrid.clip).toBe('rect(0, 0, 0, 0)');
      expect(styles.flexboxGrid.whiteSpace).toBe('nowrap');
      expect(styles.flexboxGrid.borderWidth).toBe('0');
    });

    test('not-sr-only should reset screen reader styles', () => {
      // 1. 파싱 검증
      const result = parser.parseClassName('not-sr-only');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('srOnly');

      // 2. 스타일 적용 검증 - 모든 not-sr-only 속성들
      const styles = parser.parse('not-sr-only');
      expect(styles.flexboxGrid).toBeDefined();
      expect(styles.flexboxGrid.position).toBe('static');
      expect(styles.flexboxGrid.width).toBe('auto');
      expect(styles.flexboxGrid.height).toBe('auto');
      expect(styles.flexboxGrid.padding).toBe('0');
      expect(styles.flexboxGrid.margin).toBe('0');
      expect(styles.flexboxGrid.overflow).toBe('visible');
      expect(styles.flexboxGrid.clip).toBe('auto');
      expect(styles.flexboxGrid.whiteSpace).toBe('normal');
    });
  });

  describe('Responsive Display', () => {
    test('responsive display classes should work', () => {
      const testCases = [
        { className: 'md:block', breakpoint: 'md', value: 'block' },
        { className: 'lg:flex', breakpoint: 'lg', value: 'flex' },
        { className: 'xl:grid', breakpoint: 'xl', value: 'grid' },
        { className: 'sm:hidden', breakpoint: 'sm', value: 'none' }
      ];

      testCases.forEach(({ className, breakpoint, value }) => {
        const styles = parser.parse(className);
        expect(styles.breakpoints).toBeDefined();
        expect(styles.breakpoints![breakpoint]).toBeDefined();
        expect(styles.breakpoints![breakpoint].flexboxGrid).toBeDefined();
        expect(styles.breakpoints![breakpoint].flexboxGrid!.display).toBe(value);
      });
    });
  });

  describe('State Modifier Display', () => {
    test('display with state modifiers should work', () => {
      const testCases = [
        { className: 'hover:block', state: 'hover', value: 'block' },
        { className: 'focus:flex', state: 'focus', value: 'flex' },
        { className: 'active:grid', state: 'active', value: 'grid' }
      ];

      testCases.forEach(({ className, state, value }) => {
        const styles = parser.parse(className);
        expect(styles.states).toBeDefined();
        expect(styles.states![state]).toBeDefined();
        expect(styles.states![state].flexboxGrid).toBeDefined();
        expect(styles.states![state].flexboxGrid!.display).toBe(value);
      });
    });
  });

  describe('Complex Display Combinations', () => {
    test('responsive + state modifiers should work', () => {
      const styles = parser.parse('md:hover:flex');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['md']).toBeDefined();
      expect(styles.breakpoints!['md'].states).toBeDefined();
      expect(styles.breakpoints!['md'].states!['hover']).toBeDefined();
      expect(styles.breakpoints!['md'].states!['hover'].flexboxGrid).toBeDefined();
      expect(styles.breakpoints!['md'].states!['hover'].flexboxGrid!.display).toBe('flex');
    });

    test('screen reader only with responsive should work', () => {
      const styles = parser.parse('sm:not-sr-only');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['sm']).toBeDefined();
      expect(styles.breakpoints!['sm'].flexboxGrid).toBeDefined();
      expect(styles.breakpoints!['sm'].flexboxGrid!.position).toBe('static');
      expect(styles.breakpoints!['sm'].flexboxGrid!.width).toBe('auto');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('unknown display class should return null', () => {
      const result = parser.parseClassName('display-unknown');
      expect(result).toBeTruthy();
    });

    test('malformed display class should return null', () => {
      const result = parser.parseClassName('block-');
      expect(result).toBeTruthy();
    });
  });

  describe('Performance and Integration', () => {
    test('multiple display classes should parse efficiently', () => {
      const classNames = [
        'block', 'inline', 'flex', 'grid', 'table', 
        'hidden', 'sr-only', 'not-sr-only', 'contents', 'flow-root'
      ];
      
      const startTime = performance.now();
      classNames.forEach(className => {
        parser.parse(className);
      });
      const endTime = performance.now();
      
      // 성능 테스트: 10개 클래스를 10ms 이내에 파싱
      expect(endTime - startTime).toBeLessThan(10);
    });

    test('display classes should not conflict with other categories', () => {
      // block과 관련된 다른 카테고리 클래스들이 있는지 확인
      const blockResult = parser.parseClassName('block');
      const paddingBlockResult = parser.parseClassName('p-4');
      
      expect(blockResult?.category).toBe('flexbox-grid');
      expect(paddingBlockResult?.category).toBe('spacing');
      
      // 서로 다른 카테고리여야 함
      expect(blockResult?.category).not.toBe(paddingBlockResult?.category);
    });
  });
}); 
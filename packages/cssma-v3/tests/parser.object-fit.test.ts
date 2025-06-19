import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - Object Fit', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Basic Object Fit Values', () => {
    it('object-contain 클래스 파싱', () => {
      const result = parser.parseClassName('object-contain');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('object');
      expect(result?.value).toBe('contain');

      const styles = parser.parse('object-contain');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.objectFit).toBe('contain');
    });

    it('object-cover 클래스 파싱', () => {
      const result = parser.parseClassName('object-cover');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('object');
      expect(result?.value).toBe('cover');

      const styles = parser.parse('object-cover');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.objectFit).toBe('cover');
    });

    it('object-fill 클래스 파싱', () => {
      const result = parser.parseClassName('object-fill');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('object');
      expect(result?.value).toBe('fill');

      const styles = parser.parse('object-fill');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.objectFit).toBe('fill');
    });

    it('object-none 클래스 파싱', () => {
      const result = parser.parseClassName('object-none');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('object');
      expect(result?.value).toBe('none');

      const styles = parser.parse('object-none');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.objectFit).toBe('none');
    });

    it('object-scale-down 클래스 파싱', () => {
      const result = parser.parseClassName('object-scale-down');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('object');
      expect(result?.value).toBe('scale-down');

      const styles = parser.parse('object-scale-down');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.objectFit).toBe('scale-down');
    });
  });

  describe('Object Position Values', () => {
    test('object-center sets object position to center', () => {
      const result = parser.parse('object-center');
      expect(result.overflow?.objectPosition).toBe('center');
    });

    test('object-top sets object position to top', () => {
      const result = parser.parse('object-top');
      expect(result.overflow?.objectPosition).toBe('top');
    });

    test('object-left-bottom sets object position to left bottom', () => {
      const result = parser.parse('object-left-bottom');
      expect(result.overflow?.objectPosition).toBe('left bottom');
    });

    test('object-right-top sets object position to right top', () => {
      const result = parser.parse('object-right-top');
      expect(result.overflow?.objectPosition).toBe('right top');
    });

    test('object-top-left sets object position to top left', () => {
      const result = parser.parse('object-top-left');
      expect(result.overflow?.objectPosition).toBe('top left');
    });

    test('object-bottom-right sets object position to bottom right', () => {
      const result = parser.parse('object-bottom-right');
      expect(result.overflow?.objectPosition).toBe('bottom right');
    });
  });

  describe('Responsive Object Fit', () => {
    it('md:object-cover 반응형 처리', () => {
      const styles = parser.parse('md:object-cover');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['md']).toBeDefined();
      expect(styles.breakpoints!['md'].overflow).toBeDefined();
      expect(styles.breakpoints!['md'].overflow!.objectFit).toBe('cover');
    });
  });

  describe('State Modifiers', () => {
    it('hover:object-cover 상태 처리', () => {
      const styles = parser.parse('hover:object-cover');
      expect(styles.states).toBeDefined();
      expect(styles.states!['hover']).toBeDefined();
      expect(styles.states!['hover'].overflow).toBeDefined();
      expect(styles.states!['hover'].overflow!.objectFit).toBe('cover');
    });
  });
});

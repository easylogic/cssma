import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - Overflow', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Basic Overflow Values', () => {
    it('overflow-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overflow-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflow).toBe('auto');
    });

    it('overflow-hidden 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-hidden');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow');
      expect(result?.value).toBe('hidden');

      const styles = parser.parse('overflow-hidden');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflow).toBe('hidden');
    });

    it('overflow-clip 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-clip');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow');
      expect(result?.value).toBe('clip');

      const styles = parser.parse('overflow-clip');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflow).toBe('clip');
    });

    it('overflow-visible 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-visible');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow');
      expect(result?.value).toBe('visible');

      const styles = parser.parse('overflow-visible');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflow).toBe('visible');
    });

    it('overflow-scroll 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-scroll');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow');
      expect(result?.value).toBe('scroll');

      const styles = parser.parse('overflow-scroll');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflow).toBe('scroll');
    });
  });

  describe('Overflow X Values', () => {
    it('overflow-x-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-x-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-x');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overflow-x-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowX).toBe('auto');
    });

    it('overflow-x-hidden 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-x-hidden');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-x');
      expect(result?.value).toBe('hidden');

      const styles = parser.parse('overflow-x-hidden');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowX).toBe('hidden');
    });

    it('overflow-x-clip 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-x-clip');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-x');
      expect(result?.value).toBe('clip');

      const styles = parser.parse('overflow-x-clip');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowX).toBe('clip');
    });

    it('overflow-x-visible 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-x-visible');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-x');
      expect(result?.value).toBe('visible');

      const styles = parser.parse('overflow-x-visible');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowX).toBe('visible');
    });

    it('overflow-x-scroll 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-x-scroll');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-x');
      expect(result?.value).toBe('scroll');

      const styles = parser.parse('overflow-x-scroll');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowX).toBe('scroll');
    });
  });

  describe('Overflow Y Values', () => {
    it('overflow-y-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-y-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-y');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overflow-y-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowY).toBe('auto');
    });

    it('overflow-y-hidden 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-y-hidden');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-y');
      expect(result?.value).toBe('hidden');

      const styles = parser.parse('overflow-y-hidden');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowY).toBe('hidden');
    });

    it('overflow-y-clip 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-y-clip');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-y');
      expect(result?.value).toBe('clip');

      const styles = parser.parse('overflow-y-clip');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowY).toBe('clip');
    });

    it('overflow-y-visible 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-y-visible');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-y');
      expect(result?.value).toBe('visible');

      const styles = parser.parse('overflow-y-visible');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowY).toBe('visible');
    });

    it('overflow-y-scroll 클래스 파싱', () => {
      const result = parser.parseClassName('overflow-y-scroll');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overflow-y');
      expect(result?.value).toBe('scroll');

      const styles = parser.parse('overflow-y-scroll');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overflowY).toBe('scroll');
    });
  });

  describe('Responsive Overflow', () => {
    it('md:overflow-hidden 반응형 처리', () => {
      const styles = parser.parse('md:overflow-hidden');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['md']).toBeDefined();
      expect(styles.breakpoints!['md'].overflow).toBeDefined();
      expect(styles.breakpoints!['md'].overflow!.overflow).toBe('hidden');
    });

    it('lg:overflow-x-auto 반응형 처리', () => {
      const styles = parser.parse('lg:overflow-x-auto');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['lg']).toBeDefined();
      expect(styles.breakpoints!['lg'].overflow).toBeDefined();
      expect(styles.breakpoints!['lg'].overflow!.overflowX).toBe('auto');
    });
  });

  describe('State Modifiers', () => {
    it('hover:overflow-scroll 상태 처리', () => {
      const styles = parser.parse('hover:overflow-scroll');
      expect(styles.states).toBeDefined();
      expect(styles.states![':hover']).toBeDefined();
      expect(styles.states![':hover'].overflow).toBeDefined();
      expect(styles.states![':hover'].overflow!.overflow).toBe('scroll');
    });

    it('focus:overflow-y-visible 상태 처리', () => {
      const styles = parser.parse('focus:overflow-y-visible');
      expect(styles.states).toBeDefined();
      expect(styles.states![':focus']).toBeDefined();
      expect(styles.states![':focus'].overflow).toBeDefined();
      expect(styles.states![':focus'].overflow!.overflowY).toBe('visible');
    });
  });
}); 
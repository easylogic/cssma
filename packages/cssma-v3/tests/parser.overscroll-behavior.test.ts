import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - Overscroll Behavior', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Basic Overscroll Behavior Values', () => {
    it('overscroll-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overscroll-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehavior).toBe('auto');
    });

    it('overscroll-contain 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-contain');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll');
      expect(result?.value).toBe('contain');

      const styles = parser.parse('overscroll-contain');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehavior).toBe('contain');
    });

    it('overscroll-none 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-none');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll');
      expect(result?.value).toBe('none');

      const styles = parser.parse('overscroll-none');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehavior).toBe('none');
    });
  });

  describe('Overscroll X Values', () => {
    it('overscroll-x-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-x-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-x');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overscroll-x-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorX).toBe('auto');
    });

    it('overscroll-x-contain 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-x-contain');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-x');
      expect(result?.value).toBe('contain');

      const styles = parser.parse('overscroll-x-contain');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorX).toBe('contain');
    });

    it('overscroll-x-none 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-x-none');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-x');
      expect(result?.value).toBe('none');

      const styles = parser.parse('overscroll-x-none');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorX).toBe('none');
    });
  });

  describe('Overscroll Y Values', () => {
    it('overscroll-y-auto 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-y-auto');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-y');
      expect(result?.value).toBe('auto');

      const styles = parser.parse('overscroll-y-auto');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorY).toBe('auto');
    });

    it('overscroll-y-contain 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-y-contain');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-y');
      expect(result?.value).toBe('contain');

      const styles = parser.parse('overscroll-y-contain');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorY).toBe('contain');
    });

    it('overscroll-y-none 클래스 파싱', () => {
      const result = parser.parseClassName('overscroll-y-none');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-y');
      expect(result?.value).toBe('none');

      const styles = parser.parse('overscroll-y-none');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorY).toBe('none');
    });
  });

  describe('Responsive Overscroll Behavior', () => {
    it('md:overscroll-contain 반응형 처리', () => {
      const styles = parser.parse('md:overscroll-contain');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['md']).toBeDefined();
      expect(styles.breakpoints!['md'].overflow).toBeDefined();
      expect(styles.breakpoints!['md'].overflow!.overscrollBehavior).toBe('contain');
    });

    it('lg:overscroll-x-none 반응형 처리', () => {
      const styles = parser.parse('lg:overscroll-x-none');
      expect(styles.breakpoints).toBeDefined();
      expect(styles.breakpoints!['lg']).toBeDefined();
      expect(styles.breakpoints!['lg'].overflow).toBeDefined();
      expect(styles.breakpoints!['lg'].overflow!.overscrollBehaviorX).toBe('none');
    });
  });

  describe('State Modifiers', () => {
    it('hover:overscroll-none 상태 처리', () => {
      const styles = parser.parse('hover:overscroll-none');
      expect(styles.states).toBeDefined();
      expect(styles.states![':hover']).toBeDefined();
      expect(styles.states![':hover'].overflow).toBeDefined();
      expect(styles.states![':hover'].overflow!.overscrollBehavior).toBe('none');
    });

    it('focus:overscroll-y-contain 상태 처리', () => {
      const styles = parser.parse('focus:overscroll-y-contain');
      expect(styles.states).toBeDefined();
      expect(styles.states![':focus']).toBeDefined();
      expect(styles.states![':focus'].overflow).toBeDefined();
      expect(styles.states![':focus'].overflow!.overscrollBehaviorY).toBe('contain');
    });
  });

  describe('Arbitrary Values', () => {
    it('overscroll-[contain] 임의 값 처리', () => {
      const result = parser.parseClassName('overscroll-[contain]');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll');
      expect(result?.value).toBe('contain');
      expect(result?.isArbitrary).toBe(true);

      const styles = parser.parse('overscroll-[contain]');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehavior).toBe('contain');
    });

    it('overscroll-x-[none] 임의 값 처리', () => {
      const result = parser.parseClassName('overscroll-x-[none]');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll-x');
      expect(result?.value).toBe('none');
      expect(result?.isArbitrary).toBe(true);

      const styles = parser.parse('overscroll-x-[none]');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehaviorX).toBe('none');
    });
  });

  describe('CSS Variables', () => {
    it('overscroll-[var(--my-overscroll)] CSS 변수 처리', () => {
      const result = parser.parseClassName('overscroll-[var(--my-overscroll)]');
      expect(result).toBeTruthy();
      expect(result?.category).toBe('overflow');
      expect(result?.property).toBe('overscroll');
      expect(result?.value).toBe('var(--my-overscroll)');
      expect(result?.isArbitrary).toBe(true);

      const styles = parser.parse('overscroll-[var(--my-overscroll)]');
      expect(styles.overflow).toBeDefined();
      expect(styles.overflow.overscrollBehavior).toBe('var(--my-overscroll)');
    });
  });
});

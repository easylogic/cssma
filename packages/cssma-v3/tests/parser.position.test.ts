import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Position Parser', () => {
  let parser: CSSParser;

  beforeEach(() => {
    parser = new CSSParser(loadConfig(), loadPreset());
  });

  describe('Position Types', () => {
    test('should parse static positioning', () => {
      const result = parser.parse('static');
      expect(result.position?.position).toBe('static');
      expect(result.position?.type).toBe('static');
    });

    test('should parse relative positioning', () => {
      const result = parser.parse('relative');
      expect(result.position?.position).toBe('relative');
      expect(result.position?.type).toBe('relative');
    });

    test('should parse absolute positioning', () => {
      const result = parser.parse('absolute');
      expect(result.position?.position).toBe('absolute');
      expect(result.position?.type).toBe('absolute');
    });

    test('should parse fixed positioning', () => {
      const result = parser.parse('fixed');
      expect(result.position?.position).toBe('fixed');
      expect(result.position?.type).toBe('fixed');
    });

    test('should parse sticky positioning', () => {
      const result = parser.parse('sticky');
      expect(result.position?.position).toBe('sticky');
      expect(result.position?.type).toBe('sticky');
    });
  });

  describe('Top/Right/Bottom/Left', () => {
    test('should parse top values', () => {
      // Preset values
      const result1 = parser.parse('top-0');
      expect(result1.position?.top).toBe(0);

      const result2 = parser.parse('top-4');
      expect(result2.position?.top).toBe(16); // 4 * 4 = 16px

      // Special values
      const result3 = parser.parse('top-auto');
      expect(result3.position?.top).toBe('auto');

      const result4 = parser.parse('top-full');
      expect(result4.position?.top).toBe('100%');

      // Fractional values
      const result5 = parser.parse('top-1/2');
      expect(result5.position?.top).toBe('50%');

      const result6 = parser.parse('top-1/3');
      expect(result6.position?.top).toBe('33.33333333333333%');
    });

    test('should parse right values', () => {
      const result1 = parser.parse('right-0');
      expect(result1.position?.right).toBe(0);

      const result2 = parser.parse('right-8');
      expect(result2.position?.right).toBe(32); // 8 * 4 = 32px

      const result3 = parser.parse('right-auto');
      expect(result3.position?.right).toBe('auto');
    });

    test('should parse bottom values', () => {
      const result1 = parser.parse('bottom-0');
      expect(result1.position?.bottom).toBe(0);

      const result2 = parser.parse('bottom-12');
      expect(result2.position?.bottom).toBe(48); // 12 * 4 = 48px

      const result3 = parser.parse('bottom-full');
      expect(result3.position?.bottom).toBe('100%');
    });

    test('should parse left values', () => {
      const result1 = parser.parse('left-0');
      expect(result1.position?.left).toBe(0);

      const result2 = parser.parse('left-6');
      expect(result2.position?.left).toBe(24); // 6 * 4 = 24px

      const result3 = parser.parse('left-1/4');
      expect(result3.position?.left).toBe('25%');
    });

    test('should parse arbitrary position values', () => {
      const result1 = parser.parse('top-[3px]');
      expect(result1.position?.top).toBe('3px');

      const result2 = parser.parse('right-[1.75rem]');
      expect(result2.position?.right).toBe('1.75rem');

      const result3 = parser.parse('bottom-[32px]');
      expect(result3.position?.bottom).toBe('32px');

      const result4 = parser.parse('left-[50%]');
      expect(result4.position?.left).toBe('50%');
    });
  });

  describe('Inset', () => {
    test('should parse inset (all directions)', () => {
      const result1 = parser.parse('inset-0');
      expect(result1.position?.top).toBe(0);
      expect(result1.position?.right).toBe(0);
      expect(result1.position?.bottom).toBe(0);
      expect(result1.position?.left).toBe(0);

      const result2 = parser.parse('inset-4');
      expect(result2.position?.top).toBe(16);
      expect(result2.position?.right).toBe(16);
      expect(result2.position?.bottom).toBe(16);
      expect(result2.position?.left).toBe(16);

      const result3 = parser.parse('inset-auto');
      expect(result3.position?.top).toBe('auto');
      expect(result3.position?.right).toBe('auto');
      expect(result3.position?.bottom).toBe('auto');
      expect(result3.position?.left).toBe('auto');
    });

    test('should parse inset-x (horizontal)', () => {
      const result1 = parser.parse('inset-x-0');
      expect(result1.position?.left).toBe(0);
      expect(result1.position?.right).toBe(0);
      expect(result1.position?.top).toBeUndefined();
      expect(result1.position?.bottom).toBeUndefined();

      const result2 = parser.parse('inset-x-8');
      expect(result2.position?.left).toBe(32);
      expect(result2.position?.right).toBe(32);

      const result3 = parser.parse('inset-x-1/2');
      expect(result3.position?.left).toBe('50%');
      expect(result3.position?.right).toBe('50%');
    });

    test('should parse inset-y (vertical)', () => {
      const result1 = parser.parse('inset-y-0');
      expect(result1.position?.top).toBe(0);
      expect(result1.position?.bottom).toBe(0);
      expect(result1.position?.left).toBeUndefined();
      expect(result1.position?.right).toBeUndefined();

      const result2 = parser.parse('inset-y-6');
      expect(result2.position?.top).toBe(24);
      expect(result2.position?.bottom).toBe(24);

      const result3 = parser.parse('inset-y-full');
      expect(result3.position?.top).toBe('100%');
      expect(result3.position?.bottom).toBe('100%');
    });

    test('should parse arbitrary inset values', () => {
      const result1 = parser.parse('inset-[4px]');
      expect(result1.position?.top).toBe('4px');
      expect(result1.position?.right).toBe('4px');
      expect(result1.position?.bottom).toBe('4px');
      expect(result1.position?.left).toBe('4px');

      const result2 = parser.parse('inset-x-[2rem]');
      expect(result2.position?.left).toBe('2rem');
      expect(result2.position?.right).toBe('2rem');

      const result3 = parser.parse('inset-y-[10%]');
      expect(result3.position?.top).toBe('10%');
      expect(result3.position?.bottom).toBe('10%');
    });
  });

  describe('Z-Index', () => {
    test('should parse z-index values', () => {
      const result1 = parser.parse('z-0');
      expect(result1.position?.zIndex).toBe(0);

      const result2 = parser.parse('z-10');
      expect(result2.position?.zIndex).toBe(10);

      const result3 = parser.parse('z-20');
      expect(result3.position?.zIndex).toBe(20);

      const result4 = parser.parse('z-30');
      expect(result4.position?.zIndex).toBe(30);

      const result5 = parser.parse('z-40');
      expect(result5.position?.zIndex).toBe(40);

      const result6 = parser.parse('z-50');
      expect(result6.position?.zIndex).toBe(50);

      const result7 = parser.parse('z-auto');
      expect(result7.position?.zIndex).toBe('auto');
    });

    test('should parse arbitrary z-index values', () => {
      const result1 = parser.parse('z-[999]');
      expect(result1.position?.zIndex).toBe(999);

      const result2 = parser.parse('z-[-1]');
      expect(result2.position?.zIndex).toBe(-1);

      const result3 = parser.parse('z-[100]');
      expect(result3.position?.zIndex).toBe(100);
    });
  });

  describe('Combined Position Classes', () => {
    test('should parse multiple position classes', () => {
      const result = parser.parse('relative top-4 left-8 z-10');
      expect(result.position?.position).toBe('relative');
      expect(result.position?.type).toBe('relative');
      expect(result.position?.top).toBe(16);
      expect(result.position?.left).toBe(32);
      expect(result.position?.zIndex).toBe(10);
    });

    test('should parse position with inset', () => {
      const result = parser.parse('absolute inset-0');
      expect(result.position?.position).toBe('absolute');
      expect(result.position?.top).toBe(0);
      expect(result.position?.right).toBe(0);
      expect(result.position?.bottom).toBe(0);
      expect(result.position?.left).toBe(0);
    });

    test('should parse complex positioning', () => {
      const result = parser.parse('fixed top-0 right-0 left-0 z-50');
      expect(result.position?.position).toBe('fixed');
      expect(result.position?.top).toBe(0);
      expect(result.position?.right).toBe(0);
      expect(result.position?.left).toBe(0);
      expect(result.position?.zIndex).toBe(50);
      expect(result.position?.bottom).toBeUndefined();
    });
  });

  describe('Responsive Position', () => {
    test('should parse responsive position classes', () => {
      const result = parser.parse('static md:relative lg:absolute');
      
      // Base styles
      expect(result.position?.position).toBe('static');
      
      // Medium breakpoint
      expect(result.breakpoints?.md?.position?.position).toBe('relative');
      
      // Large breakpoint  
      expect(result.breakpoints?.lg?.position?.position).toBe('absolute');
    });

    test('should parse responsive position values', () => {
      const result = parser.parse('top-0 md:top-4 lg:top-8');
      
      expect(result.position?.top).toBe(0);
      expect(result.breakpoints?.md?.position?.top).toBe(16);
      expect(result.breakpoints?.lg?.position?.top).toBe(32);
    });
  });

  describe('State Modifiers', () => {
    test('should parse hover position styles', () => {
      const result = parser.parse('hover:relative hover:top-4');
      
      expect(result.states?.hover?.position?.position).toBe('relative');
      expect(result.states?.hover?.position?.top).toBe(16);
    });

    test('should parse focus position styles', () => {
      const result = parser.parse('focus:absolute focus:inset-0');
      
      expect(result.states?.focus?.position?.position).toBe('absolute');
      expect(result.states?.focus?.position?.top).toBe(0);
      expect(result.states?.focus?.position?.right).toBe(0);
      expect(result.states?.focus?.position?.bottom).toBe(0);
      expect(result.states?.focus?.position?.left).toBe(0);
    });
  });

  describe('Negative Values', () => {
    test('should parse negative position values', () => {
      const result1 = parser.parse('-top-4');
      expect(result1.position?.top).toBe(-16);

      const result2 = parser.parse('-right-8');
      expect(result2.position?.right).toBe(-32);

      const result3 = parser.parse('-bottom-12');
      expect(result3.position?.bottom).toBe(-48);

      const result4 = parser.parse('-left-6');
      expect(result4.position?.left).toBe(-24);
    });

    test('should parse negative inset values', () => {
      const result1 = parser.parse('-inset-4');
      expect(result1.position?.top).toBe(-16);
      expect(result1.position?.right).toBe(-16);
      expect(result1.position?.bottom).toBe(-16);
      expect(result1.position?.left).toBe(-16);

      const result2 = parser.parse('-inset-x-2');
      expect(result2.position?.left).toBe(-8);
      expect(result2.position?.right).toBe(-8);

      const result3 = parser.parse('-inset-y-1');
      expect(result3.position?.top).toBe(-4);
      expect(result3.position?.bottom).toBe(-4);
    });
  });

  describe('Edge Cases', () => {
    test('should handle invalid position classes', () => {
      const result1 = parser.parse('invalid-position');
      expect(result1.position?.position).toBeUndefined();

      const result2 = parser.parse('top-invalid');
      expect(result2.position?.top).toBe('invalid');
    });

    test('should handle empty position classes', () => {
      const result = parser.parse('');
      expect(result.position).toEqual({});
    });

    test('should override position values correctly', () => {
      const result = parser.parse('top-4 top-8');
      // Last value should win
      expect(result.position?.top).toBe(32);
    });
  });
}); 